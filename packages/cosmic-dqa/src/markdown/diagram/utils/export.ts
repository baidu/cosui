type HTMLOrSVGElement = HTMLElement | SVGSVGElement;

interface SvgViewBox {
    x: number;
    y: number;
    width: number;
    height: number;
}

function updateAttribute(element: Element, attributeName: string, attributeValue?: string) {
    if (attributeValue) {
        element.setAttribute(attributeName, attributeValue);
        return;
    }

    element.removeAttribute(attributeName);
}

function resolveSvgRootElement(svgElement: HTMLOrSVGElement | null) {
    if (!svgElement) {
        return null;
    }

    if (svgElement instanceof SVGSVGElement) {
        return svgElement;
    }

    return svgElement.querySelector('svg');
}

function serializeSvgForExport(
    svgElement: HTMLOrSVGElement | null,
    scale: number = 2,
    exportSvgSelf: boolean = false,
    viewBox?: SvgViewBox,
) {
    const svgRoot = resolveSvgRootElement(svgElement);
    if (!svgRoot) {
        throw new Error('SVG 节点不存在');
    }

    const padding = exportSvgSelf ? 0 : 48;
    const clonedSvg = svgRoot.cloneNode(true) as SVGSVGElement;

    // 只清理 svg-pan-zoom 注入的 viewport 包裹层（承载预览态的平移/缩放 transform）。
    // 导出用的新渲染 SVG 没有这层，其第一个 <g> 是图表内容本身（如甘特图的 .grid 轴组，
    // 带定位用的 translate），误清会把图画错位。
    const clonedViewport = clonedSvg.querySelector('g.svg-pan-zoom_viewport');

    if (clonedViewport) {
        updateAttribute(clonedViewport, 'class', undefined);
        updateAttribute(clonedViewport, 'style', undefined);
        updateAttribute(clonedViewport, 'transform', undefined);
    }

    // mermaid 的 useMaxWidth（默认 true）会在 SVG 根节点写 style="max-width: <宽度>px"，
    // 与下面显式设置的 width/height/viewBox 冲突，导致导出图片宽高比失真（高度被压扁一半）；
    // 导出前清除根节点的 style，保证尺寸完全由 width/height/viewBox 决定。
    updateAttribute(clonedSvg, 'style', undefined);

    const exportViewBox = viewBox || svgRoot.getBBox();
    const exportWidth = (exportViewBox.width + padding * 2) * scale;
    const exportHeight = (exportViewBox.height + padding * 2) * scale;

    updateAttribute(clonedSvg, 'xmlns', 'http://www.w3.org/2000/svg');
    updateAttribute(clonedSvg, 'xmlns:xlink', 'http://www.w3.org/1999/xlink');
    updateAttribute(clonedSvg, 'width', String(exportWidth));
    updateAttribute(clonedSvg, 'height', String(exportHeight));
    const newViewBox = `${exportViewBox.x - padding} ${exportViewBox.y - padding} `
        + `${exportViewBox.width + padding * 2} ${exportViewBox.height + padding * 2}`;
    updateAttribute(clonedSvg, 'viewBox', newViewBox);

    const svgCode = new XMLSerializer().serializeToString(clonedSvg);

    return {
        svgCode,
        width: exportWidth,
        height: exportHeight
    };
}

function renderImageToPngDataUrl(
    sourceImage: HTMLImageElement,
    footerCanvas?: HTMLCanvasElement,
    targetWidth?: number,
    targetHeight?: number,
    padding?: number | [number, number],
): Promise<string> {
    const {naturalWidth, naturalHeight} = sourceImage;
    const imageWidth = targetWidth && targetHeight ? targetWidth : naturalWidth;
    const imageHeight = targetWidth && targetHeight ? targetHeight : naturalHeight;

    return new Promise(resolve => {
        const exportCanvas = document.createElement('canvas');
        const context = exportCanvas.getContext('2d');
        if (!context) {
            resolve('');
            return;
        }

        let horizontalPadding = 0;
        let verticalPadding = 0;

        if (typeof padding === 'number') {
            horizontalPadding = padding;
            verticalPadding = padding;
        }
        else if (Array.isArray(padding)) {
            horizontalPadding = typeof padding[0] === 'number' ? padding[0] : 0;
            verticalPadding = typeof padding[1] === 'number' ? padding[1] : 0;
        }

        exportCanvas.width = footerCanvas
            ? Math.max(imageWidth + 2 * horizontalPadding, footerCanvas.width)
            : imageWidth + 2 * horizontalPadding;

        exportCanvas.height = footerCanvas
            ? imageHeight + footerCanvas.height + 2 * verticalPadding
            : imageHeight + 2 * verticalPadding;

        context.fillStyle = 'rgba(255, 255, 255, 1)';
        context.fillRect(0, 0, exportCanvas.width, exportCanvas.height);

        const imageX = (exportCanvas.width - imageWidth) / 2;
        const imageY = verticalPadding;
        context.drawImage(sourceImage, imageX, imageY, imageWidth, imageHeight);

        if (!footerCanvas) {
            resolve(exportCanvas.toDataURL('image/png'));
            return;
        }

        const footerImage = new Image();
        footerImage.src = footerCanvas.toDataURL('image/png');
        footerImage.onload = () => {
            const footerY = imageHeight + 2 * verticalPadding;

            context.fillStyle = 'rgba(255, 255, 255, 1)';
            context.fillRect(0, footerY, exportCanvas.width, footerCanvas.height);
            context.drawImage(footerImage, 0, footerY);

            resolve(exportCanvas.toDataURL('image/png'));
        };
    });
}

function loadSvgImage(svg: string) {
    return new Promise<HTMLImageElement>((resolve, reject) => {
        const image = new Image();
        const url = `data:image/svg+xml;charset=utf-8,${encodeURIComponent(svg)}`;

        image.crossOrigin = 'anonymous';
        image.onload = () => {
            resolve(image);
        };

        image.onerror = () => {
            reject(new Error('PNG 导出失败'));
        };

        image.src = url;
    });
}

async function svgElementToPng(
    svgElement: HTMLOrSVGElement | null,
    scale: number = 2,
    viewBox?: SvgViewBox,
): Promise<string> {
    try {
        const {svgCode, width, height} = serializeSvgForExport(
            svgElement,
            scale,
            false,
            viewBox,
        );
        const image = await loadSvgImage(svgCode);
        return renderImageToPngDataUrl(image, undefined, width, height);
    }
    catch (error) {
        return Promise.reject(error);
    }
}

interface ExportSvgAsPngOptions {
    svgElement: HTMLOrSVGElement | null;
    scale?: number;
    viewBox?: SvgViewBox;
}

export async function exportSvgAsPngUrl(options: ExportSvgAsPngOptions) {
    const {
        svgElement,
        scale = 2,
        viewBox
    } = options;
    // 只生成 PNG dataURL，不在 cosmic 内部保存（端无关）：
    // 保存动作由业务监听 click 事件（from=diagram, action=download, data.url）
    // 后自行调端能力/下载中心处理。
    return svgElementToPng(svgElement, scale, viewBox);
}



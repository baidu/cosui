import puppeteer from 'puppeteer';
import fs from 'fs';
import path from 'path';
import sharp from 'sharp';
import router from '../src/router/routes';
import {exec} from 'child_process';
import util from 'util';

// 使用puppeteer、fs（文件系统）、path（路径处理）和sharp（图像处理）模块来自动化地生成并保存组件的屏幕截图。
// cosmic-web目录下执行命令：tsx scripts/screenshot.ts

// 提取路由中需要生成图片的路径（基础组件，卡片组件，智能化组件,推荐组件）
const keysToExtract = [
    'components/cosmic',
    'components/cosmic-card',
    'components/cosmic-dqa'
];

/**
 * 从文件路径中提取组件信息
 *
 * @param filePath 文件路径
 * @returns 返回包含组件标题和组件名称的对象，如果没有匹配则返回空字符串
 */
function extractComponents(filePath) {
    // 定义一个更通用的正则表达式以匹配所有可能的情况
    const pattern
    = /^\.\.\/([^\/]+)\/src\/([^\/]+)\/.*$|^(src\/docs\/ui\/usage\/components\/docs)\/([^\/]+)/;
    const match = filePath.match(pattern);

    if (match) {
        // 判断是哪个匹配组，并相应地设置title和component
        if (match[1]) {// 组件路径匹配
            const packageName = match[1];
            const componentName = match[2];
            return {
                title: `components/${packageName}`,
                component: componentName
            };
        }
        if (match[3]) {// ui/usage/components路径匹配
            return {
                title: 'ui/usage/components',
                component: match[4]
            };
        }
    }

    // 如果没有匹配，则返回空字符串
    return '';
}

/**
 * 获取已更改的组件列表
 *
 * 通过执行 `git status` 命令获取当前 Git 仓库的状态，提取出已更改的文件路径，
 * 然后提取出已更改的文件路径，并调用 `extractComponents` 函数提取出已更改的组件信息，
 * 最后将提取出的组件信息整理成树状结构并返回。
 *
 * @returns 返回已更改的组件列表，格式为树状结构
 * @throws 如果在执行过程中发生错误，则抛出异常
 */
const getChangedComponents = async () => {
    try {
        const execPromise = util.promisify(exec);
        const {stdout, stderr} = await execPromise('git status');
        if (stderr) {
            console.error(`Error occurred while running 'git status': ${stderr}`);
            return [];
        }

        // 提取出已更改的文件路径
        const changedFiles = stdout
            .split('\n')
            .filter(line => line.includes('modified:') || line.includes('new file:') || line.includes('deleted:'))
            .map(line => line.split(':   ')[1]);

        if (!changedFiles.length) {
            console.log('No file change found.');
            return;
        }
        console.log('Found the following change:\n', changedFiles);

        // 提取出其中修改的组件
        const changedComponents = changedFiles
            .map(file => extractComponents(file))
            .filter(v => v !== '');

        if (!changedComponents.length) {
            console.log('No component change found.');
            console.log('If you want to generate all preview images, please run "pnpm run genall".');
            return;
        }

        // 将提取出的组件信息整理成树状结构
        const changedRoute = changedComponents.reduce((accumulator, item) => {
            const existingItem = accumulator.find(accItem => accItem.title === item.title);
            if (existingItem) {
                existingItem.children.push(item.component);
            }
            else {
                accumulator.push({
                    title: item.title,
                    children: [item.component]
                });
            }
            return accumulator;
        }, []);
        console.log('Found the following components change:\n', changedRoute);
        return changedRoute;
    } catch (error) {
        console.error(`Error occurred while getting changed components: ${error}`);
        throw error; // 重新抛出错误，以便上层处理
    }
};

/**
 * 从路由配置中提取指定键的路径
 * @param {Array} router - 路由配置数组
 * @param {Array} keysToExtract - 需要提取路径的键
 * @returns {Array} 结果数组，每个对象包含 title 和 children
 */
const extractPathsFromRouter = (router, keysToExtract) => {
    // 创建一个以 key 为索引的映射，以提高查找效率
    const routeMap = router.reduce((map, route) => {
        if (route.key) {
            map[route.key] = route;
        }
        return map;
    }, {});

    // 处理需要提取的键
    return keysToExtract
        .map(key => routeMap[key])
        .filter(route => route && route.list)
        .map(route => ({
            title: route.key,
            children: route.list
                .flatMap(group => (group.leaf || []).map(item => item.path))
                .filter(path => path)
        }));
};

/**
 * 创建目录（如果不存在的话）
 * @param {string} dirPath - 目录路径
 */
const createDirectoryIfNotExists = dirPath => {
    if (!fs.existsSync(dirPath)) {
        fs.mkdirSync(dirPath, {recursive: true});
    }
};

/**
 * 获取页面上适合的 demo 元素
 * @param {puppeteer.Page} page - Puppeteer 页面对象
 * @param {string} url - 页面 URL
 * @returns {Promise<puppeteer.ElementHandle|null>} - 匹配的元素
 */
const getDemoElement = async (page, url) => {
    try {
        await page.waitForSelector('.pc-demo, .mobile-demo', {timeout: 40000});
        let element = await page.$('.pc-demo');
        if (!element) {
            console.log(`Element with class "pc-demo" not found for ${url}`);
            element = await page.$('.mobile-demo');
        }
        else {
            const content = await page.evaluate(el => el.textContent, element);
            if (content.includes('没有对应的 PC 示例哦～')) {
                console.log(`PC demo not available for ${url}, switching to mobile-demo`);
                element = await page.$('.mobile-demo');
            }
        }
        return element;
    }
    catch (error) {
        console.error(`Error waiting for demo element at ${url}:`, error);
        return null;
    }
};

/**
 * 截取页面截图并保存
 * @param {puppeteer.Page} page - Puppeteer 页面对象
 * @param {string} filePath - 保存截图的文件路径
 * @param {puppeteer.BoundingBox} boundingBox - 元素的边界框
 */
const captureScreenshot = async (page, filePath, boundingBox) => {
    try {
        // 增加裁剪区域的上边距（例如 50 像素）
        const extraMargin = 2;
        const clip = {
            x: boundingBox.x,
            y: boundingBox.y + extraMargin,
            width: boundingBox.width,
            height: boundingBox.height
        };

        // 确保裁剪区域的 y 值不小于 0
        if (clip.y < 0) {
            clip.y = 0;
            clip.height = boundingBox.height + (boundingBox.y - clip.y);
        }

        // 截图并保存
        await page.screenshot({
            path: filePath,
            clip: clip
        });

        // 处理图片
        const tempFilePath = filePath.replace('.png', '-temp.png');
        await sharp(filePath).trim().toFile(tempFilePath);
        fs.renameSync(tempFilePath, filePath);
    }
    catch (error) {
        console.error(`Error capturing screenshot for ${filePath}:`, error);
    }
};

/**
 * 将文件名转换为 PascalCase 变量名
 * @param str 文件名
 * @returns PascalCase 变量名
 */
const toPascalCase = (str: string): string => {
    return str
        .replace(/-([a-z])/g, (_, letter) => letter.toUpperCase())
        .replace(/^[a-z]/, letter => letter.toUpperCase());
};

/**
 * 递归遍历目录以寻找文件
 * @param dir 目录路径
 * @param filelist 文件列表
 * @returns 所有符合条件的文件路径
 */
const walkSync = (dir: string, filelist: string[] = []): string[] => {
    fs.readdirSync(dir).forEach(file => {
        const filePath = path.join(dir, file);
        if (fs.statSync(filePath).isDirectory()) {
            filelist = walkSync(filePath, filelist);
        }
        else if (file.endsWith('.png')) {
            filelist.push(filePath);
        }
    });
    return filelist;
};

/**
 * 生成配置组件的预览图文件
 * @param assetsDir 图片文件夹的根目录
 * @param outputDir 输出目录
 * @param outputFile 输出文件名
 */
const generatePreviewImagesConfig = (assetsDir: string, outputDir: string, outputFile: string): void => {
    // 获取所有图片文件
    const imageFiles = walkSync(assetsDir);

    // 生成 import 和 export 语句
    let importStatements = '';
    let exportArray = 'export default [\n';

    imageFiles.forEach(filePath => {
        const relativePath = path.relative(assetsDir, filePath);
        const baseName = path.basename(filePath, '.png');
        const variableName = toPascalCase(baseName) + (filePath.includes('/ui') ? 'UISDK' : '') + 'Img';
        const namePath = '/' + relativePath.replace(/\\/g, '/').replace('.png', '');

        importStatements += `import ${variableName} from './assets/${relativePath.replace(/\\/g, '/')}';\n`;
        exportArray += `    {name: '${namePath}', src: ${variableName}},\n`;
    });

    exportArray += '];\n';

    const outputContent = `${importStatements}\n${exportArray}`;

    // 输出到文件
    fs.writeFileSync(path.join(outputDir, outputFile), outputContent);
};

// 使用示例
const assetsDir = path.join(__dirname, '../src/docs/components/cosmic/overview/assets');
const outputDir = path.join(__dirname, '../src/docs/components/cosmic/overview');
const outputFile = 'preview-images.config.ts';
const isGenerateAll = process.argv.slice(2)[0] === 'all';

(async () => {
    const routeData = isGenerateAll ? extractPathsFromRouter(router, keysToExtract) : await getChangedComponents();
    if (!routeData) {
        return;
    }
    const baseUrl = 'http://localhost:8999/';
    const browser = await puppeteer.launch({headless: true});

    for (const route of routeData) {
        const dirPath = path.join(__dirname, '../src/docs/components/cosmic/overview/assets', route.title);
        createDirectoryIfNotExists(dirPath);

        for (const child of route.children) {
            const page = await browser.newPage();
            const url = `${baseUrl}${route.title}/${child}`;

            try {
                await page.setViewport({width: 1920, height: 1080});
                console.log(`Navigating to ${url}`);
                await page.goto(url, {waitUntil: 'networkidle2', timeout: 60000});

                const element = await getDemoElement(page, url);
                if (!element) {
                    console.log(`No suitable demo found for ${url}`);
                    continue;
                }

                const boundingBox = await element.boundingBox();
                if (!boundingBox) {
                    console.log(`Bounding box of element is not available for ${url}`);
                    continue;
                }

                const filePath = path.join(dirPath, `${child}.png`);
                await captureScreenshot(page, filePath, boundingBox);
                console.log(`Screenshot for ${url} saved and trimmed as ${filePath}`);
            }
            catch (error) {
                console.error(`Error occurred while processing ${url}:`, error);
            }
            finally {
                await page.close();
            }
        }
    }

    await browser.close();
    generatePreviewImagesConfig(assetsDir, outputDir, outputFile);
})();

const COPY_FEEDBACK_DURATION = 2000;
const COPY_ICON = 'cos-icon-copy';
const COPY_DONE_ICON = 'cos-icon-check-circle-fill';
const COPIED_CLASS = 'cosd-markdown-code-copied';
const COPY_TIP_CLASS = 'cosd-markdown-code-copy-tip';
const copyFeedbackTimers = new WeakMap<Element, number>();

function isCopyDoneIcon(iconDom: Element): boolean {
    return iconDom.classList.contains(COPY_DONE_ICON);
}

function createCopyTip(iconDom: HTMLElement): HTMLElement {
    const tipDom = document.createElement('div');
    tipDom.className = COPY_TIP_CLASS;
    tipDom.setAttribute('disable-tts', '');
    tipDom.textContent = '复制成功';
    const iconsDom = iconDom.parentElement;
    const shift = iconsDom ? iconsDom.getBoundingClientRect().right - iconDom.getBoundingClientRect().right : 0;
    if (shift > 0) {
        tipDom.style.marginRight = `${shift}px`;
    }
    return tipDom;
}

function clearCodeCopyFeedback(preDom: Element) {
    const timer = copyFeedbackTimers.get(preDom);
    if (timer) {
        clearTimeout(timer);
        copyFeedbackTimers.delete(preDom);
    }
}

function clearAllCodeCopyFeedback(root?: Element | null) {
    root?.querySelectorAll(`.${COPIED_CLASS}`).forEach(clearCodeCopyFeedback);
}

/**
 * 代码块复制成功的反馈
 * @param preDom 代码块的 pre 节点
 * @param iconDom 被点击的复制图标
 */
function showCodeCopyFeedback(preDom: Element, iconDom: HTMLElement) {
    clearCodeCopyFeedback(preDom);

    preDom.classList.add(COPIED_CLASS);
    iconDom.classList.replace(COPY_ICON, COPY_DONE_ICON);

    const headerDom = iconDom.closest<HTMLElement>('.code-header');
    const tipDom = headerDom ? createCopyTip(iconDom) : null;
    tipDom && headerDom?.appendChild(tipDom);

    copyFeedbackTimers.set(preDom, window.setTimeout(() => {
        copyFeedbackTimers.delete(preDom);
        preDom.classList.remove(COPIED_CLASS);
        iconDom.classList.replace(COPY_DONE_ICON, COPY_ICON);
        tipDom?.remove();
    }, COPY_FEEDBACK_DURATION));
}

export {
    isCopyDoneIcon,
    showCodeCopyFeedback,
    clearAllCodeCopyFeedback
};

import {getMergedClassName} from '../render/render-manager/params';

function getClassNames(className: string) {
    return getMergedClassName(className).split(' ').filter(Boolean);
}

export const applyOverlayStyle = (el: HTMLElement) => {
    el.classList.add(...getClassNames('cosd-diagram-overlay'));
};

export const resetOverlayStyle = (el: HTMLElement) => {
    el.classList.remove(...getClassNames('cosd-diagram-overlay'));
};

export const hideEl = (el: HTMLElement) => {
    el.style.opacity = '0';
};

export const showEl = (el: HTMLElement) => {
    el.style.opacity = '1';
};

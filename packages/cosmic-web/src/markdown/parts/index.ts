export {MarkdownAnchor} from './anchor';
export {MarkdownBanner} from './banner';
export {MarkdownImage} from './image';
export {MarkdownTabs} from './tabs';

import TokenWidget from './token-widget.san';
import Switcher from './switcher.san';

import {sanToCustomElement} from './factory';

sanToCustomElement('md-token-widget', TokenWidget);
sanToCustomElement('md-switcher', Switcher);

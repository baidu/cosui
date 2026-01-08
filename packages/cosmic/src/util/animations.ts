/*
 * Copyright (c) Baidu, Inc. All Rights Reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *
 *
 * 过渡动画配置接口
 */

export interface TransitionConfig {
    enter?: (el: HTMLElement, done: () => void) => void;
    leave?: (el: HTMLElement, done: () => void) => void;
}

export const Animations = {
    /**
     * 面板进退场
     */
    panel: {
        enter: (el: HTMLElement, done: () => void) => {
            if (!el) {
                return done();
            };
            // 面板进场动画，ue给出规范为上移18px，透明度0-100%
            el.style.transform = 'translateY(18px)';
            el.style.opacity = 'var(--cos-opacity-0)';
            el.style.transition = 'none';

            requestAnimationFrame(() => {
                if (!el) {
                    return done();
                }
                // eslint-disable-next-line max-len
                el.style.transition = 'all var(--cos-transition-duration-moderatest) var(--cos-transition-easing-decelerate)';
                el.style.transform = 'translateY(0)';
                el.style.opacity = 'var(--cos-opacity-100)';

                setTimeout(() => {
                    if (!el) {
                        return;
                    }
                    done();
                }, 240);
            });
        },

        leave: (el: HTMLElement, done: () => void) => {
            if (!el || !el.style) {
                return done();
            }
            el.style.transition = 'all var(--cos-transition-duration-moderate) var(--cos-transition-easing-accelerate)';
            el.style.transform = 'translateY(18px)';
            el.style.opacity = 'var(--cos-opacity-0)';

            setTimeout(() => {
                if (!el) {
                    return;
                }
                done();
            }, 160);
        }
    },
    /**
     * 透明度变化
     */
    fade: {
        enter: (el: HTMLElement, done: () => void) => {
            if (!el) {
                return done();
            }
            el.style.opacity = 'var(--cos-opacity-0)';
            el.style.transition = 'none';

            requestAnimationFrame(() => {
                if (!el) {
                    return done();
                }
                // eslint-disable-next-line max-len
                el.style.transition = 'opacity var(--cos-transition-duration-moderatest) var(--cos-transition-easing-decelerate)';
                el.style.opacity = 'var(--cos-opacity-100)';

                setTimeout(() => {
                    if (!el) {
                        return;
                    }
                    done();
                }, 240);
            });
        },

        leave: (el: HTMLElement, done: () => void) => {
            if (!el || !el.style) {
                return done();
            }
            // eslint-disable-next-line max-len
            el.style.transition = 'opacity var(--cos-transition-duration-moderate) var(--cos-transition-easing-accelerate)';
            el.style.opacity = 'var(--cos-opacity-0)';

            setTimeout(() => {
                if (!el) {
                    return;
                }
                done();
            }, 160);
        }
    }
};
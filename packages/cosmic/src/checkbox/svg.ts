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
 * @file checkbox icon
 */

/* eslint-disable max-len */

const checkboxContainerIcon = `
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
        <mask id="a" fill="#fff">
            <path d="M13 0a3 3 0 0 1 3 3v10a3 3 0 0 1-3 3H3a3 3 0 0 1-3-3V3a3 3 0 0 1 3-3h10z"/>
        </mask>
        <path class="cos-checkbox-container-inner" d="M13 0a3 3 0 0 1 3 3v10a3 3 0 0 1-3 3H3a3 3 0 0 1-3-3V3a3 3 0 0 1 3-3h10z"/>
        <path class="cos-checkbox-container-border" d="M13 0v1.143c1.026 0 1.857.831 1.857 1.857h2.286A4.143 4.143 0 0 0 13-1.143V0zm3 3h-1.143v10h2.286V3H16zm0 10h-1.143A1.857 1.857 0 0 1 13 14.857v2.286A4.143 4.143 0 0 0 17.143 13H16zm-3 3v-1.143H3v2.286h10V16zM3 16v-1.143A1.857 1.857 0 0 1 1.143 13h-2.286A4.143 4.143 0 0 0 3 17.143V16zm-3-3h1.143V3h-2.286v10H0zM0 3h1.143c0-1.026.831-1.857 1.857-1.857v-2.286A4.143 4.143 0 0 0-1.143 3H0zm3-3v1.143h10v-2.286H3V0z" mask="url(#a)"/>
    </svg>`;

const checkboxCheckedIcon = `
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path class="cos-checkbox-checked" d="M0 3.13A3.13 3.13 0 0 1 3.13 0h9.74A3.13 3.13 0 0 1 16 3.13v9.74A3.13 3.13 0 0 1 12.87 16H3.13A3.13 3.13 0 0 1 0 12.87V3.13zm7.863 7.324l4.452-4.394-.977-.99-3.964 3.911-2.016-1.989-.977.99 2.504 2.472c.271.267.707.267.978 0z"/>
    </svg>`;

const checkboxIndeterminateIcon = `
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path class="cos-checkbox-indeterminate" d="M0 3.13A3.13 3.13 0 0 1 3.13 0h9.74A3.13 3.13 0 0 1 16 3.13v9.74A3.13 3.13 0 0 1 12.87 16H3.13A3.13 3.13 0 0 1 0 12.87V3.13zm4.522 5.566h6.956V7.304H4.522v1.392z"/>
    </svg>`;

export {
    checkboxContainerIcon,
    checkboxCheckedIcon,
    checkboxIndeterminateIcon
};
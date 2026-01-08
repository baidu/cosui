/**
 * @file 获取组件入口
 */

import {resolve} from 'path';
import {existsSync, readFileSync} from 'fs';

// 用于全局存储各端组件与组件路径
export let componentPathMap = {
    mobile: {},
    pc: {}
};

// 匹配入口文件中的相对路径引用
const componentPathRegex = /["']([^"']+)["']/g;

/**
 * 获取所有组件入口
 * 
 * @param {string} baseUrl package 路径
 * @param {string} terminal pc/mobile 端
 * @returns {array} 当前 terminal 对应的组件入口目录
 */

export function getEntries(baseUrl, terminal) {
    const entries = [];
    const entryFile = resolve(baseUrl, 'src', `index.${terminal}.ts`);
    const content = readFileSync(entryFile, 'utf-8');
    
    // 移除入口中的单行注释
    const contentWithoutComments = content.split('\n').filter(line => !line.trim().startsWith('//')).join('\n');

    let matches;
    while ((matches = componentPathRegex.exec(contentWithoutComments)) !== null) {
        let relativePath = matches[1];
        
        if (relativePath.endsWith('.less')) {
            continue;
        }

        const componentName = relativePath.match(/\.\/([^/]+)/)[1];
        let componentPath = resolve(baseUrl, 'src', relativePath);

        // 路径补全规则
        // 1. 以 .ts 结尾不处理
        // 2. 以 index 或 index.[terminal] 结尾加上 .ts
        // 3. 其他场景统一补全加 /index.ts，例如 /button/terminal、/button
        if (!componentPath.endsWith('.ts')) {
            if (componentPath.endsWith('/index') || componentPath.endsWith(`/index.${terminal}`)) {
                componentPath += '.ts';
            }
            else {
                componentPath += '/index.ts';
            }
        }

        if (!existsSync(componentPath)) {
            console.warn(`[getEntries] ${componentPath} is not exist!`);
        }

        entries.push(componentPath);
        componentPathMap[terminal][componentName] = componentPath;

    }

    return entries;
}

/**
 * 获取单组件目录
 *
 * @param {string} terminal pc/mobile 端 
 * @param {*} componentName 组件名称
 * @returns 
 */
export function getComponentPath(terminal, componentName) {
    if (Object.keys(componentPathMap[terminal]) === 0) {
        console.warn('[getComponentPath] componentPathMap is not exist');
        return;
    }
    return componentPathMap[terminal][componentName];
}

/**
 * 获取所有组件的 dist 目录
 * 
 * @param {string} baseUrl package 路径 
 * @param {string} terminal pc/mobile 端 
 * @returns {array} 当前 terminal 对应的 npm package 组件入口目录
 */
export function getDistEntries(baseUrl, terminal) {
    const entries = [];
    const entryFile = resolve(baseUrl, 'dist', terminal, 'index.js');
    const tokenFile = resolve(baseUrl, 'dist', terminal, 'tokens.css');

    if (!existsSync(entryFile)) {
        console.warn(`[getDistEntries] ${entryFile} is not exist!`);
    }

    const content = readFileSync(entryFile, 'utf-8');

    let matches;
    while ((matches = componentPathRegex.exec(content)) !== null) {
        let relativePath = matches[1];
        const componentPath = resolve(baseUrl, 'dist', terminal, relativePath);
        entries.push(componentPath);
    }

    // 匹配不到组件引用 & 存在token文件，则代表无组件逻辑，只有主题定制样式
    if (entries.length === 0 && existsSync(tokenFile)) {
        entries.push(entryFile);
    }

    return entries;
}

import fs from 'fs';
import path from 'path';
import {fileURLToPath} from 'url';
import {getEntries, componentPathMap} from './get-entries.mjs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// 指定要查找文件的目录，从packages开始查找，跳过里面的WHITE_LIST名单目录
const directoryPath = '../packages';
const ROOT_PATH = path.join(__dirname, directoryPath);

/**
 * 获取当前路径最后一个'/'后面的名称
 * @param {string} path 需要解析的参数
 * @returns {string}
 */
function getLastName(path) {
    const arr = path.split('/');
    return arr[arr.length - 1];
}

/**
 * 当前路径是否是文件
 * @param {string} filePath 文件路径
 */
function isFile(filePath) {
    let isFile = false;
    try {
        isFile = fs.statSync(filePath).isFile();
    } catch (error) {
        return false;
    }
    return isFile;
}

/**
 * 生成cache文件
 * @param {string} filePath 当前文件路径
 * @returns {}
 */
function generateCacheFile(filePath) {
    const index = filePath.lastIndexOf('/doc/');
    const componentPath = filePath.slice(0, index);
    const componentName = getLastName(componentPath);
    const pcSourcePath = componentPathMap.pc[componentName];
    const mobileSourcePath = componentPathMap.mobile[componentName];
    if (!pcSourcePath || !mobileSourcePath) {
        return;
    }

    const match = filePath.match(/\/packages\/([^\/]+)\/src\//);
    const packageName = match && match[1];

    if (!packageName) {
        return;
    }

    const cacheData = {
        'name': `@cosui/${packageName}/${componentName}`,
        'source-pc': pcSourcePath,
        'source-mobile': mobileSourcePath
    };

    if (pcSourcePath === mobileSourcePath) {
        cacheData['mobile'] = mobileSourcePath.replace('index.ts', `.${componentName}.ts`);
        cacheData['pc'] = pcSourcePath.replace('index.ts', `.${componentName}.ts`);
    }
    else {
        const regex = /index(?:\.pc|\.mobile)?\.ts/;
        cacheData['mobile'] = mobileSourcePath.replace(regex, `.${componentName}.mobile.ts`);
        cacheData['pc'] = pcSourcePath.replace(regex, `.${componentName}.pc.ts`);
    }

    try {
        fs.copyFileSync(cacheData['source-mobile'], cacheData['mobile']);
        fs.copyFileSync(cacheData['source-pc'], cacheData['pc']);
    } catch (error) {
        return;
    }

    // 保存cache文件
    const fileName = getLastName(filePath);
    const cacheFilePath = filePath.replace(fileName, 'e2e-cache.json');
    try {
        // 写入JSON文件缓存
        fs.writeFileSync(cacheFilePath, JSON.stringify(cacheData), 'utf8');
    } catch (error) {
        return cacheData;
    }
    return cacheData;
}

/**
 * 获取缓存数据
 * @param {string} filePath 当前md文件路径
 * @returns {}
 */
function checkHasCacheData(filePath) {
    const fileName = getLastName(filePath);
    const cacheFilePath = filePath.replace(fileName, 'e2e-cache.json');

    // 没有文件就生成一份
    if (!isFile(cacheFilePath)) {
        generateCacheFile(filePath);
    }
}

function traversalCache(directoryPath) {
    fs.readdirSync(directoryPath).forEach((file) => {
        const filePath = path.join(directoryPath, file);

        if (fs.statSync(filePath).isDirectory()) {
            // 如果是子目录，递归调用
            traversalCache(filePath);
        }
        else if (path.extname(file) === '.md' && filePath.includes('/doc/')) {
            // 如果是.md文件，检查是否生成了测试使用的ts
            checkHasCacheData(filePath);
        }
    });
}

function build() {
    // TODO: 建议支持分 package 执行单测
     const packages = ['cosmic', 'cosmic-card', 'cosmic-dqa'];
    for (const packageName of packages) {
        // 获取组件入口
        for (const terminal of ['pc', 'mobile']) {
            getEntries(path.resolve(ROOT_PATH, packageName), terminal);
        }
        const srcPath = path.resolve(ROOT_PATH, packageName, 'src');
        traversalCache(srcPath);
    }
}

build();
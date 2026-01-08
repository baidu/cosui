#!/usr/bin/env node
/**
 * 仅对提交命中的 TS/TSX 文件做类型检查，遵循各包的 tsconfig 配置
 * 为什么不用 tsc？tsc 在指定文件场景会忽略 tsconfig.json 配置
 */

import path from 'path';
import fs from 'fs';
import ts from 'typescript';

// lint-staged 传入的原始参数：文件列表
const argv = process.argv.slice(2);

// 仅保留 TS/TSX 文件，其他类型无需进行 TS 类型检查
const files = argv.filter(f => /\.(ts|tsx)$/.test(f)).map(f => path.resolve(f));
if (!files.length) {
    process.exit(0);
}

/**
 * 找最近的 tsconfig 配置
 */
function findNearestTsconfig(startDir) {
    // 自文件目录向上查找最近的 tsconfig.json
    let dir = startDir;
    while (true) {
        const candidate = path.join(dir, 'tsconfig.json');
        if (fs.existsSync(candidate)) {
            return candidate;
        }
        const parent = path.dirname(dir);
        if (parent === dir) {
            break;
        }
        dir = parent;
    }
    return null;
}

/**
 * 加载并解析 tsconfig 配置
 */
function loadParsedConfig(tsconfigPath) {
    // 格式化报错信息
    const formatHost = {
        getCanonicalFileName: f => (ts.sys.useCaseSensitiveFileNames ? f : f.toLowerCase()),
        getCurrentDirectory: ts.sys.getCurrentDirectory,
        getNewLine: () => ts.sys.newLine,
    };
    // 读取并解析 tsconfig.json
    const cfg = ts.readConfigFile(tsconfigPath, ts.sys.readFile);
    if (cfg.error) {
        console.error(ts.formatDiagnostic(cfg.error, formatHost));
        process.exit(1);
    }
    const parsed = ts.parseJsonConfigFileContent(cfg.config, ts.sys, path.dirname(tsconfigPath));
    return {parsed, formatHost};
}

const groups = new Map();
for (const f of files) {
    const tsconfigPath = findNearestTsconfig(path.dirname(f));
    if (!tsconfigPath) {
        console.error(`[tsc-staged] No tsconfig.json found for file: ${f}`);
        process.exitCode = 1;
        continue;
    }
    if (!groups.has(tsconfigPath)) {
        groups.set(tsconfigPath, new Set());
    }
    groups.get(tsconfigPath).add(f);
}

let hadError = false;
for (const [tsconfigPath, fileSet] of groups) {
    const {parsed, formatHost} = loadParsedConfig(tsconfigPath);
    const filesArr = [...fileSet];
    const program = ts.createProgram(parsed.fileNames, parsed.options);
    const diags = ts
        .getPreEmitDiagnostics(program)
        .filter(d => !d.file || filesArr.includes(path.resolve(d.file.fileName)));
    // 如果没有 ts 错误则跳过
    if (!diags.length) {
        continue;
    }
    console.error(`\n[tsc-staged] Type errors with tsconfig: ${path.relative(process.cwd(), tsconfigPath)}\n`);
    console.error(ts.formatDiagnosticsWithColorAndContext(diags, formatHost));
    hadError = true;
}

process.exit(hadError ? 1 : 0);

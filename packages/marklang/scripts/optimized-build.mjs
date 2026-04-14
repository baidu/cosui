#!/usr/bin/env node

/**
 * marklang 优化构建脚本
 * 提供多环境构建和高级优化选项
 */

import {execSync} from 'child_process';
import {join} from 'path';

const args = process.argv.slice(2);
const isProduction = args.includes('--production');
const analyzeBundle = args.includes('--analyze');
const target = args.find(arg => arg.startsWith('--target='))?.split('=')[1] || 'all';

// 构建配置
const config = {
    production: isProduction,
    analyze: analyzeBundle,
    target: target,
    outputDir: join(process.cwd(), 'lib'),
    sourceDir: join(process.cwd(), 'src')
};

function runCommand(command, description) {
    console.log(`\n📋 ${description}`);
    try {
        execSync(command, {
            stdio: 'inherit',
            cwd: process.cwd()
        });
        console.log(`✅ ${description} completed successfully`);
        return true;
    } catch (error) {
        console.error(`❌ ${description} failed:`, error.message);
        return false;
    }
}

// 清理构建目录
function cleanBuild() {
    return runCommand(
        'rm -rf lib && mkdir -p lib',
        'Cleaning build directory'
    );
}

// 构建样式
function buildStyles() {
    return runCommand(
        'npx rollup --config scripts/rollup.style.config.js',
        'Building styles'
    );
}

// 构建 JavaScript（支持按需加载）
function buildJavaScript() {
    const env = config.production ? 'production' : 'development';
    const analyzeFlag = config.analyze ? '--plugin rollup-plugin-visualizer' : '';

    let command = `npx rollup --config scripts/rollup.config.js --environment NODE_ENV:${env}`;

    if (config.analyze) {
        command += ' --plugin rollup-plugin-visualizer';
    }

    return runCommand(command, 'Building JavaScript with optimized configuration');
}

// 生成类型定义
// function generateTypes() {
//     return runCommand(
//         'npx tsc --emitDeclarationOnly --declaration --declarationDir lib/types --skipLibCheck',
//         'Generating TypeScript definitions'
//     );
// }

// 包分析报告
function generateBundleReport() {
    if (!config.analyze) {
        return true;
    };

    console.log('\n📈 Generating bundle analysis report...');

    // 将分析报告移动到 lib 目录
    try {
        const fs = require('fs');
        const path = require('path');
        const source = path.join(process.cwd(), 'stats.html');
        const dest = path.join(process.cwd(), 'lib', 'stats.html');

        if (fs.existsSync(source)) {
            fs.renameSync(source, dest);
            console.log('💡 Open `lib/stats.html` in browser to view detailed bundle analysis');
        } else {
            console.log('ℹ️  Analysis report not found at stats.html');
        }
    } catch (error) {
        console.log('ℹ️  Analysis report is at stats.html (root directory)');
    }

    return true;
}

// 主构建流程
async function main() {
    console.log('🔧 Starting optimized build process...\n');

    // 1. 清理
    if (!cleanBuild()) {
        process.exit(1);
    };

    // 2. 构建样式
    if (!buildStyles()) {
        process.exit(1);
    };

    // 3. 构建 JavaScript
    if (!buildJavaScript()) {
        process.exit(1);
    };

    // 4. 生成类型定义
    // if (!generateTypes()) process.exit(1);

    // 5. 生成分析报告
    generateBundleReport();

    console.log('\n🎉 Build completed successfully!');

}

// 执行构建
main().catch(error => {
    console.error('💥 Build failed:', error);
    process.exit(1);
});

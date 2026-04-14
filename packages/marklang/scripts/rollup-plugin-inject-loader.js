/**
 * Rollup 插件：处理动态导入
 * - UMD 版本：替换 import() 为局部函数调用
 * - ESM 版本：修正路径添加 .esm.js 后缀
 */
module.exports = function injectDynamicLoader() {
    return {
        name: 'inject-dynamic-loader',

        renderChunk(code, chunk) {
            // 对 browser.js 替换 import() 为 _loadPlugin()
            if (chunk.fileName === 'browser.js') {
                return transformUMD(code);
            }

            // 对 browser.esm.js 修正路径（添加 .esm.js 后缀）
            if (chunk.fileName === 'browser.esm.js') {
                return transformESM(code);
            }

            return null;
        }
    };
};

/**
 * UMD 版本：替换 import() 为局部函数调用
 * 注意：_loadPlugin 函数通过 rollup.config.js 的 output.intro 注入
 */
function transformUMD(code) {
    // 支持单引号和双引号
    return code.replace(/import\(['"](\.\/plugins\/[^'"]+)['"]\)/g, '_loadPlugin("$1")');
}

/**
 * ESM 版本：修正动态导入路径，添加 .esm.js 后缀
 */
function transformESM(code) {
    return code.replace(
        /import\(['"]\.\/plugins\/(math|highlight)['"]\)/g,
        'import("./plugins/$1.esm.js")'
    );
}

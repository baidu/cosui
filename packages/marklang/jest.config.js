// eslint-disable-next-line
module.exports = {
    testEnvironment: 'jsdom',
    moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json'],

    transformIgnorePatterns: [
        'node_modules/(?!(unified|bail|devlop|is-plain-obj|trough|vfile|vfile-.*|unist-.*|remark-.*|mdast-.*|micromark|decode-named-character-reference|character-.*|micromark-.*|parse-entities|is-.*|stringify-entities|longest-streak|rehype|rehype-.*|hast.*|property-information|comma-separated-tokens|space-separated-tokens|web-namespaces|ccount|escape-string-regexp|markdown-.*|trim-lines|lowlight|zwitch|html-.*)/)',
    ],
    collectCoverageFrom: [
        "src/**/*.{js,jsx,ts,tsx}",
        "!src/**/*.d.ts",
        "!src/extensions/remark-markers.ts",
        "!src/extensions/rehype-todom.ts",
        "!src/types.ts"
    ],
    collectCoverage: true,
    coverageDirectory: '<rootDir>/test/coverage',
    coverageReporters: ['json', 'lcov', 'text'],

    // Indicates which provider should be used to instrument code for coverage
    coverageProvider: 'v8',

    // 代码覆盖率检查忽略文件
    coveragePathIgnorePatterns: ['node_modules', 'test'],
    coverageThreshold: {
        global: {
        branches: 90,
        functions: 90,
        lines: 90,
        statements: 90,
        },
    },
};

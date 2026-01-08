module.exports = {
    root: true,
    parser: '@typescript-eslint/parser',
    plugins: [
        '@typescript-eslint'
    ],
    parserOptions: {
        project: [
            'tsconfig.json',
            'packages/cosmic/tsconfig.json',
            'packages/cosmic-card/tsconfig.json',
            'packages/cosmic-dqa/tsconfig.json',
            'packages/cosmic-dynamic-ui/tsconfig.json',
            'packages/cosmic-chat/tsconfig.json',
            'packages/cosmic-shop/tsconfig.json'
        ]
    },
    extends: [
        '@ecomfe/eslint-config',
        '@ecomfe/eslint-config/typescript'
        // '@ecomfe/eslint-config/san',
        // 'plugin:san/recommended'
    ],
    rules: {
        'comma-dangle': ['error', 'never']
    }
};

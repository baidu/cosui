module.exports = {
    // Use this package's parser for TypeScript 5 syntax and Zod type inference.
    parser: require.resolve('@typescript-eslint/parser'),
    parserOptions: {
        tsconfigRootDir: __dirname,
        project: './tsconfig.json'
    },
    overrides: [
        {
            // JS tooling files are not part of the source TypeScript project.
            files: ['**/*.js', '**/*.cjs', '**/*.mjs'],
            parserOptions: {
                project: null
            }
        }
    ]
};

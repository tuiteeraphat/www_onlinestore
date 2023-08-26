module.exports = {
    semi: false,
    singleQuote: true,
    bracketSpacing: true,
    jsxBracketSameLine: false,
    trailingComma: 'es5',
    tabWidth: 4,
    overrides: [
        {
            files: '*.gql',
            options: {
                parser: 'graphql',
            },
        },
    ],
}

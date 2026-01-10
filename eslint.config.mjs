// @ts-check
import withNuxt from './.nuxt/eslint.config.mjs'

export default withNuxt({
    rules: {
        // Allow type imports with 'type' keyword
        '@typescript-eslint/consistent-type-imports': ['error', {
            prefer: 'type-imports',
            fixStyle: 'inline-type-imports',
        }],
    },
});

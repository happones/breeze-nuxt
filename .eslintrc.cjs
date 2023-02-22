module.exports = {
    root: true,
    'extends': ['plugin:vue/vue3-recommended', 'eslint:recommended', '@vue/eslint-config-prettier', "prettier"],
    parserOptions: {
        ecmaVersion: 'latest'
    },
    rules: {
        'vue/multi-word-component-names': 'off', semi: ['error', 'always']
    },
    globals: {}
}

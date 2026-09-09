import pluginVue from 'eslint-plugin-vue';
import vueTsConfig from '@vue/eslint-config-typescript';

export default [
    {
        ignores: [
            'dist/**',
            'node_modules/**',
            'patches/**',
            'public/static/**',
            'components.d.ts',
            'src/styles/**',
            'src/**/*.d.ts',
            'src/common/CheckGroup/**',
            'src/common/Loading/index.vue',
            'src/common/Observer/**',
            'src/common/VImage/**',
            'src/common/VModal/**',
            'src/common/views/ErrorPage/**',
            'src/common/views/Redirect/**',
            'src/components/TransferSelect/**',
            'src/utils/drag.ts',
            'src/utils/ployfill.ts',
        ],
    },
    ...pluginVue.configs['flat/essential'],
    ...vueTsConfig(),
    {
        rules: {
            'vue/multi-word-component-names': 'off',
            'vue/no-v-html': 'off',
            'vue/no-export-in-script-setup': 'off',
            '@typescript-eslint/no-explicit-any': 'off',
            '@typescript-eslint/no-unused-vars': [
                'error',
                { argsIgnorePattern: '^_', varsIgnorePattern: '^_' },
            ],
        },
    },
];

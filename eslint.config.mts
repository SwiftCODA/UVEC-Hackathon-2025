import js from '@eslint/js'
import pluginReact from 'eslint-plugin-react'
import reactHooks from 'eslint-plugin-react-hooks'
import { defineConfig } from 'eslint/config'
import globals from 'globals'
import tseslint from 'typescript-eslint'

export default defineConfig([
    ...tseslint.configs.recommended,
    pluginReact.configs.flat.recommended,
    {
        ignores: [
            '**/.vercel/**',
            '**/.next/**',
            '**/metro.config.js',
            '**/dist/**'
        ]
    },
    {
        files: ['**/*.{js,mjs,cjs,ts,mts,cts,jsx,tsx}'],
        plugins: {
            js,
            'react-hooks': reactHooks
        },
        ...js.configs.recommended,
        languageOptions: {
            globals: {
                ...globals.browser,
                ...globals.node
            }
        },
        rules: {
            'no-unused-vars': 'off',
            'no-undef': 'off',
            'no-await-in-loop': 'error',
            'react-hooks/rules-of-hooks': 'error',
            'react-hooks/exhaustive-deps': 'error',
            '@typescript-eslint/no-namespace': 'off',
            '@typescript-eslint/no-unused-vars': [
                'error',
                {
                    argsIgnorePattern: '^_+$',
                    varsIgnorePattern: '^_+$'
                }
            ],
            '@typescript-eslint/no-require-imports': 'off'
        },
        settings: {
            react: {
                version: 'detect'
            }
        }
    },
    {
        files: ['**/*.{jsx,tsx}'],
        languageOptions: {
            parserOptions: {
                ecmaFeatures: { jsx: true }
            }
        },
        rules: {
            'react/react-in-jsx-scope': 'off',
            'react/jsx-uses-react': 'off'
        },
        settings: {
            react: {
                version: 'detect'
            }
        }
    }
])

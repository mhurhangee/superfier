import { dirname } from 'path'
import { fileURLToPath } from 'url'
import { FlatCompat } from '@eslint/eslintrc'
import prettierPlugin from 'eslint-plugin-prettier'
import prettierConfig from 'eslint-config-prettier'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

const compat = new FlatCompat({
  baseDirectory: __dirname,
})

const eslintConfig = [
  ...compat.extends('next/core-web-vitals', 'next/typescript'),
  {
    name: 'Prettier',
    plugins: {
      prettier: prettierPlugin, // ✅ Fix: Use an object instead of a string
    },
    rules: {
      'prettier/prettier': 'error',
    },
  },
  prettierConfig, // ✅ Fix: Import `eslint-config-prettier` as an object
]

export default eslintConfig

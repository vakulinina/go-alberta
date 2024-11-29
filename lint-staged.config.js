export default {
  '*.{js,jsx,ts,tsx}': [() => 'tsc --project tsconfig.json', 'prettier --check --write', 'eslint --fix'],
  '*.{css,less,scss,sss}': ['prettier --check --write'],
}

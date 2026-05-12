#!/bin/bash

echo "Installing linting & formatting tools..."

npm install -D eslint eslint-config-next @typescript-eslint/parser @typescript-eslint/eslint-plugin eslint-config-prettier eslint-plugin-import eslint-plugin-unused-imports eslint-plugin-tailwindcss@beta prettier prettier-plugin-tailwindcss husky lint-staged

echo "Creating ESLint config..."

cat <<EOF > .eslintrc.json
{
  "root": true,
  "parser": "@typescript-eslint/parser",
  "plugins": [
    "@typescript-eslint",
    "unused-imports",
    "tailwindcss"
  ],
  "extends": [
    "next/core-web-vitals",
    "plugin:@typescript-eslint/recommended",
    "plugin:tailwindcss/recommended",
    "prettier"
  ],
  "rules": {
    "unused-imports/no-unused-imports": "error",

    "@typescript-eslint/no-unused-vars": [
      "warn",
      { "argsIgnorePattern": "^_" }
    ],

    "import/order": [
      "warn",
      {
        "groups": [
          "builtin",
          "external",
          "internal",
          ["parent", "sibling", "index"]
        ],
        "newlines-between": "always"
      }
    ]
  }
}
EOF

echo "Creating Prettier config..."

cat <<EOF > .prettierrc
{
  "semi": false,
  "singleQuote": true,
  "trailingComma": "all",
  "printWidth": 90,
  "plugins": ["prettier-plugin-tailwindcss"]
}
EOF

echo "Creating ignore files..."

cat <<EOF > .prettierignore
node_modules
.next
dist
build
coverage
EOF

cat <<EOF > .eslintignore
node_modules
.next
dist
build
EOF

echo "Creating VSCode settings..."

mkdir -p .vscode

cat <<EOF > .vscode/settings.json
{
  "editor.formatOnSave": true,
  "editor.defaultFormatter": "esbenp.prettier-vscode",

  "editor.codeActionsOnSave": {
    "source.fixAll.eslint": true
  }
}
EOF

echo "Updating package.json scripts..."

node <<'NODE'
const fs = require('fs')
const pkg = JSON.parse(fs.readFileSync('package.json', 'utf8'))

pkg.scripts = pkg.scripts || {}

pkg.scripts.lint = "eslint ."
pkg.scripts["lint:fix"] = "eslint . --fix"
pkg.scripts.format = "prettier --write ."

pkg["lint-staged"] = {
  "*.{ts,tsx,js,jsx}": [
    "eslint --fix",
    "prettier --write"
  ]
}

fs.writeFileSync('package.json', JSON.stringify(pkg, null, 2))
NODE

echo "Setting up Husky..."

npx husky init

cat <<EOF > .husky/pre-commit
#!/bin/sh
npx lint-staged
EOF

chmod +x .husky/pre-commit

echo "Setup complete!"
echo ""
echo "Available commands:"
echo "npm run lint"
echo "npm run lint:fix"
echo "npm run format"
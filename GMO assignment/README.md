Here’s your updated **project documentation** with:

* Basic React + Vite setup
* ESLint configuration
* React Prime (PrimeReact) installation
* Assignment info for *GrowMeOrganic Private Limited*, submitted by *Yatinder Kumar*

---

# React + TypeScript + Vite + PrimeReact

This template provides a minimal setup to get React working in Vite with HMR, TypeScript, ESLint, and PrimeReact components.

## Assignment

**Submitted to:** GrowMeOrganic Private Limited
**Submitted by:** Yatinder Kumar

---

## Getting Started

This project uses [Vite](https://vitejs.dev/) for fast development and build tooling.

### Installation

```bash
npm create vite@latest my-app -- --template react-ts
cd my-app
npm install
```

### Start the Dev Server

```bash
npm run dev
```

---

## PrimeReact Installation

Install the required PrimeReact packages and styles:

```bash
npm install primereact primeicons
```

Add theme and core styles in your `main.tsx` or `index.tsx`:

```tsx
import 'primereact/resources/themes/lara-light-indigo/theme.css'; // Or any other theme
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';
```

You can now import and use PrimeReact components like:

```tsx
import { Button } from 'primereact/button';
```

---

## ESLint Setup

This setup includes ESLint with TypeScript type-aware rules and React linting plugins.

Install ESLint & dependencies:

```bash
npm install -D eslint @typescript-eslint/eslint-plugin @typescript-eslint/parser eslint-plugin-react eslint-plugin-react-hooks eslint-plugin-jsx-a11y
```

### `eslint.config.js`

Using the `eslint-plugin-react-x`, `eslint-plugin-react-dom`, and type-checked configuration from `@typescript-eslint/eslint-plugin`:

```js
// eslint.config.js
import tseslint from 'typescript-eslint';
import reactX from 'eslint-plugin-react-x';
import reactDom from 'eslint-plugin-react-dom';

export default tseslint.config([
  {
    files: ['**/*.{ts,tsx}'],
    ignores: ['dist'],
    extends: [
      ...tseslint.configs.recommendedTypeChecked,
      ...tseslint.configs.stylisticTypeChecked,
      reactX.configs['recommended-typescript'],
      reactDom.configs.recommended,
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
    },
  },
]);
```

---


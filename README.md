# AI Note App

Minimal notes application built with React, MobX and TypeScript.

The sidebar contains a "Создать" button above the notes list. Action buttons are
colored and slightly larger, and note titles are truncated to 20 characters with
an ellipsis when necessary.

## Development

```bash
npm install
npm run dev
```

## Build

```bash
npm run build
```

Notes are stored in `LocalStorage` under the key `notes`.

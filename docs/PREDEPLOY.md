# BrandGoto pre-deploy checklist

Run the same required checks as CI:

```sh
npm ci
npm run typecheck
npm run lint
npm run build
npm run smoke
```

Before publishing, also keyboard-test the primary conversion path (homepage → offer page → Strategic GTM Audit), verify the modal closes with Escape and restores focus, and confirm the generated route HTML in `dist/` contains the expected canonical URL.

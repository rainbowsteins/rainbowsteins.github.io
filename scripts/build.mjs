import { build } from 'esbuild';
import { cp, mkdir, readFile, writeFile, rm } from 'node:fs/promises';
await rm('dist', { recursive: true, force: true });
await mkdir('dist/assets', { recursive: true });
await build({ entryPoints: ['app/main.tsx'], bundle: true, outdir: 'dist/assets', entryNames: 'main', minify: true, sourcemap: false, target: ['es2022'], format: 'esm', jsx: 'automatic', loader: { '.woff2': 'dataurl' }, define: { 'process.env.NODE_ENV': '"production"' }, metafile: true }).then(async result => {
  await mkdir('.sites-runtime', { recursive: true });
  await writeFile('.sites-runtime/build-meta.json', JSON.stringify(result.metafile));
});
await cp('public', 'dist', { recursive: true });
await cp('index.html', 'dist/index.html');
// A self-contained preview also works when opened directly, without a server.
const [html, css, js] = await Promise.all(['index.html', 'dist/assets/main.css', 'dist/assets/main.js'].map(p => readFile(p, 'utf8')));
const preview = html
  .replace('<link rel="stylesheet" href="/assets/main.css" />', () => `<style>${css}</style>`)
  .replace('<link rel="icon" type="image/svg+xml" href="/favicon.svg" />', '<link rel="icon" type="image/svg+xml" href="./favicon.svg" />')
  .replace('<script type="module" src="/assets/main.js"></script>', () => `<script type="module">${js.replaceAll('</script', '<\\/script')}</script>`);
await writeFile('dist/preview.html', preview);
console.log('Built bilingual portfolio → dist/');

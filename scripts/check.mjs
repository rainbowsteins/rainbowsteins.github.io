import assert from 'node:assert/strict';
import { build } from 'esbuild';
import { createElement } from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import { readFile, stat } from 'node:fs/promises';
await build({entryPoints:['app/page.tsx'],bundle:true,platform:'node',format:'esm',jsx:'automatic',outfile:'.sites-runtime/render-check.mjs',packages:'external'});
const {default:Home}=await import('../.sites-runtime/render-check.mjs');
for (const lang of ['zh','en']) {
 const html=renderToStaticMarkup(createElement(Home,{initialLanguage:lang}));
 assert.equal((html.match(/<h1\b/g)||[]).length,1,'One main heading');
 for(const id of ['about','work','journey','toolkit','contact']) assert.ok(html.includes(`id="${id}"`)&&html.includes(`href="#${id}"`),`Working section target: ${id}`);
 assert.ok(html.includes('https://github.com/rainbowsteins/'));
 assert.ok(!html.includes('github.com/monorio'));
 assert.ok(html.includes(lang==='zh'?'让智能，':'Intelligence,'));
 assert.ok(html.includes(lang==='zh'?'Qiwei_Zhang_CV_ZH.docx':'Qiwei_Zhang_CV_EN.docx'));
 assert.equal((html.match(/class="project-link"/g)||[]).length,3,'Three project detail actions');
 assert.equal((html.match(/class="skill-group reveal"/g)||[]).length,6,'Six skill groups');
 for(const href of html.matchAll(/href="(\/[^"#?]*)"/g)) await stat('dist'+href[1]);
 console.log(`${lang}: semantic render, section links, GitHub and CV assets verified`);
}
const preview=await readFile('dist/preview.html','utf8');
assert.ok(preview.includes('<style>')&&preview.includes('<script type="module">'));
assert.ok(!preview.includes('src="/assets/main.js"'));
assert.ok(!preview.includes('href="/assets/main.css"'));
console.log('Standalone preview contains its JavaScript, CSS and fonts.');

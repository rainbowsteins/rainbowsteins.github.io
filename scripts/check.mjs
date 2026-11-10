import assert from 'node:assert/strict';
import { build } from 'esbuild';
import { createElement } from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import { readFile, stat } from 'node:fs/promises';
await build({stdin:{contents:"export {default as Home} from './app/page'; export {projectMedia} from './lib/project-media';",resolveDir:process.cwd(),loader:'tsx'},bundle:true,platform:'node',format:'esm',jsx:'automatic',outfile:'.sites-runtime/render-check.mjs',packages:'external'});
const {Home,projectMedia}=await import('../.sites-runtime/render-check.mjs');
for (const lang of ['zh','en']) {
 const html=renderToStaticMarkup(createElement(Home,{initialLanguage:lang}));
 assert.equal((html.match(/<h1\b/g)||[]).length,1,'One main heading');
 for(const id of ['about','work','journey','toolkit','contact']) assert.ok(html.includes(`id="${id}"`)&&html.includes(`href="#${id}"`),`Working section target: ${id}`);
 assert.ok(html.includes('https://github.com/rainbowsteins/'));
 assert.ok(html.includes('https://github.com/rainbowsteins/LostHorizon'));
 assert.equal((html.match(/<video\b/g)||[]).length,2,'Robotics and drone video players');
 assert.ok(!html.includes('autoPlay=')&&!html.includes('autoplay='),'Videos do not autoplay');
 assert.ok(!html.includes('github.com/monorio'));
 assert.ok(html.includes(lang==='zh'?'联合创始人':'Co-founder,'));
 assert.ok(html.includes('XYBERMIND'));
 assert.ok(html.includes(lang==='zh'?'https://www.xyber-mind.com/zh':'https://www.xyber-mind.com/'));
 assert.ok(html.includes(lang==='zh'?'Qiwei_Zhang_CV_ZH.docx':'Qiwei_Zhang_CV_EN.docx'));
 assert.equal((html.match(/class="project-link"/g)||[]).length,4,'Four project detail actions');
 assert.equal((html.match(/class="skill-group reveal"/g)||[]).length,6,'Six skill groups');
 for(const href of html.matchAll(/href="(\/[^"#?]*)"/g)) await stat('dist'+href[1]);
 console.log(`${lang}: semantic render, section links, GitHub and CV assets verified`);
}
const preview=await readFile('dist/preview.html','utf8');
assert.ok(preview.includes('<style>')&&preview.includes('<script type="module">'));
assert.ok(!preview.includes('src="/assets/main.js"'));
assert.ok(!preview.includes('href="/assets/main.css"'));
console.log('Standalone preview contains its JavaScript, CSS and fonts.');

for(const clips of Object.values(projectMedia)) for(const clip of clips) {
 for(const path of [clip.src,clip.poster]) assert.ok((await stat('dist'+path)).size>0,`Media asset exists: ${path}`);
 assert.ok((await stat('dist'+clip.src)).size<50000000,`Web video stays within the asset budget: ${clip.src}`);
}
assert.equal(projectMedia.drone.length,5,'All five drone recordings are included');
console.log('All six video files and posters verified.');

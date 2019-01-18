#!/usr/bin/env node
const fs = require('fs');
const path = require('path');
const buildTask = require('./build-task');

// 返回第几章内容
function checkChapter(fileName) {
  for(let i = 1; i < 12; i++) {
    const chapterDir = `chapter${`0${i}`.slice(-2)}`;
    if(fs.existsSync(path.resolve(__dirname, '..', chapterDir, fileName))) {
      return i;
    }
  }
  return 0;
}

/* eslint-enable no-console */
(async function () {
  await buildTask({production: true});

  const root = path.resolve(__dirname, '../docs');
  const pa = fs.readdirSync(root);
  const pages = pa.map((el) => {
    const file = path.resolve(root, el);
    const info = fs.statSync(path.resolve(file));
    if(info.isFile() && /.html$/.test(el)) {
      const chapter = checkChapter(el.slice(0, -5));

      const content = fs.readFileSync(file).toString('utf-8');
      const matched = content.match(/<title>(.*)<\/title>/im);
      if(matched) {
        const linkText = `${matched[1]} (${el})`;
        return [linkText, el, chapter];
      }
    }
    return null;
  }).filter(e => e).sort((a, b) => a[2] - b[2]);

  const output = `
<html>
  <head>
    <title>Interactive Computer Graphics —— WebGL</title>
  </head>
  <body>
  ${Array.from({length: 12}).map((_, i) => {
    const list = pages.filter(p => p[2] === i + 1);
    if(list.length) {
      return `<h2>第${i + 1}章</h2><ul>${list.map(p => `<li><a href="/${p[1]}" target="_blank">${p[0]}</a></li>`).join('')}</ul>`;
    }
    return '';
  }).join('')}
  </body>
</html>
  `;

  // console.log(output);
  fs.writeFileSync('./docs/index.html', output);
}());
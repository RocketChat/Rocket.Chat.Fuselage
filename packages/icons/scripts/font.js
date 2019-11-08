const fs = require('fs');
const { Readable } = require('stream');

const SVGIcons2SVGFontStream = require('svgicons2svgfont');
const svg2ttf = require('svg2ttf');
const ttf2eot = require('ttf2eot');
const ttf2woff = require('ttf2woff');
const ttf2woff2 = require('ttf2woff2');

const { toCamelCase, toIdentifier, createIconList, createIconListModule } = require('./helpers');
const { getFontIcons } = require('./icons');
const manifest = require('../package.json');


const createSvgFont = (icons) => new Promise((resolve, reject) => {
  const createStartCharacterStream = ({ name, path, unicode }) => {
    const stream = fs.createReadStream(path);
    stream.metadata = { name, unicode };

    return stream;
  };

  const createEndCharacterStream = ({ name, path, unicode }) => {
    const stream = new Readable();
    stream._read = () => {};
    stream.metadata = { name: `${ name }-mirror`, unicode };

    fs.readFile(path, { encoding: 'utf8' }, (error, code) => {
      if (error) {
        stream.emit('error', error);
        return;
      }

      const mirroredCode = code
        .replace(/viewBox="(.*?)"/, (_, viewBox) => {
          const [x1, , x2] = viewBox.split(' ');
          return `viewBox="${ viewBox }" transform="translate(${ x2 - x1 } 0) scale(-1 1)"`;
        });
      stream.push(mirroredCode);
      stream.push(null);
    });

    return stream;
  };

  const iconStreams = icons.map(({ mirror, ...icon }) =>
    (mirror ? createEndCharacterStream(icon) : createStartCharacterStream(icon)));

  let buffer = Buffer.alloc(0);

  const fontStream = new SVGIcons2SVGFontStream({
    fontName: 'RocketChat',
    fontHeight: 1024,
    normalize: true,
    log: () => {},
  });

  fontStream
    .on('data', (data) => {
      buffer = Buffer.concat([buffer, data]);
    })
    .on('error', (error) => reject(error))
    .on('finish', () => resolve(buffer));

  iconStreams.forEach((stream) => fontStream.write(stream));

  fontStream.end();
});

const createTtfFont = (svgFont) => Buffer.from(svg2ttf(svgFont.toString('utf8'), {
  copyright: manifest.copyright,
  description: manifest.description,
  url: manifest.homepage,
  version: manifest.version.split('.').slice(0, 2).join('.'),
}).buffer);

const createWoffFont = (ttfFont) => Buffer.from(ttf2woff(new Uint8Array(ttfFont)).buffer);

const createWoff2Font = (ttfFont) => Buffer.from(ttf2woff2(new Uint8Array(ttfFont)).buffer);

const createEotFont = (ttfFont) => Buffer.from(ttf2eot(new Uint8Array(ttfFont)).buffer);

const createCss = (icons) =>
  `@font-face {
  font-family: "RocketChat";
  font-style: normal;
  font-weight: 400;
  font-display: auto;

  src: url("./RocketChat.eot");
  src:
    url("./RocketChat.eot?#iefix") format("embedded-opentype"),
    url("./RocketChat.woff2") format("woff2"),
    url("./RocketChat.woff") format("woff"),
    url("./RocketChat.ttf") format("truetype"),
    url("./RocketChat.svg#RocketChat") format("svg");
}

.rcx-icon {
  display: inline-block;
  font-family: "RocketChat";
  font-weight: 400;
  font-style: normal;
  font-variant: normal;
  text-rendering: auto;
  line-height: 1;
  -moz-osx-font-smoothing: grayscale;
  -webkit-font-smoothing: antialiased;
}

.rcx-icon--lg {
  font-size: 1.33333em;
  line-height: 0.75em;
  vertical-align: -0.0667em;
}

.rcx-icon--xs {
  font-size: 0.75em;
}

.rcx-icon--sm {
  font-size: 0.875em;
}

${ new Array(10).fill(null).map((_, i) =>
    `.rcx-icon--${ i + 1 }x {
  font-size: ${ i + 1 }em;
}`).join('\n\n') }

.rcx-icon--fw {
  text-align: center;
  width: 1.25em;
}

${ icons.filter(({ mirror }) => !mirror).map(({ name, unicode }) =>
    `.rcx-icon--${ name }::before {
  content: "\\${ unicode[0].charCodeAt(0).toString(16) }";
}`).join('\n\n') }
`;

const createMinimalCss = () => `@font-face {
  font-family: "RocketChat";
  font-style: normal;
  font-weight: 400;
  font-display: auto;

  src: url("./RocketChat.eot");
  src:
    url("./RocketChat.eot?#iefix") format("embedded-opentype"),
    url("./RocketChat.woff2") format("woff2"),
    url("./RocketChat.woff") format("woff"),
    url("./RocketChat.ttf") format("truetype"),
    url("./RocketChat.svg#RocketChat") format("svg");
}
`;

const createCharactersList = (icons) => icons
  .filter(({ mirror }) => !mirror)
  .map(({ name, unicode }) => [toIdentifier(toCamelCase(name)), JSON.stringify(unicode[0]).replace(/"/g, '\'')])
  .map(([name, character]) => `exports.${ name } = ${ character };\n`)
  .join('');

const createCharactersListModule = (icons) => icons
  .filter(({ mirror }) => !mirror)
  .map(({ name, unicode }) => [toIdentifier(toCamelCase(name)), JSON.stringify(unicode[0]).replace(/"/g, '\'')])
  .map(([name, character]) => `export const ${ name } = ${ character };\n`)
  .join('');

const createHtmlPreview = (icons) =>
  `<!DOCTYPE html>
<meta charset="UTF-8">
<title>${ manifest.name }: font</title>
<style>
body {
  font-family: sans-serif;
  margin: 0;
  padding: 10px 20px;
  text-align: center;
}

.preview {
  width: 100px;
  display: inline-flex;
  flex-flow: column nowrap;
  align-items: stretch;
  margin: 10px;
}

.preview .inner {
  width: 100%;
  height: 85px;
  color: #333;
  background: #f5f5f5;
  line-height: 85px;
  font-size: 40px;
  text-align: center;
  border-radius: 3px 3px 0 0;
}

.preview .inner i {
  line-height: inherit;
}

.label {
  display: inline-block;
  width: 100%;
  box-sizing: border-box;
  padding: 5px;
  font-size: 10px;
  font-family: 'Fira Code', 'Ubuntu Mono', 'DejaVu Sans Mono', 'Liberation Mono', Menlo, Monaco, 'Courier New', monospace;
  color: #666;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  background: #ddd;
  border-radius: 0 0 3px 3px;
  color: #666;
}
</style>
<link rel="stylesheet" type="text/css" href="./RocketChat.css" />
<h1>${ manifest.name }: <em>font</em></h1>
${ icons.filter(({ mirror }) => !mirror).map(({ name }) =>
    `<div class="preview">
  <div class="inner">
    <i class="rcx-icon rcx-icon--${ name }"></i>
  </div>
  <div class="label">${ name }</div>
</div>`).join('\n') }`;

const build = async (srcPath, distPath) => {
  const icons = getFontIcons(srcPath);

  const svgFont = await createSvgFont(icons);
  const ttfFont = createTtfFont(svgFont);
  const woffFont = createWoffFont(ttfFont);
  const woff2Font = createWoff2Font(ttfFont);
  const eotFont = createEotFont(ttfFont);
  const css = createCss(icons);
  const minimalCss = createMinimalCss();
  const iconList = createIconList(icons);
  const iconListModule = createIconListModule(icons);
  const charactersList = createCharactersList(icons);
  const charactersListModule = createCharactersListModule(icons);
  const htmlPreview = createHtmlPreview(icons);

  fs.writeFileSync(`${ distPath }/RocketChat.svg`, svgFont);
  fs.writeFileSync(`${ distPath }/RocketChat.ttf`, ttfFont);
  fs.writeFileSync(`${ distPath }/RocketChat.woff`, woffFont);
  fs.writeFileSync(`${ distPath }/RocketChat.woff2`, woff2Font);
  fs.writeFileSync(`${ distPath }/RocketChat.eot`, eotFont);
  fs.writeFileSync(`${ distPath }/RocketChat.css`, css, { charset: 'utf8' });
  fs.writeFileSync(`${ distPath }/RocketChat.minimal.css`, minimalCss, { charset: 'utf8' });
  fs.writeFileSync(`${ distPath }/index.js`, iconList, { charset: 'utf8' });
  fs.writeFileSync(`${ distPath }/index.mjs`, iconListModule, { charset: 'utf8' });
  fs.writeFileSync(`${ distPath }/characters.js`, charactersList, { charset: 'utf8' });
  fs.writeFileSync(`${ distPath }/characters.mjs`, charactersListModule, { charset: 'utf8' });
  fs.writeFileSync(`${ distPath }/index.html`, htmlPreview, { charset: 'utf8' });
};

module.exports.buildFontIcons = build;

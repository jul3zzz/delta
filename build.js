/* build.js — assemble src/ en delta.html (source de l'artefact) et index.html (page autonome).
   Usage : node build.js */
const fs = require('fs'), path = require('path');
const SRC = path.join(__dirname, 'src');
const files = fs.readdirSync(SRC).sort();

let frag = '';
for (const f of files) {
  const txt = fs.readFileSync(path.join(SRC, f), 'utf8');
  if (f.endsWith('.html')) frag += txt + '\n';
  else if (f.endsWith('.js')) frag += '<script>\n' + txt + '\n</script>\n';
}
frag += '<!--__APPEND__-->\n';
fs.writeFileSync(path.join(__dirname, 'delta.html'), frag);

const html = '<!doctype html>\n<html lang="fr">\n<head>\n<meta charset="utf-8">\n' +
  '<meta name="viewport" content="width=device-width, initial-scale=1">\n' +
  '<meta name="description" content="Delta — reviser le brevet en histoire, geographie et EMC : des cours complets et remplis d\'anecdotes, des cartes dessinees, des exercices corriges, des brevets blancs au format officiel, une dizaine de mini-jeux, une boutique et une collection de reperes.">\n' +
  '<meta name="color-scheme" content="light dark">\n' +
  '<style>html,body{margin:0}*{box-sizing:border-box}img{max-width:100%}[hidden]{display:none!important}</style>\n' +
  '</head>\n<body>\n' + frag + '</body>\n</html>\n';
fs.writeFileSync(path.join(__dirname, 'index.html'), html);

console.log('delta.html : ' + (frag.length / 1024).toFixed(1) + ' Ko');
console.log('index.html : ' + (html.length / 1024).toFixed(1) + ' Ko');
console.log(files.length + ' fichiers assembles.');

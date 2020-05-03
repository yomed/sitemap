const fs = require('fs');
const fsPromises = fs.promises;

function setupEntry(entry) {
  let xml = '';

  ['loc', 'lastmod', 'changefreq', 'priority'].forEach(function (tag) {
    if (entry[tag]) {
      xml += '<' + tag + '>' + entry[tag] + '</' + tag + '>';
    }
  });

  (entry.hreflangs || []).forEach((hreflang) => {
    if (hreflang) {
      const { lang, href } = hreflang;
      if (lang && href) {
        xml += '\n<xhtml:link rel="alternate" hreflang="' + lang + '" href="' + href + '" />';
      }
    }
  });

  return xml && '<url>' + xml + '</url>' || '';
}

async function create(entries, absolutePath = 'dist/root/sitemap.xml') {
  let xml = '<?xml version="1.0" encoding="UTF-8"?>';
  xml += '\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">\n';
  xml += entries.map((entry) => setupEntry(entry)).join('\n');
  xml += '\n</urlset>';

  await fsPromises.writeFile(absolutePath, xml);
}

function createSync(entries, absolutePath = 'dist/root/sitemap.xml') {
  let xml = '<?xml version="1.0" encoding="UTF-8"?>';
  xml += '\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">\n';
  xml += entries.map((entry) => setupEntry(entry)).join('\n');
  xml += '\n</urlset>';

  fs.writeFileSync(absolutePath, xml);
}

module.exports = { create, createSync };

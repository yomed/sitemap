'use strict';

var fs = require('fs');

function setupEntry(entry) {
    var xml = '';
    ['loc', 'lastmod', 'changefreq', 'priority'].forEach(function (tag) {
        if (entry[tag]) {
            xml += '<' + tag + '>' + entry[tag] + '</' + tag + '>';
        }
    });
    (entry.hreflangs || []).forEach(function (hreflang) {
        var lang = hreflang.lang;
        var href = hreflang.href;
        if (lang && href) {
            xml += '\n<xhtml:link rel="alternate" hreflang="' + lang + '" href="' + href + '" />';
        }
    });
    return xml && '<url>' + xml + '</url>' || '';
}

function create(entries, absolutePath) {
    absolutePath = absolutePath || 'dist/root/sitemap.xml';
    var xml = '<?xml version="1.0" encoding="UTF-8"?>';
    xml += '\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">\n';
    xml += entries.map(function (entry) {
        return setupEntry(entry);
    }).join('\n');
    xml += '\n</urlset>';
    fs.writeFileSync(absolutePath, xml);
}

module.exports = {
    create: create
};

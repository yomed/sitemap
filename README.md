# sitemap

Note: intended to run once per server load, so it's sync

```sh
npm i @yomed/sitemap -S
```

## Usage

```js
var sitemap = require('sitemap');

sitemap.create([
  {
    loc: 'http://example.com/'
  },
  {
    loc: 'http://example.com/',
    priority: '1.0'
  }
], 'absolute/path/sitemap.xml'); // defaults to dist/root/sitemap.xml
```

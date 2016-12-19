# post-load-plugins
> Automatically detects process ([PostCSS](https://github.com/postcss/postcss) or [PostHTML](https://github.com/posthtml/posthtml)) creates a configuration and loads the plugins.

[![Travis Build Status](https://img.shields.io/travis/post-org/post-load-plugins.svg?style=flat-square&label=unix)](https://travis-ci.org/post-org/post-load-plugins)[![AppVeyor Build Status](https://img.shields.io/appveyor/ci/post-org/post-load-plugins.svg?style=flat-square&label=windows)](https://ci.appveyor.com/project/post-org/post-load-plugins)[![testen badge](https://img.shields.io/badge/testen-passing-brightgreen.svg?style=flat-square)](https://github.com/egoist/testen)[![node](https://img.shields.io/node/v/post-load-plugins.svg?maxAge=2592000&style=flat-square)]()[![npm version](https://img.shields.io/npm/v/post-load-plugins.svg?style=flat-square)](https://www.npmjs.com/package/post-load-plugins)[![Dependency Status](https://david-dm.org/post-org/post-load-plugins.svg?style=flat-square)](https://david-dm.org/post-org/post-load-plugins)[![XO code style](https://img.shields.io/badge/code_style-XO-5ed9c7.svg?style=flat-square)](https://github.com/sindresorhus/xo)[![Coveralls status](https://img.shields.io/coveralls/post-org/post-load-plugins.svg?style=flat-square)](https://coveralls.io/r/post-org/post-load-plugins)

[![npm downloads](https://img.shields.io/npm/dm/post-load-plugins.svg?style=flat-square)](https://www.npmjs.com/package/post-load-plugins)[![npm](https://img.shields.io/npm/dt/post-load-plugins.svg?style=flat-square)](https://www.npmjs.com/package/post-load-plugins)[![Package Quality](http://npm.packagequality.com/shield/post-load-plugins.svg?style=flat-square)](http://packagequality.com/#?package=post-load-plugins)

## Why?
Automatically detects the running environment on the basis of which creates the configuration for plugins using [post-config](https://github.com/post-org/post-config) used in the process and sorts the execution order of plugins using [post-sequence](https://github.com/GitScrum/post-sequence).

[post-config](https://github.com/post-org/post-config) - Automatically detect all plugins installed and create a configuration for them from the description in package.json used in the process.

[post-sequence](https://github.com/GitScrum/post-sequence) - Generates the correct sequence of execution of plug-ins for the executable

Will inform you if the plugin has not been installed  
![](https://raw.githubusercontent.com/posthtml/posthtml-load-plugins/master/reporting.jpg)

## Install

```bash
$ npm install post-load-plugins 
```
> **Note:** This project is compatible with node v4+

*And install your processor ([PostHTML](https://github.com/posthtml/posthtml) or [PostCSS](https://github.com/postcss/postcss) or both)*  

## Usage

1. Install processor [PostHTML](https://github.com/posthtml/posthtml) or [PostCSS](https://github.com/postcss/postcss) or both and post-load-plugins
```bash
$ npm install postcss posthtml post-load-plugins 
```

2. Install plugins for your processor
```bash
$ npm install autoprefixer postcss-at-rules-variables postcss-csso posthtml-bem posthtml-beautify
```

3. Create configuration for plugins is different from the default in package.json. 
```json
"postcss":{
  "plugins": {
    "autoprefixer": {
      "browsers": ["last 2 versions"]
    },
    "at-rules-variables": {
      "atRule": ["@media"]
    }
  }
},
"posthtml": {
  "bem": {
    "elemPrefix": "__",
    "modPrefix": "--",
    "modDlmtr": "-"
  }
}
```  

> For plugins not having rules installed locally will be used default settings.

> Attention, it is recommended to use notation as above for postcss `postcss: { plugins: { ... } }`, but both types are supported notation `posthtml: { bem: { ... }, plugins: { beautify: { ... } } }`. 

> The names of the plugins it is recommended to use no name of the processor as described above for postcss, but supported the full name of the plugin, the plugin name without the process in kebab `at-rules-variables` and camel case `atRulesVariables`.


## Example
### Nodejs with [PostCSS](https://github.com/postcss/postcss)
package.json
```json
"name": "my-post-project",
"devDependencies": {
    "autoprefixer": "^6.5.4",
    "postcss": "^5.2.6",
    "postcss-csso": "^1.1.2"
},
"postcss":{
  "plugins": {
    "autoprefixer": {
      "browsers": ["last 2 versions"]
    }
  }
}
```
index.js
```js
import postcss from 'postcss';
import postLoadPlugins from 'post-load-plugins';

postcss(postLoadPlugins()).process('.test { display: flex; color: #ff0000;} @charset "utf-8";');
// result => .test{display:-ms-flexbox;display:flex;color:red}
 ```
 *Will apply `autoprefixer` with option described in the configuration `"browsers": ["last 2 versions"]` and postcss-csso with default settings*

 --
 ### Nodejs with [PostHTML](https://github.com/posthtml/posthtml)
package.json
```json
"name": "my-post-project",
"devDependencies": {
    "posthtml": "^0.9.0",
    "posthtml-bem": "^0.2.2",
    "posthtml-beautify": "0.1.0"
},
"posthtml": {
  "bem": {
    "elemPrefix": "__",
    "modPrefix": "--",
    "modDlmtr": "-"
  }
}
```
index.js
```js
import posthtml from 'posthtml';
import postLoadPlugins from 'post-load-plugins';

const html = `
  <div block="content">
    <h1 elem="title">Title</h1>
    <p elem="text" mods="red">Text</p>
  </div>
`;

posthtml(postLoadPlugins()).process(html);
//  result =>
//  <div class="content">
//    <h1 class="content__title">Title</h1>
//
//    <p class="content__text content__text--red">Text</p>
//  </div>
 ```
## Options

*Coming soon*:  
#### `extends`  
Type: `Array`  
Default: `[]`  
Description: *Accepts an object with properties for the expansion*

```js
postLoadPlugins({
  extends: {
    config: {
      posthtml: {
        bem: {
          modDlmtr: '--'
        }
      }
    }
  }
})
```

## LICENSE

> MIT License (MIT)

>Copyright (c) Ivan Demidov <scrum@list.ru>

> Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

> The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

> THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.

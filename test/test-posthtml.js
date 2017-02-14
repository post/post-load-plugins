import path from 'path';
import {readFile} from 'fs';
import posthtml from 'posthtml';
import test from 'ava';
import postLoadPlugins from '../src/index.js';

process.chdir(path.resolve(process.cwd() + '/test'));

const read = path => new Promise((resolve, reject) => {
	readFile(path, 'utf8', (err, data) => {
		if (err) {
			reject(err);
		}
		return resolve(data);
	});
});

test('post-load-pliguns default config for posthtml from package.json', async t => {
	t.is(
		(await read('expected/output-default-config-from-pkg.html')),
		(await posthtml(postLoadPlugins()).process(await read('fixtures/input.html'))).html
	);
});

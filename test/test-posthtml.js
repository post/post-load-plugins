import path from 'path';
import {readFile} from 'fs';
import posthtml from 'posthtml';
import test from 'ava';
import postLoadPlugins from '../src';

process.chdir(path.resolve(process.cwd() + '/test'));
const pwd = path.resolve(process.cwd(), '..');

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
		(await posthtml(postLoadPlugins({pwd})).process(await read('fixtures/input.html'))).html
	);
});

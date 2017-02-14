import path from 'path';
import test from 'ava';
import postLoadPlugins from '../src/index.js';

process.chdir(path.resolve(process.cwd() + '/test'));

test('post-load-pliguns return function', t => {
	t.true(typeof postLoadPlugins() === 'function');
});

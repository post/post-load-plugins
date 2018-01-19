import path from 'path';
import postSequence from 'post-sequence';
import postProcessor from './post-processor';
import postConfig from 'post-config';
import logSymbols from 'log-symbols';
import chalk from 'chalk';
import table from 'text-table';
import indentString from 'indent-string';
import toSlugCase from 'to-slug-case';

chalk.enabled = true;

const loadPlugin = (plugin, warning, pwd) => {
	try {
		return require(path.join(pwd, 'node_modules', toSlugCase(plugin)));
	} catch (err) {
		warning.push(Array.of(indentString(`${chalk.red(logSymbols.error)}`, 4), plugin));
		return () => {};
	}
};

export default (...options) => {
	let warning = [];

	return (ctx, res) => {
		const [{pwd}] = options.length ? options : [{pwd: process.cwd()}];
		console.log(pwd);
		const processor = postProcessor(ctx, res);
		const config = postSequence(postConfig(...options)[processor.name].plugins, {processor: processor.name, namespace: true});
		const plugins = Object.keys(config)
			.map(plugin => loadPlugin(plugin, warning, pwd)(config[plugin]))
			.filter(plugin => plugin !== undefined);

		if (warning.length > 0) {
			console.log(indentString(`${chalk.yellow(logSymbols.warning)} ${chalk.yellow('warning'.toUpperCase())} plugins for ${chalk.red(processor.name)} is not installed`, 2));
			console.log(`${table(warning)}`);
			console.log('\n');
		}

		return plugins.reduce((ctx, plugin) => {
			ctx = plugin(ctx, typeof res === 'function' ? res() : res) || ctx;

			return ctx;
		}, ctx);
	};
};

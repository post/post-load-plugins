/* eslint import/no-dynamic-require: 0 */
import postSequence from 'post-sequence';
import postProcessor from './post-processor';
import postConfig from 'post-config';
import logSymbols from 'log-symbols';
import chalk from 'chalk';
import table from 'text-table';
import indentString from 'indent-string';

chalk.enabled = true;

const toKebabCase = plugin => plugin.replace(/[A-Z]/g, match => `-${match.toLowerCase()}`);
const getModuleName = plugin => `${toKebabCase(plugin)}`;

const loadPlugin = (plugin, warning) => {
	try {
		return require(getModuleName(plugin));
	} catch (err) {
		warning.push(Array.of(indentString(`${chalk.red(logSymbols.error)}`, 4), plugin));
		return () => {};
	}
};

export default (...options) => {
	let warning = [];

	return [(ctx, res) => {
		const processor = postProcessor(ctx);
		const config = postSequence(postConfig(...options)[processor.name].plugins, {processor: processor.name, namespace: true});
		const plugins = Object.keys(config)
			.map(plugin => loadPlugin(plugin, warning, processor)(config[plugin]))
			.filter(plugin => plugin !== undefined);

		if (warning.length > 0) {
			console.log(indentString(`${chalk.yellow(logSymbols.warning)} ${chalk.yellow('warning'.toUpperCase())} plugins for ${processor.name === 'postcss' ? chalk.red(processor.name) : chalk.yellow(processor.name)} is not installed`, 2));
			console.log(`${table(warning)}`);
			console.log('\n');
		}

		return plugins.forEach(plugin => plugin(ctx, typeof res === 'function' ? res() : res));
	}];
};

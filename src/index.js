/* eslint import/no-dynamic-require: 0 */
import postSequence from 'post-sequence';
import logSymbols from 'log-symbols';
import chalk from 'chalk';
import table from 'text-table';
import indentString from 'indent-string';
import postConfig from 'post-config';

const toKebabCase = plugin => plugin.replace(/[A-Z]/g, match => `-${match.toLowerCase()}`);
const getModuleName = plugin => `posthtml-${toKebabCase(plugin)}`;

function processor(plugin, warning) {
	try {
		return require(getModuleName(plugin));
	} catch (err) {
		warning.push(Array.of(indentString(`${logSymbols.error}`, 4), `posthtml-${plugin}`));
		return () => {};
	}
}

export default (cfg, extCfg) => {
	let warning = [];
	const config = postSequence(postConfig(cfg, extCfg), {processor: 'posthtml'});
	const plugins = Object.keys(config)
		.map(plugin => processor(plugin, warning)(config[plugin]))
		.filter(plugin => plugin !== undefined);

	if (warning.length > 0) {
		console.log(indentString(`${logSymbols.warning} ${chalk.yellow('warning'.toUpperCase())} plugins is not installed`, 2));
		console.log(`${table(warning)}`);
	}

	return plugins;
};

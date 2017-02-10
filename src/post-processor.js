import Reflect from 'core-js/library/es6/reflect';

const findProcessorName = args => {
	const ctx = args.find(ctx => Reflect.has(ctx, 'processor') && Reflect.has(ctx.processor, 'name'));
	let name = ctx ? ctx.processor.name : undefined;

	// detect postcss
	if (name === undefined && args[0].type === 'root' && Reflect.has(args[1], 'processor')) {
		name = 'postcss';
	}

	// detect reshape
	if (name === undefined && Reflect.has(args[1], 'ReshapeError')) {
		name = 'reshape';
	}

	return name.toLowerCase();
};

export default (...ctx) => ({
	name: findProcessorName(ctx)
});

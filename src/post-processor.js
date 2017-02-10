import Reflect from 'core-js/library/es6/reflect';

const findProcessorName = args => {
	const ctx = args.find(ctx => Reflect.has(ctx, 'processor') && Reflect.has(ctx.processor, 'name'));
	return ctx ? ctx.processor.name : 'postcss';
};

export default (...ctx) => {
	return {
		name: findProcessorName(ctx)
	};
};

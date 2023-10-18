const useDebounce = (func, delay) => {
	let timeoutId;

	return function (...args) {
		const context = this;
		clearTimeout(timeoutId);

		console.log('context debounce', context);
		console.log('args', args);
		timeoutId = setTimeout(function () {
			func.apply(context, args);
		}, delay);
	};
};

export default useDebounce;

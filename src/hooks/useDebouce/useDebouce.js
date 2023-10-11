const useDebounce = (func, delay) => {
	let timeoutId;

	return function (...args) {
		const context = this;

		clearTimeout(timeoutId);

		timeoutId = setTimeout(function () {
			func.apply(context, args);
		}, delay);
	};
};

export default useDebounce;

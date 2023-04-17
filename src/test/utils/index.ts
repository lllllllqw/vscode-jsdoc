export const sleep = (timeout = 100) => new Promise((resolve) => {
	setTimeout(() => {
		resolve(undefined);
	}, timeout);
});


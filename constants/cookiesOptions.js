export const cookiesOptions = {
	path: '/',
	expires: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
	httpOnly: true
};

export const expireCookiesOptions = {
	path: '/',
	expires: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000),
	httpOnly: true
};
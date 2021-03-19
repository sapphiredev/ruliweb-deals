import fetch from 'node-fetch';
import { USER_AGENT } from '../constants';

export const sendRequest = async (url: string): Promise<string> => {
	console.log('sendRequest');
	const response = await fetch(url, {
		headers: { 'User-Agent': USER_AGENT },
	});
	console.log('response.ok', response.ok);
	if (response.ok) {
		return await response.text();
	}
	throw new Error(response.statusText);
};

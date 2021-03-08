import fetch from 'node-fetch';
import { USER_AGENT } from '../constants';

export const sendRequest = async (url: string): Promise<string> => {
	const response = await fetch(url, {
		headers: { 'User-Agent': USER_AGENT },
	});
	if (response.ok) {
		return await response.text();
	}
	throw new Error(response.statusText);
};

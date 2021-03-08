import type { AWS } from '@serverless/typescript';
import { handlerPath } from '@libs/handlerResolver';

export const main: AWS['functions'][0] = {
	handler: `${handlerPath(__dirname)}/handler.index`,
	events: [
		{
			http: {
				method: 'post',
				path: 'main',
			},
			schedule: {
				rate: 'rate(5 minutes)',
				enabled: true,
				input: { text: 'sapphire' },
			},
		},
	],
};

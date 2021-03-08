import 'source-map-support/register';
import { APIGatewayProxyHandler } from 'aws-lambda';
import { middyfy } from '@libs/lambda';
import {
	Database,
	Parser,
	Tweeter,
} from '../../modules';

const main: APIGatewayProxyHandler = async event => {
	// tslint:disable:no-string-literal
	if (event['text'] !== 'sapphire') {
		return {
			statusCode: 403,
			body: 'forbidden',
		};
	}

	const config = {
		consumer_key: process.env.TWITTER_CONSUMER_KEY ?? 'consumer_key',
		consumer_secret: process.env.TWITTER_CONSUMER_SECRET ?? 'consumer_secret',
		access_token: process.env.TWITTER_ACCESS_TOKEN ?? 'access_token',
		access_token_secret: process.env.TWITTER_ACCESS_TOKEN_SECRET ?? 'access_token_secret',
	};

	const parser = new Parser();
	const database = new Database();
	const tweeter = new Tweeter(config);

	const [
		items,
		index,
	] = await Promise.all([
		parser.parse(),
		database.getIndex(),
	]);

	for (const item of items) {
		if (index >= item.id) {
			continue;
		}
		await tweeter.tweetItem(item);
		await database.setIndex(item.id);
	}

	return {
		statusCode: 200,
		body: JSON.stringify([]),
	};
};

export const index = middyfy(main);

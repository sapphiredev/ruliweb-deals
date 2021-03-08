import _ from 'lodash';
import {
	DynamoDBClient,
	GetItemCommand,
	PutItemCommand,
} from '@aws-sdk/client-dynamodb';
import {
	INDEX_KEY_NAME,
	TABLE_NAME,
} from '../constants';

export class Database {
	private readonly client: DynamoDBClient;

	public constructor() {
		this.client = new DynamoDBClient({});
	}

	public get defaultIndex(): number {
		return 48924;
	}

	// public async insertItems(items: Item[]): Promise<void> {
	// 	const getIds = async () => {
	// 		const command = new BatchGetItemCommand({
	// 			RequestItems: {
	// 				[TableName.ITEMS]: {
	// 					Keys: items.map(x => ({ id: { N: `${x.id}` } })),
	// 				},
	// 			},
	// 		});
	// 		const data = await this.client.send(command);
	// 		return data.Responses[TableName.ITEMS].map(x => parseInt(x.id.N, 10));
	// 	};
	// 	const ids = await getIds();

	// 	const index = await this.getIndex();
	// 	for (const item of items) {
	// 		if (index >= item.id) {
	// 			continue;
	// 		}
	// 		if (ids.includes(item.id)) {
	// 			continue;
	// 		}
	// 		await this.insertItem(item);
	// 	}
	// }

	// public async insertItem(item: Item): Promise<void> {
	// 	const command = new PutItemCommand({
	// 		TableName: TableName.ITEMS,
	// 		Item: {
	// 			id: { N: `${item.id}` },
	// 			type: { S: item.type },
	// 			title: { S: item.title },
	// 			link: { S: item.link },
	// 			tweet: { N: `${item.tweet}` },
	// 			ttl: { N: `${Math.floor(Date.now() / 1000) + 10}` },
	// 		},
	// 	});
	// 	await this.client.send(command);
	// }

	public async setIndex(index: number): Promise<void> {
		const command = new PutItemCommand({
			TableName: TABLE_NAME,
			Item: {
				id: { N: INDEX_KEY_NAME },
				value: { N: `${index}` },
			},
		});
		await this.client.send(command);
	}

	public async getIndex(): Promise<number> {
		const command = new GetItemCommand({
			TableName: TABLE_NAME,
			Key: { id: { N: INDEX_KEY_NAME } },
		});
		const result = await this.client.send(command);
		if (result.Item === undefined) {
			return this.defaultIndex;
		}
		return parseInt(result.Item.value.N, 10);
	}
}

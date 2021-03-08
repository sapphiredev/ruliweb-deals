import type { AWS } from '@serverless/typescript';
import { main } from '@functions/main';

const serverlessConfiguration: AWS = {
	service: 'ruliweb-deals',
	frameworkVersion: '2',
	custom: {
		webpack: {
			webpackConfig: './webpack.config.js',
			includeModules: true,
		},
	},
	plugins: [
		'serverless-webpack',
		'serverless-offline',
	],
	provider: {
		name: 'aws',
		runtime: 'nodejs12.x', // https://github.com/dherault/serverless-offline/issues/1172
		region: 'ap-northeast-2',
		apiGateway: {
			minimumCompressionSize: 1024,
			shouldStartNameWithService: true,
		},
		iamRoleStatements: [
			{
				Effect: 'Allow',
				Action: [
					'dynamodb:GetItem',
					'dynamodb:PutItem',
				],
				Resource: [
					{
						'Fn::Sub': 'arn:${AWS::Partition}:dynamodb:${AWS::Region}:${AWS::AccountId}:table/*',
					},
				],
			},
		],
		environment: {
			AWS_NODEJS_CONNECTION_REUSE_ENABLED: '1',
			TWITTER_ACCESS_TOKEN: '${ssm:/twitter/ruliweb_deals/access_token}',
			TWITTER_ACCESS_TOKEN_SECRET: '${ssm:/twitter/ruliweb_deals/access_token_secret~true}',
			TWITTER_CONSUMER_KEY: '${ssm:/twitter/ruliweb_deals/consumer_key}',
			TWITTER_CONSUMER_SECRET: '${ssm:/twitter/ruliweb_deals/consumer_secret~true}',
		},
		lambdaHashingVersion: '20201221',
		logRetentionInDays: 14,
		versionFunctions: false,
	},
	// import the function via paths
	functions: {
		main,
	},
};

module.exports = serverlessConfiguration;

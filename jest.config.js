module.exports = {
	preset: 'ts-jest',
	testEnvironment: 'node',
	globals: {
		'ts-jest': {
			'isolatedModules': true,
		},
		'__test': true,
		'__config': {
			consumer_key: 'consumer_key',
			consumer_secret: 'consumer_secret',
			access_token: 'access_token',
			access_token_secret: 'access_token_secret',
		},
	},
	moduleNameMapper: {
		'~/(.*)': '<rootDir>/src/$1',
		'\\.txt$': '<rootDir>/src/list.mock.ts',
	},
	rootDir: '.',
	collectCoverageFrom: [
		'src/**/*.{js,ts}'
	],
};

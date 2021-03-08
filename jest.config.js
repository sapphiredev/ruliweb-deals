module.exports = {
	preset: 'ts-jest',
	testEnvironment: 'node',
	globals: {
		'ts-jest': {
			'isolatedModules': true,
		},
		'__test': true,
	},
	rootDir: '.',
	collectCoverageFrom: [
		'src/**/*.{js,ts}'
	],
};

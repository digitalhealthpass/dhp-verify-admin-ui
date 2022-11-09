module.exports = {
	env: {
		browser: true,
		es2021: true,
	},
	extends: ['plugin:react/recommended', 'plugin:react/jsx-runtime', 'airbnb', 'prettier'],
	overrides: [],
	parserOptions: {
		ecmaVersion: 'latest',
		sourceType: 'module',
	},
	plugins: ['react', 'prettier'],
	rules: {
		'import/prefer-default-export': 'off',
		'max-len': 0,
		'react/prop-types': 0,
		'react/react-in-jsx-scope': 'off',
		'react/jsx-props-no-spreading': 'off',
		'react/function-component-definition': [2, { namedComponents: 'arrow-function' }],
		indent: 0,
		//  'react/jsx-indent': [3, 'tab'],
		//  'react/jsx-indent-props': [3, 'tab'],
	},
};

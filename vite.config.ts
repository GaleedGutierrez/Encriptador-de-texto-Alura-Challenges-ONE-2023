import { defineConfig, UserConfigExport } from 'vite';

const config: UserConfigExport = {
	base: './',
	server: {
		open: './',
		port: 8080,
		host: true,
	},
	// build: {
	// 	// sourcemap: true,
	// 	// manifest: true,
	// 	rollupOptions: {
	// 		input: {
	// 			index: resolve(__dirname, './public/index.html'),
	// 			'guide-styles': resolve(
	// 				__dirname,
	// 				'./public/guide-styles.html'
	// 			),
	// 		},
	// 	},
	// },
};

export default defineConfig(config);

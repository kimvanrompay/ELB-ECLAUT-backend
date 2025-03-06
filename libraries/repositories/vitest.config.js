import {defineConfig} from 'vite';

export default defineConfig({
	test: {
		globals: true,
		exclude: [],
		setupFiles: ['./test/init-tests.ts'],
		sequence: {
			concurrent: false,
		},
		fileParallelism: false,
	},
});

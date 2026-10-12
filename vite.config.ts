import { defineConfig } from 'vite';
import { resolve } from 'node:path';
import { cp } from 'node:fs/promises';

const root = resolve(__dirname);
const exampleData = resolve(root, 'example/data');

const copyExampleData = () => ({
	name: 'copy-example-data',
	async closeBundle() {
		await cp(exampleData, resolve(root, 'build/data'), {recursive: true});
	},
});

export default defineConfig(({ command, mode }) => {
	const isExample = command === 'serve' || mode === 'example';

	if (isExample) {
		return {
			root: resolve(root, 'example'),
			server: {
				fs: {
					allow: [root],
				},
			},
			build: {
				outDir: resolve(root, 'build'),
				emptyOutDir: true,
			},
			plugins: [copyExampleData()],
		};
	}

	return {
		build: {
			outDir: resolve(root, 'dist'),
			emptyOutDir: true,
			lib: {
				entry: resolve(root, 'source/index.ts'),
				formats: ['es'],
				fileName: 'index',
			},
			rollupOptions: {
				external: ['three'],
			},
		},
	};
});

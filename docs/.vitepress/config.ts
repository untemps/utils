import { defineConfig } from 'vitepress'
import typedocSidebar from '../api/typedoc-sidebar.json'

export default defineConfig({
	title: '@untemps/utils',
	description: 'Zero-dependency utilities for @untemps packages',
	cleanUrls: true,
	themeConfig: {
		nav: [
			{ text: 'API', link: '/api/' },
			{ text: 'GitHub', link: 'https://github.com/untemps/utils' },
		],
		sidebar: {
			'/api/': [{ text: 'API', items: typedocSidebar }],
		},
		socialLinks: [{ icon: 'github', link: 'https://github.com/untemps/utils' }],
		search: {
			provider: 'local',
		},
	},
})

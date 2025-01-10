import type { ManifestDashboard } from '@umbraco-cms/backoffice/dashboard';

export const manifests: Array<ManifestDashboard> = [
	{
		type: 'dashboard',
		name: 'Example Test Dashboard',
		alias: 'example.dashboard.test',
		element: () => import('./test-dashboard.js'),
		weight: 900,
		meta: {
			label: 'Test example',
			pathname: 'test-example',
		},
	},
];

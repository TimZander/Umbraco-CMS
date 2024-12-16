import { UMB_CONTENT_SECTION_ALIAS } from '../constants.js';

export const manifests: Array<UmbExtensionManifest> = [
	{
		type: 'dashboard',
		kind: 'default',
		alias: 'Umb.Dashboard.Content',
		name: 'Content Dashboard',
		weight: 500,
		meta: {
			label: '#dashboardTabs_contentIntro',
			pathname: 'overview',
		},
		conditions: [
			{
				alias: 'Umb.Condition.SectionAlias',
				match: UMB_CONTENT_SECTION_ALIAS,
			},
		],
	},
];

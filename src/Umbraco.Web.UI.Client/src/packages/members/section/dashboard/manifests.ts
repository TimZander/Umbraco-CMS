import { UMB_MEMBER_MANAGEMENT_SECTION_ALIAS } from '../index.js';

export const manifests: Array<UmbExtensionManifest> = [
	{
		type: 'dashboard',
		kind: 'default',
		alias: 'Umb.Dashboard.MemberManagement',
		name: 'Member Management Dashboard',
		weight: 1000,
		meta: {
			label: 'Overview',
			pathname: 'overview',
		},
		conditions: [
			{
				alias: 'Umb.Condition.SectionAlias',
				match: UMB_MEMBER_MANAGEMENT_SECTION_ALIAS,
			},
		],
	},
];

import { UmbContextToken } from '@umbraco-cms/backoffice/context-api';
import { UmbControllerBase } from '@umbraco-cms/backoffice/class-api';
import type { UmbControllerHost } from '@umbraco-cms/backoffice/controller-api';

// The Example Workspace Context Controller:
export class ExampleTestContext extends UmbControllerBase {
	rnd: number;

	constructor(host: UmbControllerHost) {
		super(host, EXAMPLE_TEST_CONTEXT.toString());
		this.provideContext(EXAMPLE_TEST_CONTEXT, this);

		this.rnd = Math.random();
	}
}

// Declare a api export, so Extension Registry can initialize this class:
export const api = ExampleTestContext;

// Declare a Context Token that other elements can use to request the WorkspaceContextCounter:
export const EXAMPLE_TEST_CONTEXT = new UmbContextToken<ExampleTestContext>(
	'UmbWorkspaceContext',
	'example.context.test',
);

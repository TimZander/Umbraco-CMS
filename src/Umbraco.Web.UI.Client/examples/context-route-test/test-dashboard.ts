import { ExampleTestContext, type EXAMPLE_TEST_CONTEXT } from './context.js';
import { ExampleTestRoute } from './test-route.js';
import { UmbTextStyles } from '@umbraco-cms/backoffice/style';
import { css, html, customElement, LitElement, state } from '@umbraco-cms/backoffice/external/lit';
import { UmbElementMixin } from '@umbraco-cms/backoffice/element-api';
import { UMB_ROUTE_CONTEXT, UmbRouteNotFoundElement, type UmbRoute } from '@umbraco-cms/backoffice/router';
import { UmbExtensionApiInitializer } from '@umbraco-cms/backoffice/extension-api';
import type { UmbDocumentWorkspaceContext } from '@umbraco-cms/backoffice/document';
import { UMB_DOCUMENT_WORKSPACE_ALIAS } from '@umbraco-cms/backoffice/document';
import { umbExtensionsRegistry } from '@umbraco-cms/backoffice/extension-registry';
import { UmbVariantId } from '@umbraco-cms/backoffice/variant';

@customElement('example-context-route-dashboard')
export class ExampleContextRouteDashboard extends UmbElementMixin(LitElement) {
	#context?: typeof EXAMPLE_TEST_CONTEXT.TYPE;
	#workspaceContext?: UmbDocumentWorkspaceContext;

	@state()
	_basePath?: string;

	readonly #routes: UmbRoute[] = [
		{
			path: 'hello/:unique',
			component: ExampleTestRoute,
			setup: (component, info) => {
				const unique = info.match.params.unique;
				(component as ExampleTestRoute).unique = unique;

				this.#clearContexts();

				this.#context = new ExampleTestContext(this);

				new UmbExtensionApiInitializer(
					this,
					umbExtensionsRegistry,
					UMB_DOCUMENT_WORKSPACE_ALIAS,
					[this],
					async (permitted, ctrl) => {
						if (permitted) {
							this.#workspaceContext = ctrl.api as UmbDocumentWorkspaceContext;

							// Load document and create a new property dataset context for umb property editors
							await this.#workspaceContext.load(unique);
							this.#workspaceContext.createPropertyDatasetContext(this, UmbVariantId.CreateInvariant());
						}
					},
				);
			},
		},
		{
			path: '**',
			component: UmbRouteNotFoundElement,
			setup: () => this.#clearContexts(),
		},
	];

	#clearContexts() {
		this.#context?.destroy();
		this.#context = undefined;

		this.#workspaceContext?.destroy();
		this.#workspaceContext = undefined;
	}

	constructor() {
		super();

		this.consumeContext(UMB_ROUTE_CONTEXT, (context) => {
			this.observe(context.activePath, (path) => {
				this._basePath = path;
			});
		});
	}

	override render() {
		return html`
			<a href="${this._basePath}/">Root</a>
			<a href="${this._basePath}/hello/the-simplest-document-id">Hello 1</a>
			<a href="${this._basePath}/hello/all-property-editors-document-id">Hello 2</a>
			<a href="${this._basePath}/hello/c05da24d-7740-447b-9cdc-bd8ce2172e38">Hello 3</a>
			<umb-router-slot .routes=${this.#routes}> </umb-router-slot>
		`;
	}

	static override styles = [
		UmbTextStyles,
		css`
			:host {
				display: block;
				padding: var(--uui-size-layout-1);
			}
		`,
	];
}

export default ExampleContextRouteDashboard;

declare global {
	interface HTMLElementTagNameMap {
		'example-context-route-dashboard': ExampleContextRouteDashboard;
	}
}

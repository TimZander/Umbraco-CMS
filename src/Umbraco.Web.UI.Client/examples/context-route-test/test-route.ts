import { EXAMPLE_TEST_CONTEXT } from './context.js';
import { UmbTextStyles } from '@umbraco-cms/backoffice/style';
import { css, html, customElement, LitElement, property } from '@umbraco-cms/backoffice/external/lit';
import { UmbElementMixin } from '@umbraco-cms/backoffice/element-api';
import { UMB_DOCUMENT_WORKSPACE_CONTEXT } from '@umbraco-cms/backoffice/document';

@customElement('example-test-route')
export class ExampleTestRoute extends UmbElementMixin(LitElement) {
	//#context?: typeof EXAMPLE_TEST_CONTEXT.TYPE;

	@property({ type: String })
	unique?: string;

	constructor() {
		super();

		this.consumeContext(EXAMPLE_TEST_CONTEXT, (context) => {
			//this.#context = context;
			console.log('got test context', context);
		});
		this.consumeContext(UMB_DOCUMENT_WORKSPACE_CONTEXT, (context) => {
			console.log('got document context', context);
		});
	}

	override render() {
		return html` hello ${this.unique}`;
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

export default ExampleTestRoute;

declare global {
	interface HTMLElementTagNameMap {
		'example-test-route': ExampleTestRoute;
	}
}

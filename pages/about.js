import { html } from "htm/preact";

import { Navigation } from "~/components/Navigation.js";

export function Page() {
	return html`<div>
		<${Navigation} />
		<main>
			<h1>About</h1>
		</main>
	</div>`;
}

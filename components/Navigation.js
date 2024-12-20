import { html } from "htm/preact";
import { useState } from "preact/hooks";

export function Navigation() {
	const [count, setCount] = useState(0);

	return html`<nav>
		<li><a href="/about">About</a></li>
		<li><a href="/">Home</a></li>
		<button onClick=${() => setCount(count + 1)}>Count: ${count}</button>
		<hr />
	</nav>`;
}

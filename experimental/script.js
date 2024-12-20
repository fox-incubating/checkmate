import htm from 'https://unpkg.com/htm@3.1.1/dist/htm.module.js?module'

function h(type, props, ...children) {
	return { type, props, children }
}
const html = htm.bind(h)

console.log('test')

export class MyButton extends HTMLElement {
	constructor() {
		super()
	}

	render() {
		return html`<button onClick="${() => console.log('Clicked button')}">
			Click me
		</button>`
	}

	hydrate() {}

	connectedCallback() {
		const shadow = this.attachShadow({ mode: 'open' })
		const el = html`<button onClick="${() => console.log('Clicked button')}>Click me
		</button>`
		console.log(el)
		shadow.appendChild(el)
	}
}

if (globalThis.customElements) {
	customElements.define('my-button', MyButton)
}

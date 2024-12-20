import { MyButton } from './script.js'

Deno.serve(async (request: Request) => {
	const url = new URL(request.url)
	const filepath = decodeURIComponent(url.pathname)

	if (filepath === '/') {
		const button = `<my-button>
		<template shadowrootmode="open">
		${new MyButton().render()}
		</template>
		</my-button>
		`

		return new Response(
			`
<!doctype html>
<head>
<script type="module" src="/script"></script>
</head>
<body>
  ${button}
</body>
</html>
`,
			{ headers: { 'Content-Type': 'text/html' } },
		)
	} else if (filepath === '/script') {
		const file = await Deno.open('./script.js', { read: true })
		return new Response(file.readable, {
			headers: { 'Content-Type': 'application/javascript' },
		})
	} else {
		return new Response('Hello, world!\n')
	}
})

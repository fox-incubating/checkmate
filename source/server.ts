import { renderToString } from "preact-render-to-string";
import { h } from "preact";
import { serveDir } from "jsr:@std/http/file-server";

Deno.serve(async (req: Request) => {
	const url = new URL(req.url);

	switch (url.pathname) {
		case "/":
			return await send("~/pages/index.js");
		case "/about":
			return await send("~/pages/about.js");
	}

	for (const path of ["components", "layouts", "pages", "utilities"]) {
		if (url.pathname.startsWith(`/${path}`)) {
			return serveDir(req, {
				fsRoot: path,
				urlRoot: path,
			});
		}
	}

	return new Response("404: Not Found", {
		status: 404,
	});
});

async function render(pagePath: string) {
	const { Page } = await import(pagePath);
	const head = "";
	const imports = JSON.stringify(
		JSON.parse(await Deno.readTextFile("./deno.jsonc")).imports,
		null,
		"\t"
	);

	const html = String.raw;
	return html`<!DOCTYPE html>
		<html>
			<head>
				<meta charset="utf-8" />
				<meta name="viewport" content="width=device-width, initial-scale=1.0" />
				<title>Site</title>
				<script type="importmap">
					{
						"imports": ${imports}
					}
				</script>
				<script type="module">
					import { h, hydrate, render } from "preact";
					import { Page } from "${pagePath}";
					hydrate(h(Page), document.getElementById("root"));
				</script>
				${head}
			</head>
			<body>
				<div id="root">${renderToString(h(Page))}</div>
			</body>
		</html>`;
}

async function send(pagePath: string) {
	const text = await render(pagePath);
	return new Response(text, {
		headers: {
			"Content-Type": "text/html",
		},
	});
}

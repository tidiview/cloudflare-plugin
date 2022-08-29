/**
 * Welcome to Cloudflare Workers! This is your first worker.
 *
 * - Run `wrangler dev src/index.ts` in your terminal to start a development server
 * - Open a browser tab at http://localhost:8787/ to see your worker in action
 * - Run `wrangler publish src/index.ts --name my-worker` to publish your worker
 *
 * Learn more at https://developers.cloudflare.com/workers/
 */

export interface Env {
	// Example binding to KV. Learn more at https://developers.cloudflare.com/workers/runtime-apis/kv/
	submit_plugin: KVNamespace;
	//
	// Example binding to Durable Object. Learn more at https://developers.cloudflare.com/workers/runtime-apis/durable-objects/
	// MY_DURABLE_OBJECT: DurableObjectNamespace;
	//
	// Example binding to R2. Learn more at https://developers.cloudflare.com/workers/runtime-apis/r2/
	// MY_BUCKET: R2Bucket;
}

const HTML = `<!doctype html>
<html lang="en">
	<head>
		<meta charset="utf-8">
		<title>Cloudflare Pages | Form Demo</title>
		<meta name="theme-color" content="#d86300">
		<meta name="mobile-web-app-capable" content="yes">
		<meta name="apple-mobile-web-app-capable" content="yes">
		<meta name="viewport" content="width=device-width,initial-scale=1">
		<link rel="icon" type="image/png" href="https://www.cloudflare.com/favicon-128.png">
		<style>* {
			margin: 0;
			padding: 0;
		}
		
		*, *:after, *:before {
			box-sizing: border-box;
		}
		
		*:focus {
			outline-color: #f6821f;
		}
		
		html {
			font-size: 16px;
		}
		
		body {
			display: flex;
			align-items: center;
			justify-content: center;
			background-color: #003682;
			background-color: #f8fbfb;
			font-family: system-ui,-apple-system,BlinkMacSystemFont,Inter,Segoe UI,Roboto,Helvetica Neue,Arial,Noto Sans,sans-serif,Apple Color Emoji,Segoe UI Emoji,Segoe UI Symbol,Noto Color Emoji;
			-webkit-font-smoothing: antialiased;
			text-rendering: optimizelegibility;
			overflow-x: hidden;
			line-height: 1.4;
			height: 100vh;
			width: 100vw;
		}
		
		main {
			padding: 2rem;
			max-width: 600px;
			border-radius: 4px;
			background-color: #fff;
			box-shadow: rgba(50, 50, 93, 0.25) 0px 6px 12px -2px, rgba(0, 0, 0, 0.3) 0px 3px 7px -3px;
		}
		
		blockquote {
			display: block;
			font-size: 0.85rem;
			padding-left: 0.75rem;
			border-left: 4px solid #f6821f;
			margin-bottom: 1rem;
			margin-top: 0.5rem;
		}
		
		blockquote p {
			margin-bottom: 0.5rem;
		}
		
		.input {
		  display: block;
		  margin-bottom: 1rem;
			line-height: 1.6;
		}
		
		.input label,
		.checklist > label {
			display: block;
			font-weight: bold;
		}
		
		.input input,
		.input select {
			width: 100%;
		  display: block;
			background: #fff;
			border-radius: 2px;
			border: 1px solid #000;
			padding: 0.375rem 0.5rem;
			min-height: 2rem;
			height: 2rem;
		}
		
		.checklist li {
			list-style: none;
			padding-left: 0.5rem;
			margin-bottom: 0.25rem;
		}
		
		.checklist input {
			margin-right: 0.25rem;
		}
		
		button {
			width: 100%;
			display: block;
			cursor: pointer;
			margin-top: 1.5rem;
			background-color: #f6821f;
			border-radius: 2px;
			font-weight: bold;
			padding: 0.75rem;
			outline: none;
			border: none;
			color: #fff;
		}
		
		button:hover {
			background-color: #d86300;
		}
</style>		
	</head>
	<body>

		<main>
			<h1>Demo: Form Submission</h1>

			<blockquote>
				<p>This is a demonstration of Cloudflare Pages with Functions.</p>
				<p>Pages deployed a <code>/public</code> directory, containing a HTML document (this webpage) and a <code>/functions</code> directory, which contains the Cloudflare Workers code for the API endpoint this <code>&lt;form&gt;</code> references.</p>
				<p><b>NOTE:</b> On form submission, the API endpoint responds with a JSON representation of the data. There is no JavaScript running in this example.</p>
			</blockquote>

			<form data-static-form-name="submit" action="/submit">
				<div class="input">
					<label for="name">Full Name</label>
					<input id="name" name="name" type="text" />
				</div>

				<div class="input">
					<label for="email">Email Address</label>
					<input id="email" name="email" type="email" />
				</div>

				<div class="input">
					<label for="referers">How did you hear about us?</label>
					<select id="referers" name="referers">
						<option hidden disabled selected value>hidden-option</option>
						<option value="Facebook">Facebook</option>
						<option value="Twitter">Twitter</option>
						<option value="Google">Google</option>
						<option value="Bing">Bing</option>
						<option value="Friends">Friends</option>
					</select>
				</div>

				<div class="checklist">
					<label>What are your favorite movies?</label>
					<ul>
						<li>
							<input id="m1" type="checkbox" name="movies" value="Space Jam" />
							<label for="m1">Space Jam</label>
						</li>
						<li>
							<input id="m2" type="checkbox" name="movies" value="Little Rascals" />
							<label for="m2">Little Rascals</label>
						</li>
						<li>
							<input id="m3" type="checkbox" name="movies" value="Frozen" />
							<label for="m3">Frozen</label>
						</li>
						<li>
							<input id="m4" type="checkbox" name="movies" value="Home Alone" />
							<label for="m4">Home Alone</label>
						</li>
					</ul>
				</div>

				<button type="submit">Submit</button>
			</form>
		</main>

	</body>
</html>
`;


export default {
	async fetch(
		request: Request,
		env: Env,
		ctx: ExecutionContext
		): Promise<Response> {
			return new Response(HTML, {
				headers: {
				'content-type': 'text/html;charset=UTF-8',
				}
			},
		);
	},
};
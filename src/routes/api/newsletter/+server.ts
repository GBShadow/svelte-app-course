import type { RequestHandler } from './$types'

export const GET: RequestHandler = async () => {
	const options: ResponseInit = {
		status: 418,
		headers: {
			X: 'Gon give it to ya'
		}
	}
	return new Response('Hello', options)
}

export const POST: RequestHandler = async (event) => {
	const data = await event.request.formData()
	const email = data.get('email')

	console.log(email)

	return new Response(JSON.stringify({ success: true }), {
		headers: {
			'Content-Type': 'application/json'
		}
	})
}

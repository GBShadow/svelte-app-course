import { json, type RequestHandler } from '@sveltejs/kit'

import db from '$lib/database'

export const GET: RequestHandler = async (event) => {
	const limit = Number(event.url.searchParams.get('limit')) || 10
	const order = (event.url.searchParams.get('order') as 'asc' | 'desc') || 'desc'

	const todos = await db.todo.findMany({
		take: limit,
		orderBy: {
			createdAt: order
		}
	})

	event.setHeaders({
		'Cache-Control': 'public max-age=60'
	})

	return json(todos)
}

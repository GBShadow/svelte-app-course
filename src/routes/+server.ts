import db from '$lib/database'
import { slugify } from '$lib/helpers'
import { json } from '@sveltejs/kit'
import type { RequestHandler } from './$types'

type Data = {
	success: boolean
	errors: Record<string, string>
}

type PostData = {
	title: string
	content: string
}

export const POST: RequestHandler = async ({ request }) => {
	const formData = await request.formData()

	const postData: PostData = {
		title: String(formData.get('title')),
		content: String(formData.get('content'))
	}

	const data: Data = {
		success: false,
		errors: {}
	}

	if (!postData.title) {
		data.errors.title = 'required'
	}

	if (!postData.content) {
		data.errors.content = 'required'
	}

	if (Object.entries(data.errors).length) {
		return json(data, { status: 400 })
	}

	await db.post.create({
		data: {
			title: postData.title,
			content: postData.content,
			slug: slugify(postData.title)
		}
	})

	data.success = true

	return json(data, { status: 201 })
}

export const DELETE: RequestHandler = async ({ request }) => {
	const formData = await request.formData()

	const id = Number(formData.get('id'))

	const data: Data = {
		success: false,
		errors: {}
	}

	if (!id) {
		data.errors.id = 'required'

		return json(data, { status: 400 })
	}

	const response = await db.post.delete({
		where: {
			id
		}
	})

	console.log(response)

	data.success = true
	return json(data, { status: 200 })
}

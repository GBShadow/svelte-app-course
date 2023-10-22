import db from '$lib/database'
import type { Todo } from '@prisma/client'
import { fail } from '@sveltejs/kit'
import type { PageServerLoad } from '../posts/[slug=slug]/$types'
import type { Actions } from './$types'

export const load: PageServerLoad = async ({ fetch, depends }) => {
	const response = await fetch(`/api/todos`)

	const todos: Todo[] = await response.json()

	depends('todos')

	return { todos }
}

const sleep = (ms: number) => {
	return new Promise((resolve) => setTimeout(resolve, ms))
}

export const actions: Actions = {
	addTodo: async ({ request }) => {
		const formData = await request.formData()

		const todo = String(formData.get('content'))

		if (!todo) {
			return fail(400, { todo, missing: true })
		}

		await db.todo.create({
			data: {
				content: todo
			}
		})

		await sleep(2000)

		return { success: true }
	},
	removeTodo: async ({ request }) => {
		const formData = await request.formData()

		const id = Number(formData.get('id'))

		if (!id) {
			return fail(400, { id, missing: true })
		}

		await db.todo.delete({
			where: { id }
		})

		return { success: true }
	},
	clearTodos: async () => {
		await db.todo.deleteMany()
	}
}

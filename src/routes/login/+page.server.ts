import { fail, redirect } from '@sveltejs/kit'
import { z } from 'zod'
import { zfd } from 'zod-form-data'
import type { Actions } from './$types'

export const actions: Actions = {
	default: async ({ request }) => {
		const formData = await request.formData()

		const loginSchema = zfd.formData(
			z.object({
				user: zfd.text(),
				password: zfd.text()
			})
		)

		const result = await loginSchema.safeParseAsync(formData)

		if (!result.success) {
			const data = {
				data: Object.fromEntries(formData),
				errors: result.error.flatten().fieldErrors
			}

			return fail(400, data)
		}

		throw redirect(303, '/todos')
	}
}

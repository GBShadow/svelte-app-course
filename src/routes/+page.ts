import type { Post } from '@prisma/client'
import type { PageLoad } from './$types'

export const load: PageLoad = async ({ fetch, depends }) => {
	const limit = 10
	const response = await fetch(`/api/posts?limit=${limit}`)

	const posts: Post[] = await response.json()

	depends('posts')

	return { posts }
}

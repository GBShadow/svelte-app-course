<script lang="ts">
	import type { PageData } from './$types'

	export let data: PageData

	$: ({ posts } = data)
</script>

<h1>Posts</h1>

<h3>Showing {posts.length} posts.</h3>

{#each posts as { slug, title }, i}
	<ul>
		<li>
			<a href={`/posts/${slug}`}>{title}</a>
		</li>
	</ul>
{/each}

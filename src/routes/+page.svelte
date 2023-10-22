<script lang="ts">
	import { invalidate, invalidateAll } from '$app/navigation'
	import type { PageData } from './$types'

	type Data = {
		success: boolean
		errors: Record<string, string>
	}

	export let data: PageData
	let form: Data
	let modal = false
	let loading = false

	$: ({ posts } = data)

	async function addPost(event: Event) {
		loading = true
		const formEl = event.target as HTMLFormElement
		const data = new FormData(formEl)

		const response = await fetch(formEl.action, {
			method: 'POST',
			body: data
		})

		const responseData = await response.json()

		form = responseData
		if (!form.success) {
			loading = false

			return
		}

		formEl.reset()

		loading = false
		modal = false
		await invalidateAll()
	}

	async function removePost(event: Event) {
		loading = true
		const formEl = event.target as HTMLFormElement
		const data = new FormData(formEl)

		const response = await fetch(formEl.action, {
			method: 'DELETE',
			body: data
		})

		const responseData = await response.json()
		form = responseData
		formEl.reset()

		loading = false
		invalidate('posts')
	}

	async function rerunLoadFunction() {
		loading = true

		setTimeout(() => {
			invalidate('posts')

			loading = false
		}, 1000)
	}
</script>

<h1>Posts</h1>

<div class="grid">
	<button on:click={() => (modal = true)}>Create Post</button>
	<button class="secondary" aria-busy={loading} on:click={rerunLoadFunction}>Reload List</button>
</div>

<hr />

<h3>Showing {posts.length} posts.</h3>

{#each posts as { slug, title, id }}
	<ul>
		<li>
			<a href={`/posts/${slug}`}>{title}</a>
			<form on:submit|preventDefault={removePost} method="POST">
				<button class="delete" type="submit">
					<input type="hidden" name="id" value={id} />
					<iconify-icon icon="fa6-regular:trash-can" />
				</button>
			</form>
		</li>
	</ul>
{/each}

<dialog open={modal} id="createModal">
	<article class="modal-post">
		<h3>Create Post</h3>
		<form on:submit|preventDefault={addPost} method="POST">
			<label>
				Title
				<input type="text" name="title" />
				{#if form?.errors?.title}
					<p class="error">This Field is required</p>
				{/if}
			</label>
			<label>
				Content
				<textarea rows="5" name="content" />
				{#if form?.errors?.content}
					<p class="error">This Field is required</p>
				{/if}
			</label>
			<footer class="grid">
				<button class="secondary" on:click={() => (modal = false)}>Cancel</button>
				<button type="submit" aria-busy={loading}>Confirm</button>
			</footer>
		</form>
	</article>
</dialog>

<style>
	hr {
		margin: 2rem 0;
	}

	ul {
		padding: 0;
	}

	li {
		display: flex;
		justify-content: space-between;
		align-items: center;
	}

	.modal-post {
		width: 100%;
	}

	.delete {
		margin: 0;
		background: none;
		border: 0;
		color: indianred;
	}

	.error {
		color: tomato;
	}
</style>

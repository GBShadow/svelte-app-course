<script lang="ts">
	import { enhance } from '$app/forms'
	import { invalidate } from '$app/navigation'
	import type { ActionData, PageData, SubmitFunction } from './$types'

	export let data: PageData
	export let form: ActionData
	let loading = false
	let reload = false

	async function rerunLoadFunction() {
		reload = true

		setTimeout(() => {
			invalidate('todos')

			reload = false
		}, 1000)
	}

	const addTodo: SubmitFunction = () => {
		loading = true

		return async ({ update }) => {
			loading = false

			await update()
		}
	}
</script>

<h1>Todos</h1>

<div class="grid">
	<div />
	<button class="secondary" aria-busy={reload} on:click={rerunLoadFunction}>Reload List</button>
</div>

<hr />

<h3>Showing {data.todos.length ?? 0} todos.</h3>

{#each data.todos as { content, id }}
	<ul>
		<li>
			<p>{content}</p>
			<form method="POST" action="?/removeTodo" use:enhance>
				<button class="delete" type="submit">
					<input type="hidden" name="id" value={id} />

					<iconify-icon icon="fa6-regular:trash-can" />
				</button>
			</form>
		</li>
	</ul>
{/each}

<form method="POST" action="?/addTodo" use:enhance={addTodo}>
	<input type="text" name="content" />
	{#if form?.missing}
		<p class="error">This field is required.</p>
	{/if}
	<button type="submit" aria-busy={loading} class:loading>
		{#if !loading}
			+ Add todo
		{/if}
	</button>
	<button formaction="?/clearTodos" type="submit" class="secondary">Clear</button>
</form>

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

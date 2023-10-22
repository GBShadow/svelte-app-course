<script lang="ts">
	import { applyAction, enhance } from '$app/forms'
	import type { SubmitFunction } from '@sveltejs/kit'
	import type { ActionData } from './$types'

	export let form: ActionData & {
		errors: {
			user?: string
			password?: string
		}
	}

	const login: SubmitFunction = async () => {
		return async ({ result }) => {
			await applyAction(result)
		}
	}
</script>

<h1>Sign In</h1>

<pre>
	{JSON.stringify(form, null, 2)}
</pre>

<form method="POST" action="/login" use:enhance={login}>
	<label>
		Username
		<input type="text" name="user" />
		{#if form?.errors?.user}
			<p class="error">Username is required.</p>
		{/if}
	</label>

	<label>
		Password
		<input type="password" name="password" />
		{#if form?.errors?.password}
			<p class="error">Password is required.</p>
		{/if}
	</label>
	<button type="submit">Login</button>
</form>

<style>
	.error {
		color: tomato;
	}
</style>

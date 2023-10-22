<script lang="ts">
	import { enhance } from '$app/forms'
	import type { ActionData } from './$types'

	export let form: ActionData & {
		errors: {
			user?: string
			password?: string
		}
	}
</script>

<h1>Login</h1>

<pre>
	{JSON.stringify(form, null, 2)}
</pre>

<form method="POST" use:enhance>
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

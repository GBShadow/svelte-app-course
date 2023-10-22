<script lang="ts">
	import { page } from '$app/stores'
	import Transitions from '$lib/components/transitions.svelte'
	import '@picocss/pico'
	import 'iconify-icon'
	import '../app.css'

	export let data
</script>

<svelte:head>
	<title>{$page.data.post?.title || 'Posts'}</title>
</svelte:head>

<div class="container">
	<nav>
		<ul>
			<li>
				<a href="/">Home</a>
			</li>
			<li>
				<a href="/posts">Posts</a>
			</li>
			<li>
				<a href="/todos">Todos</a>
			</li>
		</ul>
		<ul>
			<li>
				<a href="/login">Login</a>
			</li>
		</ul>
	</nav>

	<Transitions url={data.url}>
		<slot />
	</Transitions>
</div>

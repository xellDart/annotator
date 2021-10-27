<script>
	import '../app.postcss';
	import Header from '$lib/header/header.svelte';
	import Nav from '$lib/nav/nav.svelte';
</script>

<div class="h-full bg-colab">
	<Header />
	<div class="w-full h-px" />
	<div class="overflow-hidden flex">
		<div class="flex-1 mx-auto w-0 flex flex-col pt-3">
			<main class="flex-1 relative overflow-y-auto focus:outline-none scrollbar-hide bg-colab">
				<slot />
			</main>
		</div>
	</div>
</div>

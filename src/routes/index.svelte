<script lang="ts">
	import Annotation from '$lib/components/annotation.svelte';
	import SideBarImages from '$lib/components/sidebar_images.svelte';
	import SideBarLabels from '$lib/components/sidebar_labels.svelte';

	$: files = [];
	let fileinput;

	const onFileSelected = (e) => {
		let image = e.target.files[0];
		files.push(image);
		files = files;
		console.log(image);
	};


	let labels = [
		{
			type_class: 'sellos_juzgados',
			rect: {
				x: 200.03854774504003,
				y: 551.6930760499433,
				w: 238.50715096481272,
				h: 200.84812712826334
			}
		},
		{
			type_class: 'sellos_notria',
			rect: {
				x: 200.03854774504003,
				y: 551.6930760499433,
				w: 238.50715096481272,
				h: 200.84812712826334
			}
		}
	];
</script>

<!-- This example requires Tailwind CSS v2.0+ 
<div class="py-12 bg-white">
	<canvas bind:this={canvas} width="500" height="300" />
	<button on:click={remove}>REMOVE</button>
</div>
-->

<div class="h-screen">
	<div class="grid grid-cols-6 gap-1">
		<div class="col-start-1 col-end-1">
			<div class="border-l-4 border-indigo-500 mb-1">
				<p class="text-gray-300 px-5 py-3">Archivos</p>
			</div>

			<SideBarImages images={files} />
		</div>
		<div class="col-start-2 col-span-4">
			<Annotation />
		</div>
		<div class="col-end-7 col-span-1">
			<div class="border-l-4 border-indigo-500 mb-1">
				<p class="text-gray-300 px-5 py-3">Labels</p>
			</div>

			<SideBarLabels />
		</div>
	</div>
</div>

<div class="flex text-sm text-gray-600">
	<label
		for="file-upload"
		class="relative cursor-pointer bg-white rounded-md font-medium text-indigo-600 hover:text-indigo-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-indigo-500"
	>
		<span>Upload a file</span>
		<input
			bind:this={fileinput}
			on:change={(e) => onFileSelected(e)}
			id="file-upload"
			name="file-upload"
			type="file"
			class="sr-only"
		/>
	</label>
	<p class="pl-1">or drag and drop</p>
</div>

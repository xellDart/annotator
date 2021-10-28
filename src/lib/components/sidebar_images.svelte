<script lang="ts">
	import { active, trainingData, Active, DataTraining } from '../../stores/state';

	let data: DataTraining;

	trainingData.subscribe(change => {
		data = change;
	});

	function _setActive(item: Active) {
		active.set(item);
	}

	function bytesToSize(bytes) {
		if (bytes < 1000000) {
			var _size = Math.floor(bytes / 1000) + 'KB';
			return _size;
		} else {
			var _size = Math.floor(bytes / 1000000) + 'MB';
			return _size;
		}
	}
</script>

<div class="h-screen/2 flex">
	<div class="flex-1 overflow-y-scroll scrollbar-hide">
		<div class="grid grid-cols-2">
				{#if data}
					{#each data.items as item}
					<div on:click={() => _setActive(item)} class="px-2 py-1">
						<div
							class="group block w-full aspect-w-7 aspect-h-10 rounded-lg bg-gray-100 focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-offset-gray-100 focus-within:ring-indigo-500 overflow-hidden"
						>
							<img
								src={item.image}
								alt=""
								class="object-cover pointer-events-none group-hover:opacity-75"
							/>
							<button type="button" class="absolute inset-0 focus:outline-none">
								<span class="sr-only">View details for IMG_4985.HEIC</span>
							</button>
						</div>
						<p class="mt-2 block text-xs font-medium text-white truncate pointer-events-none">
							{item.name}
						</p>
						<p class="block text-xs font-medium text-gray-300 pointer-events-none">
							{bytesToSize(item.size)}
						</p>
					</div>
				{/each}
				{/if}
		</div>

		<!-- More files... -->
	</div>
</div>

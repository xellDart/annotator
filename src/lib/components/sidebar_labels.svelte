<script lang="ts">
	import Label from '$lib/components/label.svelte';
	import { Active, active, selectItem } from '../../stores/state';

	let image: Active;

    let labels = ['face', 'mx', 'face_difused'];

    function _onSetLabel(label: string, index: number) {
        active.update(x => {
           image.rect[index].label = label;
            return x;
        });
    }


	active.subscribe((change) => {
		image = change;
	});
</script>

<div class="h-screen/2 flex">
	<div class="flex-1 overflow-y-scroll scrollbar-hide">
		<div class="grid grid-cols-1">
			{#each image.rect as rect, i}
				<div on:click={() => selectItem.set(i)} class="px-2 py-1">
					<p class="mt-2 block text-xs font-medium text-white truncate">
						<Label active={$selectItem === i} onSelectLabel={_onSetLabel} labels={labels} title={rect.label} index={i} />
					</p>
				</div>
			{/each}
		</div>

		<!-- More files... -->
	</div>
</div>

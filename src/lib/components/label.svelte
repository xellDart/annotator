<script lang="ts">
	import { clickOutside } from '$lib/click_out';

	export let title: string;
	export let labels: string[];
	export let index: number;
	export let active;
	export let onSelectLabel: Function;

	let show_menu = false;
	let animation = '';
	let enter_css = 'z-0 transform opacity-0 scale-95';

	let hidden = 'hidden';

	const hide = () => {
		setTimeout(() => {
			animation = 'transition ease-in duration-75';
			enter_css = 'z-0 transform opacity-0 scale-95';
		}, 100);
	};

	const show = () => {
		setTimeout(() => {
			animation = 'transition ease-out duration-100';
			enter_css = 'z-40 transform opacity-100 scale-100';
		}, 100);
	};

	function openMenu() {
		console.log('ope');
		if (show_menu) {
			show_menu = false;
			hidden = 'hidden';
			hide();
		} else {
			show_menu = true;
			hidden = '';
			show();
		}
	}

	function closeMenu() {
		show_menu = false;
		hidden = 'hidden';
		hide();
	}

	function remove() {
		console.log('remove');
	}
</script>

<div class="border-l-4 {active ? 'border-indigo-500' : 'border-indigo-20'} hover:border-indigo-500">
	<div class="flex justify-between justify-between ">
		<div on:click={openMenu} class="pl-2">
			<div
				class="mt-1 border-b {active
					? 'border-indigo-600'
					: 'border-gray-300'} focus-within:border-indigo-600"
			>
				<input
					disabled
					type="text"
					name="type_class"
					id="type_class"
					class="cursor-pointer text-white block w-full border-0 border-b {active
						? 'border-indigo-600'
						: 'border-transparent'} bg-transparent focus:border-indigo-600 focus:ring-0 sm:text-sm"
					placeholder={title}
				/>
			</div>
			<div
				use:clickOutside
				on:click_outside={closeMenu}
				class="{hidden} {enter_css} {animation} mx-9 origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none"
				role="menu"
				aria-orientation="vertical"
				aria-labelledby="menu-button"
				tabindex="-1"
			>
				<div class="py-1" role="none">
					<!-- Active: "bg-gray-100 text-gray-900", Not Active: "text-gray-700" -->
					{#each labels as label}
						<button
							on:click={() => onSelectLabel(label, index)}
							class="w-full text-left text-gray-700 block px-4 py-2 text-sm hover:bg-gray-100"
							role="menuitem"
							tabindex="-1"
							id="menu-item-0">{label}</button
						>
					{/each}
				</div>
			</div>
		</div>

		<div class="w-5 h-5 mr-3">
			<button
				on:click={remove}
				type="button"
				class="inline-flex items-center p-1 border border-transparent rounded-full shadow-sm text-white  hover:text-indigo-700"
			>
				<svg
					xmlns="http://www.w3.org/2000/svg"
					class="h-5 w-5"
					fill="none"
					viewBox="0 0 24 24"
					stroke="currentColor"
				>
					<path
						stroke-linecap="round"
						stroke-linejoin="round"
						stroke-width="2"
						d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
					/>
				</svg>
			</button>
		</div>
	</div>
</div>

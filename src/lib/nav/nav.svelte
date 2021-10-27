<script>
	import Sidebar from '$lib/components/sidebar_images.svelte';
	import { menu } from '../../stores/mobile';
	let show_menu = false;

	menu.subscribe((value) => {
		show_menu = value;
	});

	function hide_menu() {
		menu.set(!show_menu);
	}
</script>

<div class="h-screen flex overflow-hidden">
	<!-- Off-canvas menu for mobile, show/hide based on off-canvas menu state. -->
	<div
		class="fixed inset-0 z-40 flex md:hidden {show_menu
			? ''
			: 'transition-opacity ease-linear duration-300 hidden'}"
		role="dialog"
		aria-modal="true"
	>
		<!--
      Off-canvas menu overlay, show/hide based on off-canvas menu state.

      Entering: "transition-opacity ease-linear duration-300"
        From: "opacity-0"
        To: "opacity-100"
      Leaving: "transition-opacity ease-linear duration-300"
        From: "opacity-100"
        To: "opacity-0"
    -->
		<div
			class="fixed inset-0 bg-gray-600 bg-opacity-75 {show_menu
				? 'transition-opacity ease-linear duration-300 opacity-100'
				: 'transition-opacity ease-linear duration-300 opacity-0'}"
			aria-hidden="true"
		/>

		<!--
      Off-canvas menu, show/hide based on off-canvas menu state.

      Entering: "transition ease-in-out duration-300 transform"
        From: "-translate-x-full"
        To: "translate-x-0"
      Leaving: "transition ease-in-out duration-300 transform"
        From: "translate-x-0"
        To: "-translate-x-full"
    -->
		<div
			class="relative max-w-xs w-full bg-white pt-5 pb-4 flex-1 flex flex-col {show_menu
				? 'transition ease-in-out duration-300 transform translate-x-0'
				: 'transition ease-in-out duration-300 transform -translate-x-full'}"
		>
			<!--
        Close button, show/hide based on off-canvas menu state.

        Entering: "ease-in-out duration-300"
          From: "opacity-0"
          To: "opacity-100"
        Leaving: "ease-in-out duration-300"
          From: "opacity-100"
          To: "opacity-0"
      -->
			<div
				class="absolute top-0 right-0 -mr-12 pt-2 {show_menu
					? 'ease-in-out duration-300 opacity-100'
					: 'ease-in-out duration-300 opacity-0'}"
			>
				<button
					on:click={hide_menu}
					type="button"
					class="ml-1 flex items-center justify-center h-10 w-10 rounded-full focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
				>
					<span class="sr-only">Close sidebar</span>
					<!-- Heroicon name: outline/x -->
					<svg
						class="h-6 w-6 text-white"
						xmlns="http://www.w3.org/2000/svg"
						fill="none"
						viewBox="0 0 24 24"
						stroke="currentColor"
						aria-hidden="true"
					>
						<path
							stroke-linecap="round"
							stroke-linejoin="round"
							stroke-width="2"
							d="M6 18L18 6M6 6l12 12"
						/>
					</svg>
				</button>
			</div>

			<div class="flex-shrink-0 px-4 flex items-center">
				<img class="h-7 w-auto" src="/img/logo.svg" alt="NebuIA DOCS" />
			</div>
			<div class="mt-5 flex-1 h-0 overflow-y-auto">
				<Sidebar />
			</div>
		</div>

		<div class="flex-shrink-0 w-14">
			<!-- Dummy element to force sidebar to shrink to fit close icon -->
		</div>
	</div>

	<!-- Static sidebar for desktop -->
	<div class="hidden md:flex md:flex-shrink-0">
		<div class="w-64 flex flex-col">
			<!-- Sidebar component, swap this element with another sidebar if you like -->
			<div class="border-r border-gray-200 pt-1 pb-4 flex flex-col flex-grow overflow-y-auto">
				<div class="flex-grow mt-5 flex flex-col">
					<Sidebar />
				</div>
			</div>
		</div>
	</div>
</div>

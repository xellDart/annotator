<script>
	import { page } from '$app/stores';
	import { menu } from '../../stores/mobile';
	import { get } from 'svelte/store';

	const active = 'bg-gray-100 text-gray-900';
	const inactive = 'text-gray-900 hover:bg-gray-50 hover:text-gray-900';

	function hideShowMenu() {
		console.log('dsf');
		menu.set(!get(menu));
	}
</script>

<header class="sticky top-0 z-50">
	<div class="relative bg-colab">
		<div class="mx-auto px-4 sm:px-6 ">
			<div class="flex  items-center  py-2 md:justify-start md:space-x-10">
				<div class="flex-shrink-0">
					<img
						class="h-8 w-8"
						src="https://tailwindui.com/img/logos/workflow-mark-indigo-500.svg"
						alt="Workflow"
					/>
				</div>
				<div class="grid grid-rows-2 grid-flow-col">
					<div>
						<p class="text-white pt-2">Annotator</p>
					</div>
					<div class="hidden md:block -pt-1">
						<div class="flex items-baseline space-x-4">
							<!-- Current: "bg-gray-900 text-white", Default: "text-gray-300 hover:bg-gray-700 hover:text-white" -->
							<button
								class="hover:bg-white-700 text-white  py-2 rounded-md text-xs font-normal"
								aria-current="page">Dashboard</button
							>

							<button
								class="text-gray-300 hover:bg-white-700 hover:text-white py-2 rounded-md text-xs font-normal"
								>Team</button
							>

							<button
								class="text-gray-300 hover:bg-white-700 hover:text-white py-2 rounded-md text-xs font-normal"
								>Projects</button
							>

							<button
								class="text-gray-300 hover:bg-white-700 hover:text-white py-2 rounded-md text-xs font-normal"
								>Calendar</button
							>

							<button
								class="text-gray-300 hover:bg-white-700 hover:text-white py-2 rounded-md text-xs font-normal"
								>Reports</button
							>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</header>

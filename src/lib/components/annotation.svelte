<script lang="ts">
	import { fabric } from 'fabric';
	import { onMount } from 'svelte';
	import { Active, Rect, active, selectItem } from '../../stores/state';

	let image: Active;
	let canvas;
	let bg;

	let scale_factor = 0;
	let left = 0;
	let top = 0;

	let index = 0;

	fabric.Object.prototype.getZIndex = function () {
		return this.canvas.getObjects().indexOf(this);
	};

	active.subscribe((change) => {
		if (change.image) {
			image = change;
			fillImage();
		}
	});

	selectItem.subscribe((change) => {
		if (image && canvas) {
			if (change != -1) {
				canvas.setActiveObject(canvas.item(change));
				canvas.requestRenderAll();
			}
		}
	});

	let rect, isDown, origX, origY, selected;

	function reset_zoom() {
		canvas.setViewportTransform([1, 0, 0, 1, 0, 0]);
	}

	function _total() {
		console.log(canvas.getObjects().length);
	}

	function _selectIndex(position: number) {
		selectItem.set(position);
	}

	function _setUpCanvas() {
		canvas.on('object:moved', (_: any) => {
			_reorderRects();
		});

		canvas.on('object:scaled', (_: any) => {
			_reorderRects();
		});

		canvas.on('selection:created', (o) => {
			_selectIndex(o.target.getZIndex());
			selected = true;
		});

		canvas.on('selection:updated', (o) => {
			_selectIndex(o.target.getZIndex());
			selected = true;
		});

		canvas.on('selection:cleared', (_: any) => {
			_selectIndex(-1);
			selected = false;
		});

		canvas.on('mouse:wheel', (opt) => {
			if (image) {
				var delta = opt.e.deltaY;
				var zoom = canvas.getZoom();
				zoom *= 0.999 ** delta;
				if (zoom > 20) zoom = 20;
				if (zoom < 0.01) zoom = 0.01;
				canvas.zoomToPoint({ x: opt.e.offsetX, y: opt.e.offsetY }, zoom);
				opt.e.preventDefault();
				opt.e.stopPropagation();

				if (zoom >= 0.99 && zoom <= 1.1) {
					canvas.setViewportTransform([1, 0, 0, 1, 0, 0]);
				}
			}
		});

		canvas.on('mouse:down', (o) => {
			if (!selected) {
				isDown = true;
				var pointer = canvas.getPointer(o.e);

				origX = pointer.x;
				origY = pointer.y;
				rect = new fabric.Rect({
					left: origX,
					top: origY,
					originX: 'left',
					originY: 'top',
					width: pointer.x - origX,
					height: pointer.y - origY,
					angle: 0,
					fill: 'rgba(255,0,0,0.5)',
					transparentCorners: false
				});

				canvas.add(rect);
			}
		});

		canvas.on('mouse:move', (o) => {
			if (!isDown) return;

			var pointer = canvas.getPointer(o.e);

			if (origX > pointer.x) {
				rect.set({ left: Math.abs(pointer.x) });
			}
			if (origY > pointer.y) {
				rect.set({ top: Math.abs(pointer.y) });
			}

			rect.set({ width: Math.abs(origX - pointer.x) });
			rect.set({ height: Math.abs(origY - pointer.y) });

			canvas.renderAll();
		});

		canvas.on('mouse:up', (_: any) => {
			isDown = false;
			rect.setCoords();

			if (canvas) {
				canvas.getObjects().forEach((target) => {
					if (target.width <= 10) {
						canvas.remove(target);
						canvas.requestRenderAll();
					} else {
						if (image) {
							appendRectangle(target);
						}
					}
				});
			}
		});

		canvas.on('object:selected', (e) => {
			if (e.target) {
				e.target.bringToFront();
				this.renderAll();
			}
		});
	}

	function generateRect(target: any): Rect {
		let x = (target.left - left) * scale_factor;
		let y = (target.top - top) * scale_factor;
		let width = target.width * scale_factor * target.scaleX;
		let height = target.height * scale_factor * target.scaleY;

		return { x, y, width, height, index };
	}

	function generateRectWithProperties(target: any, label: string, position: number): Rect {
		let x = (target.left - left) * scale_factor;
		let y = (target.top - top) * scale_factor;
		let width = target.width * scale_factor * target.scaleX;
		let height = target.height * scale_factor * target.scaleY;

		return { x, y, width, height, label, index: position };
	}

	function appendRectangle(target: any) {
		const rect: Rect = generateRect(target);
		if (!$active.rect.some((item) => item.width === rect.width)) {
			index++;
			active.update((x) => {
				x.rect.push(rect);
				return x;
			});
		}
	}

	function removeRectangle(target: any) {
		let rects: Rect[] = [];
		const rect: Rect = generateRect(target);
		$active.rect.forEach((item) => {
			if (!(item.width === rect.width)) {
				rects.push(item);
			}
		});

		index--;
		active.update((x) => {
			x.rect = rects;
			return x;
		});
	}

	function _reorderRects() {
		let rects: Rect[] = [];

		for (let i = 0; i < canvas.getObjects().length; ++i) {
			let target = canvas.getObjects()[i];
			let current = $active.rect[i];
			const rect: Rect = generateRectWithProperties(target, current.label, current.index);
			rects.push(rect);
		}

		active.update((x) => {
			x.rect = rects;
			return x;
		});
	}

	function fillImage() {
		if (image && canvas) {
			fabric.Image.fromURL(image.image, (img) => {
				var w = canvas.width;
				var h = canvas.height;

				if (img.width > img.height) {
					img.set({ left: 0 });
					img.set({ top: 0 });
					img.scaleToHeight(h / 1.5);
				} else {
					img.set({ left: 0 });
					img.set({ top: 0 });

					let w_scale = w / 1.8;
					img.scaleToWidth(w_scale);
				}

				canvas.setBackgroundImage(img);
				img.center();
				canvas.renderAll();

				// helpers
				scale_factor = 1 / img.scaleX;
				left = img.left;
				top = img.top;
			});
		}
	}

	function remove() {
		if (canvas) {
			canvas.getActiveObjects().forEach((target) => {
				canvas.remove(target);
				removeRectangle(target);
			});
			canvas.discardActiveObject().renderAll();
		}
	}

	function resizeCanvas() {
		if (canvas) {
			canvas.setDimensions({
				width: bg.clientWidth,
				height: bg.clientHeight
			});
			fillImage();
		}
	}

	onMount(() => {
		bg = document.getElementById('base');
		canvas = new fabric.Canvas('c');
		_setUpCanvas();
		resizeCanvas();

		// listen for remove objects
		window.addEventListener('keydown', function (e) {
			/*
			 * keyCode: 8
			 * keyIdentifier: "U+0008"
			 */

			if (e.keyCode === 8) {
				e.preventDefault();
				remove();
			}
		});

		window.addEventListener('resize', resizeCanvas, false);
	});
</script>

<div class="h-screen">
	<div class="w-full bg-taskbar py-1">
		<!-- This example requires Tailwind CSS v2.0+ -->
		<span class="relative z-0 inline-flex shadow-sm rounded-md">
			<button
				on:click={reset_zoom}
				type="button"
				class="inline-flex items-center justify-center w-10 h-10 mr-2 text-indigo-100 transition-colors duration-150 bg-transparent rounded-lg focus:shadow-outline hover:bg-taskbar_hober"
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
						d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM13 10H7"
					/>
				</svg>
			</button>
			<button
				on:click={reset_zoom}
				type="button"
				class="-ml-px relative inline-flex items-center px-4 py-2 bg-transparen text-sm font-light text-white hover:bg-taskbar_hober focus:z-10 focus:outline-none "
			>
				<b>Image:&nbsp;&nbsp;</b> test.jpg
			</button>
		</span>
	</div>
	<div id="base" class="bg-editor w-full h-screen/2 {!image ? 'pointer-events-none' : ''}">
		<canvas id="c" bind:this={canvas} />
	</div>
	<div class="w-full bg-taskbar py-1">
		<!-- This example requires Tailwind CSS v2.0+ -->
		<nav class="px-4 flex items-center justify-between sm:px-6" aria-label="Pagination">
			<div class="flex-1 flex justify-between">
				<button
					href="#"
					class="relative inline-flex items-center px-4  text-sm font-medium rounded-md text-white  hover:bg-gray-50"
				>
					<svg
						xmlns="http://www.w3.org/2000/svg"
						class="h-6 w-6"
						fill="none"
						viewBox="0 0 24 24"
						stroke="currentColor"
					>
						<path
							stroke-linecap="round"
							stroke-linejoin="round"
							stroke-width="2"
							d="M15 19l-7-7 7-7"
						/>
					</svg>
				</button>
				<p class="text-sm text-white pt-2">
					Showing
					<span class="font-medium">1</span>
					to
					<span class="font-medium">10</span>
					of
					<span class="font-medium">20</span>
					results
				</p>
				<button
					on:click={_total}
					class=" relative inline-flex items-center px-4  text-sm font-medium rounded-md text-white  hover:bg-gray-50"
				>
					<svg
						xmlns="http://www.w3.org/2000/svg"
						class="h-6 w-6"
						fill="none"
						viewBox="0 0 24 24"
						stroke="currentColor"
					>
						<path
							stroke-linecap="round"
							stroke-linejoin="round"
							stroke-width="2"
							d="M9 5l7 7-7 7"
						/>
					</svg>
				</button>
			</div>
		</nav>
	</div>
</div>

<style>
</style>

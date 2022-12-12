window.minFrame = 60
		var Stats = function () {

			var mode = 0;

			var container = document.createElement('div');
			container.style.cssText = 'position:fixed;top:0;left:0;cursor:pointer;opacity:0.9;z-index:10000';
			container.addEventListener('click', function (event) {

				event.preventDefault();
				showPanel(++mode % container.children.length);

			}, false);

			//

			function addPanel(panel) {

				return panel;

			}

			function showPanel(id) {

				for (var i = 0; i < container.children.length; i++) {

					container.children[i].style.display = i === id ? 'block' : 'none';

				}

				mode = id;

			}

			//

			var beginTime = (performance || Date).now(), prevTime = beginTime, frames = 0;
			var fpsPanel = addPanel(new Stats.Panel('FPS', '#0ff', '#002'));
			var msPanel = addPanel(new Stats.Panel('MS', '#0f0', '#020'));
			if (self.performance && self.performance.memory) {
				var memPanel = addPanel(new Stats.Panel('MB', '#f08', '#201'));
			}
			showPanel(0);
			return {
				REVISION: 16,
				dom: container,
				addPanel: addPanel,
				showPanel: showPanel,
				begin: function () {
					beginTime = (performance || Date).now();
				},
				end: function () {
					frames++;
					var time = (performance || Date).now();
					msPanel.update(time - beginTime, 200)
					if (time >= prevTime + 1000) {
						fpsPanel.update((frames * 1000) / (time - prevTime), 100);
						prevTime = time;
						frames = 0;
						if (memPanel) {
							var memory = performance.memory;
							memPanel.update(memory.usedJSHeapSize / 1048576, memory.jsHeapSizeLimit / 1048576);
						}
					}
					return time;
				},
				update: function () {
					beginTime = this.end();
				},
				// Backwards Compatibility
				domElement: container,
				setMode: showPanel
			};
		};
		Stats.Panel = function (name, fg, bg) {
			var min = Infinity, max = 0, round = Math.round;
			var PR = round(window.devicePixelRatio || 1);
			return {
				update: function (value, maxValue) {
					min = Math.min(min, value);
					window.minFrame++
					max = Math.max(max, value);
				}
			};
		};
		var stats = new Stats()
		requestAnimationFrame(function loop() { stats.update(); requestAnimationFrame(loop) });
		let drop = 0 
		setInterval(() => {
			console.log(minFrame * 2);
			if (window.minFrame * 2 < 30) { 
				drop++
				if (drop > 5) {
					animate = null; renderer = null
				} else if (window.minFrame * 2 > 55) {
					drop = 0
				}
			}
			window.minFrame = 0
		}, 500);
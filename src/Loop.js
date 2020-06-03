class Loop {
	constructor(fn, options = {}) {
		this.lastLoopTime = 0;
		this.continueLoop = true;
		this.looper = (typeof fn === 'function') ? fn : () => {};
		this.next = this.loopOnNextFrame;
		this.timeScale = (typeof options.timeScale === 'number') ? options.timeScale : 1;
		this.tick = 0;
		this.now = (typeof performance === 'object') ? () => performance.now() : () => Date.now();
		this.allowDeltaTZero = false;
	}
	loopOnNextFrame() {
		if (!this.continueLoop) { return; }
		window.requestAnimationFrame((now) => { this.loop(now); });
	}
	loop(now) {
		if (!this.continueLoop) { return; }
		const deltaT = (now - this.lastLoopTime) * this.timeScale;
		if (deltaT <= 0 && !this.allowDeltaTZero) {
			// FIXME: This is happening every other loop, but should not.
			// console.log('deltaT of zero not allowed');
			this.next();
			return;
		}
		if (this.tick >= Number.MAX_SAFE_INTEGER) {
			this.tick = 0;
		} else {
			this.tick += 1;
		}
		const returnStop = this.looper(deltaT, this.tick, now);
		this.lastLoopTime = now;
		if (returnStop) {
			this.stop();
			return;
		}
		this.next();
	}
	start() {
		this.lastLoopTime = this.now();
		this.continueLoop = true;
		this.next();
	}
	continue() {
		this.continueLoop = true;
	}
	stop() {
		this.continueLoop = false;
	}
	toggle() {
		if (this.isLooping()) { return this.stop(); }
		return this.start();
	}
	isLooping() {
		return this.continueLoop;
	}
}

export default Loop;

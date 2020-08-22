class Loop {
	constructor(fn, options = {}) {
		const o = this;
		// "looper" is the main loop function to be run on each frame
		o.looper = (typeof fn === 'function') ? fn : () => {};
		o.next = o.loopOnNextFrame;
		o.timeScale = (typeof options.timeScale === 'number') ? options.timeScale : 1;
		o.lastLoopTime = 0;
		o.continueLoop = true;
		o.tick = 0;
		o.now = (typeof performance === 'object') ? () => performance.now() : () => Date.now();
		o.allowDeltaTZero = false;
	}
	loopOnNextFrame() {
		if (!this.continueLoop) { return; }
		window.requestAnimationFrame((now) => { this.loop(now); });
	}
	loop(now) {
		const o = this;
		if (!o.continueLoop) { return; }
		const deltaT = (now - o.lastLoopTime) * o.timeScale;
		if (deltaT <= 0 && !o.allowDeltaTZero) {
			// FIXME: This is happening every other loop, but should not.
			// console.log('deltaT of zero not allowed');
			return o.next();
		}
		o.tick = (o.tick >= Number.MAX_SAFE_INTEGER) ? 0 : o.tick + 1;
		o.lastLoopTime = now;
		// If the loop returns true, that indicates a stop command
		return o.looper(deltaT, o.tick, now) ? o.stop() : o.next();
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
		return this.isLooping() ? this.stop() : this.start();
	}
	isLooping() {
		return this.continueLoop;
	}
}

export default Loop;

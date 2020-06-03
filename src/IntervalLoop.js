import Loop from './Loop.mjs';

class IntervalLoop extends Loop {
	constructor(fn, options = {}) {
		super(fn, options);
		// Overrides
		this.next = () => {};
		// New properties for IntervalLoop
		this.intervalTimer = null;
		// Milliseconds
		this.intervalTime = (typeof options.intervalTime === 'number') ? options.intervalTime : 16;
	}
	// Override start and stop
	start() {
		this.lastLoopTime = this.now();
		this.continueLoop = true;
		this.intervalTimer = setInterval(() => {
			this.loop(this.now());
		}, this.intervalTime);
	}
	stop() {
		this.continueLoop = false;
		if (this.intervalTimer) {
			clearInterval(this.intervalTimer);
		}
	}
}

export default IntervalLoop;
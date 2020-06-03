# Loop: Simple classes for handling looping

## Install

* Clone the repo, or...
* `npm install https://github.com/rocket-boots/Loop#master`

## Use

- For ES6 modules, use the files ending in `.mjs`.
- For CommonJS, use the file(s) ending in `.cjs` (built w/ webpack).

### Loop

The basic loop is intended for browser usage, and makes use of `window.requestAnimationFrame` to determine when the next loop happens.

```javascript
	import { Loop } from 'rocket-boot-loop';
	// Alternative? import Loop from 'Loop.mjs'; // ES6 module

	// Define your own game loop function
	function myGameLoopFunction(deltaT, tick, now) {
		// deltaT -- amount of milliseconds since the last loop was called
		// tick -- consecutive number of loops that were called (eventually returns to 0)
		// now -- the time
		// ...
		return true; // truthy will stop the loop
		return false; // falsey will not stop
	}

	// Optional options
	const loopOptions = {
		timeScale: 1 // multiplier for deltaT (default is 1)
	};

	// Create your loop
	const loop = new Loop(myGameLoopFunction, loopOptions);

	loop.start(); // Start the loop!

	// ...
	
	loop.stop(); // When you're done
```

### IntervalLoop

The interval loop uses `setInterval`, and is suitable for both frontend and backend (node) applications.

```javascript
	import IntervalLoop from 'Interval.mjs';

	// TODO: More documentation needed
```

### Methods

- Instantiation takes two arguments: a function that is called on each loop, and an optional object of options. See examples.
- `isLooping()` -- returns boolean
- `start()` -- start looping again
- `stop()` -- no more loops
- `toggle()` -- start or stop depending on whether it's looping

## Development

- Run `npm run build` to build the CommonJS version.
- Please submit issues or pull requests if you'd like to see changes or fixes.

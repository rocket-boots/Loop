(function(e, a) { for(var i in a) e[i] = a[i]; }(exports, /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(__webpack_module__, __webpack_exports__, __webpack_require__) {

"use strict";
// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// CONCATENATED MODULE: ./src/Loop.js
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

/* harmony default export */ var src_Loop = (Loop);

// CONCATENATED MODULE: ./src/IntervalLoop.js


class IntervalLoop_IntervalLoop extends src_Loop {
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

/* harmony default export */ var src_IntervalLoop = (IntervalLoop_IntervalLoop);
// CONCATENATED MODULE: ./index.mjs



/* harmony default export */ var index = __webpack_exports__["default"] = ({ Loop: src_Loop, IntervalLoop: src_IntervalLoop });


/***/ })
/******/ ])["default"]));
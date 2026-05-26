/**
 * @module async/throttle
 */

export interface ThrottledFunction<T extends (...args: never[]) => void> {
	(...args: Parameters<T>): void
	cancel(): void
}

/**
 * @function
 * @example
 * import { throttle } from '@untemps/utils/async/throttle'
 *
 * const handler = throttle((event: MouseEvent) => console.log(event), 200)
 * window.addEventListener('scroll', handler)
 *
 * handler.cancel() // Cancel any pending trailing invocation
 *
 * @param fn        - The function to throttle.
 * @param interval  - The minimum interval between invocations in milliseconds.
 * @returns A throttled version of the function with a `.cancel()` method.
 */
export const throttle = <T extends (...args: never[]) => void>(fn: T, interval: number): ThrottledFunction<T> => {
	let lastCallTime = 0
	let timeoutId: ReturnType<typeof setTimeout> | null = null
	let lastArgs: Parameters<T> | null = null

	const throttled = ((...args: Parameters<T>) => {
		const now = Date.now()
		const remaining = interval - (now - lastCallTime)

		lastArgs = args

		if (remaining <= 0) {
			if (timeoutId !== null) {
				clearTimeout(timeoutId)
				timeoutId = null
			}
			lastCallTime = now
			lastArgs = null
			fn(...args)
		} else if (timeoutId === null) {
			timeoutId = setTimeout(() => {
				lastCallTime = Date.now()
				timeoutId = null
				if (lastArgs !== null) {
					const argsToCall = lastArgs
					lastArgs = null
					fn(...argsToCall)
				}
			}, remaining)
		}
	}) as ThrottledFunction<T>

	throttled.cancel = () => {
		if (timeoutId !== null) {
			clearTimeout(timeoutId)
			timeoutId = null
		}
		lastArgs = null
		lastCallTime = 0
	}

	return throttled
}

/**
 * @module async/debounce
 */

export interface DebouncedFunction<T extends (...args: never[]) => void> {
	(...args: Parameters<T>): void
	cancel(): void
}

/**
 * @function
 * @example
 * import { debounce } from '@untemps/utils/async/debounce'
 *
 * const handler = debounce((value: string) => console.log(value), 300)
 * handler('a')
 * handler('b')
 * handler('c') // Only 'c' is logged after 300ms
 *
 * handler.cancel() // Cancel any pending invocation
 *
 * @param fn     - The function to debounce.
 * @param delay  - The debounce delay in milliseconds.
 * @returns A debounced version of the function with a `.cancel()` method.
 */
export const debounce = <T extends (...args: never[]) => void>(fn: T, delay: number): DebouncedFunction<T> => {
	let timeoutId: ReturnType<typeof setTimeout> | null = null

	const debounced = ((...args: Parameters<T>) => {
		if (timeoutId !== null) {
			clearTimeout(timeoutId)
		}
		timeoutId = setTimeout(() => {
			timeoutId = null
			fn(...args)
		}, delay)
	}) as DebouncedFunction<T>

	debounced.cancel = () => {
		if (timeoutId !== null) {
			clearTimeout(timeoutId)
			timeoutId = null
		}
	}

	return debounced
}

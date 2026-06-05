/**
 * @module async/standby
 */

/**
 * Returns a promise that resolves after the given timeout, useful to pause an asynchronous flow.
 *
 * @function
 * @example
 * import { standby } from '@untemps/utils/async/standby'
 *
 * const fn = async () => {
 *   console.log("Start delay")
 *   await standby(3000)
 *   console.log("End delay")
 * }
 * fn()
 *
 * @param timeout  - The delay before resolving the promise (in milliseconds).
 * @returns The promise to be resolved.
 */
export const standby = (timeout = 128): Promise<void> => new Promise((resolve) => setTimeout(resolve, timeout))

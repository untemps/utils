/**
 * @module async/standby
 */

/**
 * Resolves a promise after a delay.
 *
 * @function
 * @example
 * import { standby } from '@untemps/utils/async/standby'
 *
 * const fn = async () => {
 *   console.log('Start delay')
 *   await standby(1000)
 *   console.log('End delay')
 * }
 *
 * @param {number} [timeout=128] - Delay before resolving the promise (ms).
 * @returns {Promise<unknown>}  The promise to be resolved.
 */
export const standby = (timeout = 128) => new Promise((resolve) => setTimeout(resolve, timeout))

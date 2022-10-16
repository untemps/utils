/**
 * @fileOverview Resolves a promise after a delay.
 * @module async/standby
 */

/**
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
 * @param {number} [timeout=128]  - The delay before resolving the promise (in milliseconds).
 * @returns {Promise<void>}       The promise to be resolved.
 */
export const standby = (timeout = 128) => new Promise((resolve) => setTimeout(resolve, timeout))

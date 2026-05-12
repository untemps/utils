/**
 * @module dom/resolveClassName
 */

export type ClassConditionTuple = [condition: unknown, truthyValue: string, falsyValue?: string]
export type ClassEntry = string | ClassConditionTuple

/**
 * @function
 * @example
 * import { resolveClassName } from '@untemps/utils/dom/resolveClassName'
 *
 * const input = [
 *  [true, 'foo', 'bar'],
 *  [false, 'foo', 'bar'],
 *  'gag',
 * ]
 * resolveClassName(input) // 'foo bar gag'
 *
 * @param input - Array of conditions to evaluate. A condition is an array with 3 items: [condition, class if true, class if false]. You may pass a classname as string instead of a condition.
 * @returns The aggregated class names.
 */
export const resolveClassName = (input?: ClassEntry[]): string => {
	if (!input?.length) return ''
	return input
		.reduce<string[]>((acc, value) => {
			let resolved: string | undefined
			if (Array.isArray(value)) {
				const [condition, truthyValue, falsyValue] = value
				resolved = condition ? truthyValue : falsyValue
			} else {
				resolved = value
			}
			return normalize(resolved) ? [...acc, resolved as string] : acc
		}, [])
		.join(' ')
}

const normalize = (value: unknown): string | null => (!!value && typeof value === 'string' ? value : null)

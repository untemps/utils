import fc from 'fast-check'

import { standby } from '../standby'

describe('standby (property-based)', () => {
	it('resolves only at or after the given timeout', async () => {
		await fc.assert(
			fc.asyncProperty(fc.integer({ min: 1, max: 100000 }), async (timeout) => {
				vi.useFakeTimers()
				try {
					const spy = vi.fn()
					standby(timeout).then(spy)
					await vi.advanceTimersByTimeAsync(timeout - 1)
					expect(spy).not.toHaveBeenCalled()
					await vi.advanceTimersByTimeAsync(1)
					expect(spy).toHaveBeenCalledTimes(1)
				} finally {
					vi.useRealTimers()
				}
			})
		)
	})
})

import fc from 'fast-check'
import { throttle } from '../throttle'

describe('throttle (property-based)', () => {
	beforeEach(() => {
		vi.useFakeTimers()
	})

	afterEach(() => {
		vi.useRealTimers()
	})

	it('always invokes the function at least once when called at least once', () => {
		fc.assert(
			fc.property(fc.integer({ min: 1, max: 1000 }), fc.integer({ min: 1, max: 50 }), (interval, callCount) => {
				const fn = vi.fn()
				const throttled = throttle(fn, interval)

				for (let i = 0; i < callCount; i++) {
					throttled(i)
				}
				vi.advanceTimersByTime(interval)
				expect(fn.mock.calls.length).toBeGreaterThanOrEqual(1)
			})
		)
	})

	it('never invokes the function more than twice per interval when all calls happen within the same interval', () => {
		fc.assert(
			fc.property(fc.integer({ min: 1, max: 1000 }), fc.integer({ min: 1, max: 50 }), (interval, callCount) => {
				const fn = vi.fn()
				const throttled = throttle(fn, interval)

				for (let i = 0; i < callCount; i++) {
					throttled(i)
				}
				vi.advanceTimersByTime(interval)
				expect(fn.mock.calls.length).toBeLessThanOrEqual(2)
			})
		)
	})

	it('never invokes the function after cancel with no further calls', () => {
		fc.assert(
			fc.property(fc.integer({ min: 1, max: 1000 }), fc.integer({ min: 2, max: 20 }), (interval, callCount) => {
				const fn = vi.fn()
				const throttled = throttle(fn, interval)

				for (let i = 0; i < callCount; i++) {
					throttled(i)
				}
				const callsBeforeCancel = fn.mock.calls.length
				throttled.cancel()
				vi.advanceTimersByTime(interval)
				expect(fn.mock.calls.length).toBe(callsBeforeCancel)
			})
		)
	})
})

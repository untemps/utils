import fc from 'fast-check'
import { debounce } from '../debounce'

describe('debounce (property-based)', () => {
	beforeEach(() => {
		vi.useFakeTimers()
	})

	afterEach(() => {
		vi.useRealTimers()
	})

	it('always invokes the function exactly once after the delay when called once', () => {
		fc.assert(
			fc.property(fc.integer({ min: 1, max: 1000 }), (ms) => {
				const fn = vi.fn()
				const debounced = debounce(fn, ms)

				debounced()
				vi.advanceTimersByTime(ms)
				expect(fn).toHaveBeenCalledOnce()
			})
		)
	})

	it('always passes the last arguments when called multiple times', () => {
		fc.assert(
			fc.property(fc.array(fc.integer(), { minLength: 1, maxLength: 20 }), (values) => {
				const fn = vi.fn()
				const debounced = debounce(fn, 100)

				for (const v of values) {
					debounced(v)
				}
				vi.advanceTimersByTime(100)
				expect(fn).toHaveBeenCalledOnce()
				expect(fn).toHaveBeenCalledWith(values[values.length - 1])
			})
		)
	})

	it('never invokes the function if cancelled before the delay', () => {
		fc.assert(
			fc.property(fc.integer({ min: 1, max: 1000 }), (ms) => {
				const fn = vi.fn()
				const debounced = debounce(fn, ms)

				debounced()
				debounced.cancel()
				vi.advanceTimersByTime(ms)
				expect(fn).not.toHaveBeenCalled()
			})
		)
	})
})

import { throttle } from '../throttle'

describe('throttle', () => {
	beforeEach(() => {
		vi.useFakeTimers()
	})

	afterEach(() => {
		vi.useRealTimers()
	})

	it('invokes the function immediately on the first call', () => {
		const fn = vi.fn()
		const throttled = throttle(fn, 100)

		throttled()
		expect(fn).toHaveBeenCalledOnce()
	})

	it('does not invoke the function again within the interval', () => {
		const fn = vi.fn()
		const throttled = throttle(fn, 100)

		throttled()
		throttled()
		throttled()
		expect(fn).toHaveBeenCalledOnce()
	})

	it('schedules a trailing call with the latest arguments', () => {
		const fn = vi.fn()
		const throttled = throttle(fn, 100)

		throttled('a')
		throttled('b')
		throttled('c')
		expect(fn).toHaveBeenCalledOnce()
		expect(fn).toHaveBeenCalledWith('a')

		vi.advanceTimersByTime(100)
		expect(fn).toHaveBeenCalledTimes(2)
		expect(fn).toHaveBeenLastCalledWith('c')
	})

	it('allows a new call after the interval has elapsed', () => {
		const fn = vi.fn()
		const throttled = throttle(fn, 100)

		throttled()
		vi.advanceTimersByTime(100)
		throttled()
		expect(fn).toHaveBeenCalledTimes(2)
	})

	it('passes arguments to the original function', () => {
		const fn = vi.fn()
		const throttled = throttle(fn, 100)

		throttled('hello', 42)
		expect(fn).toHaveBeenCalledWith('hello', 42)
	})

	it('cancels pending trailing invocations', () => {
		const fn = vi.fn()
		const throttled = throttle(fn, 100)

		throttled('a')
		throttled('b')
		throttled.cancel()

		vi.advanceTimersByTime(100)
		expect(fn).toHaveBeenCalledOnce()
		expect(fn).toHaveBeenCalledWith('a')
	})

	it('can be called again after cancel', () => {
		const fn = vi.fn()
		const throttled = throttle(fn, 100)

		throttled('a')
		throttled.cancel()
		throttled('b')

		expect(fn).toHaveBeenCalledTimes(2)
		expect(fn).toHaveBeenLastCalledWith('b')
	})

	it('clears a pending trailing timeout when called after the interval without timers firing', () => {
		const fn = vi.fn()
		const throttled = throttle(fn, 100)

		const start = Date.now()
		throttled('a') // leading call
		throttled('b') // schedules trailing timeout (timeoutId !== null)

		// Advance Date.now() past the interval WITHOUT firing timers
		vi.setSystemTime(start + 200)
		throttled('c') // remaining <= 0 while timeoutId is still set → clears it

		expect(fn).toHaveBeenCalledTimes(2)
		expect(fn).toHaveBeenNthCalledWith(1, 'a')
		expect(fn).toHaveBeenNthCalledWith(2, 'c')

		// The old trailing timeout should have been cleared, so advancing won't call fn('b')
		vi.advanceTimersByTime(200)
		expect(fn).toHaveBeenCalledTimes(2)
	})

	it('does nothing when cancel is called with no pending invocation', () => {
		const fn = vi.fn()
		const throttled = throttle(fn, 100)

		expect(() => throttled.cancel()).not.toThrow()
	})
})

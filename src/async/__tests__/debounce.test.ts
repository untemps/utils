import { debounce } from '../debounce'

describe('debounce', () => {
	beforeEach(() => {
		vi.useFakeTimers()
	})

	afterEach(() => {
		vi.useRealTimers()
	})

	it('delays invocation until after the delay period', () => {
		const fn = vi.fn()
		const debounced = debounce(fn, 50)

		debounced()
		expect(fn).not.toHaveBeenCalled()

		vi.advanceTimersByTime(50)
		expect(fn).toHaveBeenCalledOnce()
	})

	it('resets the timer on subsequent calls', () => {
		const fn = vi.fn()
		const debounced = debounce(fn, 50)

		debounced()
		vi.advanceTimersByTime(30)
		debounced()
		vi.advanceTimersByTime(30)
		expect(fn).not.toHaveBeenCalled()

		vi.advanceTimersByTime(20)
		expect(fn).toHaveBeenCalledOnce()
	})

	it('passes arguments to the original function', () => {
		const fn = vi.fn()
		const debounced = debounce(fn, 50)

		debounced('hello', 42)
		vi.advanceTimersByTime(50)
		expect(fn).toHaveBeenCalledWith('hello', 42)
	})

	it('uses the arguments from the last call', () => {
		const fn = vi.fn()
		const debounced = debounce(fn, 50)

		debounced('a')
		debounced('b')
		debounced('c')
		vi.advanceTimersByTime(50)
		expect(fn).toHaveBeenCalledOnce()
		expect(fn).toHaveBeenCalledWith('c')
	})

	it('cancels a pending invocation', () => {
		const fn = vi.fn()
		const debounced = debounce(fn, 50)

		debounced()
		debounced.cancel()
		vi.advanceTimersByTime(50)
		expect(fn).not.toHaveBeenCalled()
	})

	it('can be called again after cancel', () => {
		const fn = vi.fn()
		const debounced = debounce(fn, 50)

		debounced()
		debounced.cancel()
		debounced()
		vi.advanceTimersByTime(50)
		expect(fn).toHaveBeenCalledOnce()
	})

	it('does nothing when cancel is called with no pending invocation', () => {
		const fn = vi.fn()
		const debounced = debounce(fn, 50)

		expect(() => debounced.cancel()).not.toThrow()
	})
})

import { debounce } from '../debounce'

const delay = (ms: number): Promise<void> => new Promise((resolve) => setTimeout(resolve, ms))

describe('debounce', () => {
	it('delays invocation until after the delay period', async () => {
		const fn = vi.fn()
		const debounced = debounce(fn, 50)

		debounced()
		expect(fn).not.toHaveBeenCalled()

		await delay(80)
		expect(fn).toHaveBeenCalledOnce()
	})

	it('resets the timer on subsequent calls', async () => {
		const fn = vi.fn()
		const debounced = debounce(fn, 50)

		debounced()
		await delay(30)
		debounced()
		await delay(30)
		expect(fn).not.toHaveBeenCalled()

		await delay(40)
		expect(fn).toHaveBeenCalledOnce()
	})

	it('passes arguments to the original function', async () => {
		const fn = vi.fn()
		const debounced = debounce(fn, 50)

		debounced('hello', 42)
		await delay(80)
		expect(fn).toHaveBeenCalledWith('hello', 42)
	})

	it('uses the arguments from the last call', async () => {
		const fn = vi.fn()
		const debounced = debounce(fn, 50)

		debounced('a')
		debounced('b')
		debounced('c')
		await delay(80)
		expect(fn).toHaveBeenCalledOnce()
		expect(fn).toHaveBeenCalledWith('c')
	})

	it('cancels a pending invocation', async () => {
		const fn = vi.fn()
		const debounced = debounce(fn, 50)

		debounced()
		debounced.cancel()
		await delay(80)
		expect(fn).not.toHaveBeenCalled()
	})

	it('can be called again after cancel', async () => {
		const fn = vi.fn()
		const debounced = debounce(fn, 50)

		debounced()
		debounced.cancel()
		debounced()
		await delay(80)
		expect(fn).toHaveBeenCalledOnce()
	})

	it('does nothing when cancel is called with no pending invocation', () => {
		const fn = vi.fn()
		const debounced = debounce(fn, 50)

		expect(() => debounced.cancel()).not.toThrow()
	})
})

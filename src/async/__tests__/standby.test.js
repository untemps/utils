import { standby } from '../standby'

const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms))

describe('standby', () => {
	it('delays operation with default timeout', async () => {
		let flag = false
		standby(64).then(() => {
			flag = true
		})
		await delay(1)
		expect(flag).toBeFalsy()
		await delay(255)
		expect(flag).toBeTruthy()
	})

	it('delays operation with custom timeout', async () => {
		let flag = false
		standby(32).then(() => {
			flag = true
		})
		await delay(1)
		expect(flag).toBeFalsy()
		await delay(63)
		expect(flag).toBeTruthy()
	})
})

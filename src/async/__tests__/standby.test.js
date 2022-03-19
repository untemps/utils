import standby from '../standby'

describe('standby', () => {
	it('delays operation with default timeout', (done) => {
		let flag = false
		standby(64).then(() => {
			flag = true
		})
		setTimeout(() => {
			expect(flag).toBeFalsy()
		}, 1)
		setTimeout(() => {
			expect(flag).toBeTruthy()
			done()
		}, 256)
	})

	it('delays operation with custom timeout', (done) => {
		let flag = false
		standby(32).then(() => {
			flag = true
		})
		setTimeout(() => {
			expect(flag).toBeFalsy()
		}, 1)
		setTimeout(() => {
			expect(flag).toBeTruthy()
			done()
		}, 64)
	})
})

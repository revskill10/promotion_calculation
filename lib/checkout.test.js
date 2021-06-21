const Checkout = require('./checkout')
let pricingRules
let items
describe('#totals', () => {
    beforeEach(() => {
        pricingRules = {
            'Small Pizza': {
                'InfoSys': {
                    type: 'quantity',
                    from: 2,
                    to: 3
                }
            },
            'Medium Pizza': {
                'Facebook': {
                    type: 'quantity',
                    from: 4,
                    to: 5
                }
            },
            'Large Pizza': {
                'Amazon': {
                    type: 'discount',
                    value: 299.99
                },
                'Facebook': {
                    type: 'discount',
                    value: 389.99
                }
            }
        }
        items = {
            'Small Pizza': {
                price: 269.99,
                description: '10"" for one person'
            },
            'Medium Pizza': {
                price: 322.99,
                description: '12"" for two persons'
            },
            'Large Pizza': {
                price: 394.99,
                description: '15"" for four persons'
            }
        }
    })
    it('returns correct totoal for default customer', () => {
        const co = new Checkout(pricingRules, items)
        co.add({ name: 'Small Pizza', qty: 1 })
        co.add({ name: 'Medium Pizza', qty: 1 })
        co.add({ name: 'Large Pizza', qty: 1 })
        expect(co.total()).toBe(987.97)
    })
    it('returns correct totoal for InfoSys customer', () => {
        const co = new Checkout(pricingRules, items, 'InfoSys')
        co.add({ name: 'Small Pizza', qty: 3 })
        co.add({ name: 'Large Pizza', qty: 1 })
        expect(co.total()).toBe(934.97)
    })
    it('returns correct totoal for Amazon customer', () => {
        const co = new Checkout(pricingRules, items, 'Amazon')
        co.add({ name: 'Medium Pizza', qty: 3 })
        co.add({ name: 'Large Pizza', qty: 1 })
        expect(co.total()).toBe(1268.96)
    })
    it('returns correct total for Facebook customer', () => {
        const co = new Checkout(pricingRules, items, 'Facebook')
        co.add({ name: 'Small Pizza', qty: 3 })
        co.add({ name: 'Medium Pizza', qty: 2 })
        co.add({ name: 'Large Pizza', qty: 1 })
        expect(co.total()).toBe(1199.96)
    })
    it('throw error with invalid customer', () => {
        expect(
            () => new Checkout(pricingRules, items, 'blah')
        ).toThrow()
    })
    it('#add: throw error with invalid item', () => {
        const co = new Checkout(pricingRules, items)
        expect(
            () => co.add({ name1: 'Small Pizza', qty: 1 }) 
        ).toThrow()
        expect(
            () => co.add({ name: 'Small Pizza', qty1: 1 })
        ).toThrow()
        expect(
            () => co.add({ name: 'invallid', qty: 10 })
        ).toThrow()
    })
})
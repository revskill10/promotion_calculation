const utils = require('./utils')

describe('#itemSorter', () => {
    it('compares two items', () => {
        const a = { price: 1 }
        const b = { price: 2 }
        const c = { price: 1 }
        expect(utils.itemSorter(a, b)).toBe(-1)
        expect(utils.itemSorter(b, a)).toBe(1)
        expect(utils.itemSorter(a, c)).toBe(0)
    })
})

describe('#orderItems', () => {
    it('sort items per price asc', () => {
        const items = {
            'Small Pizza': {
                price: 269.99,
            },
            'Large Pizza': {
                price: 394.99,
            },
            'Medium Pizza': {
                price: 322.99,
            },
        }
        const expected = [
            { name: 'Small Pizza', price: 269.99 },
            { name: 'Medium Pizza', price: 322.99 },
            { name: 'Large Pizza', price: 394.99 }
        ]
        expect(utils.orderedItems(items)).toStrictEqual(expected)
    })
})

describe("#findItem", () => {
    it('find nearest max item', () => {
        const items = [
            { name: 'Small Pizza', price: 269.99 },
            { name: 'Medium Pizza', price: 322.99 },
            { name: 'Large Pizza', price: 394.99 }
        ]
        const expected = {
            name: 'Medium Pizza',
            price: 322.99
        }
        expect(utils.findItem(items, 299)).toStrictEqual(expected)
    })
})
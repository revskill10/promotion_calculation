const items = {
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
const itemSorter = (a, b) => {
    if (a.price < b.price) return -1
    if (a.price > b.price) return 1
    return 0
}
const orderedItems = _items => Object.keys(_items).map(itemName => {
    return {
        name: itemName,
        ..._items[itemName]
    }
}).sort(itemSorter)

const findItem = (_items, price) => {
    if (_items[0].price >= price) return _items[0]
    for(let i = 1; i < _items.length; i++) {
        if (_items[i-1].price <= price && _items[i].price > price) return _items[i]
    }
}

const pricingRules = {
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

function visitPricing(_pricingRules, _customer) {
    return function(detail) {
        const evaluation1 = _pricingRules[detail.name]
        if (evaluation1) {
            const evaluation = evaluation1[_customer]
            if (evaluation) {
                let price = detail.price
                let qty = detail.qty
                if (evaluation.type === 'discount') {
                    const tmp = findItem(orderedItems(items), evaluation.value)
                    price = tmp.price
                }
                if (evaluation.type === 'quantity') {
                    const tmp = Math.floor(detail.qty / evaluation.from)
                    qty = tmp * evaluation.from
                }
                console.log('price', price)
                return {
                    ...detail,
                    price,
                    qty
                }
            } else {
                return detail
            }
        } else {
            return detail
        }
    }
}

class Checkout {
    constructor(pricingRules, customer = 'default') {
        this.customer = customer
        this.pricingRules = pricingRules
        this.items = []
    }

    add(item) {
        const detail = {
            ...item,
            ...items[item.name]
        }
        this.items.push(detail)
    }

    total() {
        let tmp = this.items
        if (this.customer !== 'default') {
            const mapper = visitPricing(this.pricingRules, this.customer)
            tmp = this.items.map(mapper)
        }
        return tmp.reduce((prev, cur) => {
            return prev + cur.price * cur.qty
        }, 0)
    }
}

const co = new Checkout()
co.add({ name: 'Small Pizza', qty: 1 })
co.add({ name: 'Medium Pizza', qty: 1 })
co.add({ name: 'Large Pizza', qty: 1 })
console.log(co.total())

const co2 = new Checkout(pricingRules, 'InfoSys')
co2.add({ name: 'Small Pizza', qty: 3 })
co2.add({ name: 'Large Pizza', qty: 1 })
console.log(co2.total())

const co3 = new Checkout(pricingRules, 'Amazon')
co3.add({ name: 'Medium Pizza', qty: 3 })
co3.add({ name: 'Large Pizza', qty: 1 })
console.log(co3.total())
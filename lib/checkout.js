function visitPricing(_pricingRules, _customer, _items) {
    return function(detail) {
        const evaluation1 = _pricingRules[detail.name]
        if (evaluation1) {
            const evaluation = evaluation1[_customer]
            if (evaluation) {
                let price = detail.price
                let qty = detail.qty
                if (evaluation.type === 'discount') {
                    price = evaluation.value
                }
                if (evaluation.type === 'quantity') {
                    const tmp = Math.floor(detail.qty / evaluation.from)
                    qty = tmp * evaluation.from
                }
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
    constructor(pricingRules, orriginalItems = [], customer = 'default') {
        if (customer !== '' && !['default', 'Facebook', 'InfoSys', 'Amazon'].includes(customer)) {
            throw new Error('invalid customer')
        }
        this.customer = customer
        this.pricingRules = pricingRules
        this.items = []
        this.orriginalItems = orriginalItems
    }

    add(item) {
        if (item?.name && this.orriginalItems[item.name]) {
            const detail = {
                ...item,
                ...this.orriginalItems[item.name]
            }
            this.items.push(detail)
        }
    }

    total() {
        let tmp = this.items
        if (this.customer !== 'default') {
            const mapper = visitPricing(this.pricingRules, this.customer, this.orriginalItems)
            tmp = this.items.map(mapper)
        }
        return tmp.reduce((prev, cur) => {
            return prev + cur.price * cur.qty
        }, 0)
    }

    getItems() { return this.items }
}

module.exports = Checkout
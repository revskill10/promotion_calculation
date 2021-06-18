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
    for (let i = 1; i < _items.length; i++) {
        if (_items[i - 1].price <= price && _items[i].price > price) return _items[i]
    }
}

module.exports = {
    orderedItems,
    findItem,
    itemSorter,
}
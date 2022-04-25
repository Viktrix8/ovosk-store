export default {
    name: 'orders',
    type: 'document',
    title: 'Orders',
    fields: [
        {
            name: 'amount',
            type: 'number',
            title: 'Amount',
        },
        {
            name: 'product',
            title: "Product",
            type: 'string',
        }
    ]
}
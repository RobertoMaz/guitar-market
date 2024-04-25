export const formatQuantity = (quantity) => {
    return Number(quantity).toLocaleString('es-AR', {
        style: 'currency',
        currency: 'ARS'
    })
}
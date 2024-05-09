export const getCollecions = async () => {
    const collections = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/collections`);
    return await collections.json()
}

export const getCollectionDetails = async (collectionId: string) => {
    const collections = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/collections/${collectionId}`);
    return await collections.json()
}
export const getProducts = async () => {
    const products = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/products`);
    return await products.json();
}

export const getProductDetails = async (productId: string) => {
    const product = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/products/${productId}`);
    return await product.json()
}


export const getSearchProducts = async (query: string) => {
    const searchProduct = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/search/${query}`);
    return await searchProduct.json()
}

export const getOrders = async (customerId: string) => {
    const orders = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/orders/customers/${customerId}`);
    return await orders.json();
}

export const getRelatedProducts = async (productId: string) => {
    const realatedProducts = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/products/${productId}/related`);
    return await realatedProducts.json();
}
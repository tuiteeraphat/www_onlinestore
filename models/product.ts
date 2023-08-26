export default interface ProductModel {
    id: string
    name: string
    price: number
    detail?: string
    product_type?: string
    discount: number
    is_show?: string
    createdAt?: string
    updatedAt?: string
    image: string[]
    stock?: number
    sold?: number
    category_id?: string
    brand_id?: string
    Brand?: {
        name?: string
    }
    Category?: {
        name?: string
    }
}

import Product from '@/components/Product'
import ProductModel from '@/models/product'
import { titleName } from '@/utils/constants'
import { customAxios } from '@/utils/customHook'
import Head from 'next/head'

function Index({ products }: any) {
    return (
        <>
            <Head>
                <title>{`${titleName} - ระบบขายสินค้าออนไลน์`}</title>
            </Head>
            <div className="px-5 flex flex-col md:flex-row">
                <div className="h-fit w-[250px] mr-5 bg-white border shadow rounded flex flex-col items-center justify-center">
                    Sidebar
                </div>
                <div className="w-full flex flex-wrap">
                    {products &&
                        products.map((product: ProductModel) => {
                            return (
                                <Product
                                    id={product.id}
                                    name={product.name}
                                    price={product.price}
                                    product_type={product.product_type}
                                    discount={product.discount}
                                    image={product.image}
                                    sold={product.sold}
                                />
                            )
                        })}
                </div>
            </div>
        </>
    )
}

export const getServerSideProps = async () => {
    const response = await customAxios.get('api/product')
    const products = response.data.data

    return { props: { products } }
}

export default Index

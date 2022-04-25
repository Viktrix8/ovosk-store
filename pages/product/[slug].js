import { useState } from "react"
import { AiOutlineMinus, AiOutlinePlus, AiFillStar, AiOutlineStar } from "react-icons/ai"

import { useStateContext } from "../../context/StateContext"
import { Product } from "../../components"
import { urlFor, client } from '../../lib/client'

const ProductDetails = ({ product, products }) => {
    const { incrementQuantity, decrementQuantity, qty, onAdd, setShowCart } = useStateContext()
    const [index, setIndex] = useState(0)

    const { image, name, details, price } = product

    const handleBuyNow = async () => {
        onAdd(product, qty)
        setShowCart(true)
    };
    return (
        <div>
            <div className="product-detail-container">
                <div>
                    <div className="image-container">
                        <img src={urlFor(image && image[index])} className="product-detail-image" style={{ objectFit: 'cover' }} />
                    </div>
                    <div className="small-images-container">
                        {image?.map((item, i) => (
                            <img
                                key={i}
                                src={urlFor(item)}
                                className={i === index ? 'small-image selected-image' : 'small-image'}
                                onMouseEnter={() => setIndex(i)}
                                style={{ objectFit: 'cover' }}
                            />
                        ))}
                    </div>
                </div>

                <div className="product-detail-desc">
                    <h1>{name}</h1>
                    <div className="reviews">
                        <div>
                            <AiFillStar />
                            <AiFillStar />
                            <AiFillStar />
                            <AiFillStar />
                            <AiFillStar />
                            {/* <AiOutlineStar /> */}
                        </div>
                        <p>
                            (1)
                        </p>
                    </div>
                    <h4>Details: </h4>
                    <p>{details}</p>
                    <p className="price">€{price}</p>
                    <div className="quantity">
                        <h3>Počet:</h3>
                        <p className="quantity-desc">
                            <span className="minus" onClick={decrementQuantity}><AiOutlineMinus /></span>
                            <span className="num">{qty}</span>
                            <span className="plus" onClick={incrementQuantity}><AiOutlinePlus /></span>
                        </p>
                    </div>
                    <div className="buttons">
                        <button type="button" className="add-to-cart" onClick={() => onAdd(product, qty)}>Pridať to košíka</button>
                        <button type="button" className="buy-now" onClick={() => handleBuyNow()}>Kúpiť hneď</button>
                    </div>
                </div>
            </div>

            <div className="maylike-products-wrapper">
                <h2>Tiež by sa mohlo pačiť:</h2>
                <div className="marquee">
                    <div className="maylike-products-container track">
                        {products.map((item) => (
                            <Product key={item._id} product={item} />
                        ))}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ProductDetails

export const getStaticProps = async ({ params: { slug } }) => {
    const productQuery = `*[_type == "product" && slug.current == "${slug}"][0]`
    const productsQuery = `*[_type == "product"]`
    const product = await client.fetch(productQuery)
    const products = await client.fetch(productsQuery)

    return {
        props: {
            product, products
        }
    }
}

export const getStaticPaths = async () => {
    const query = `*[_type == "product"] {
        slug {
            current
        }
    }`

    const products = await client.fetch(query)

    const paths = products.map(product => ({
        params: {
            slug: product.slug.current
        }
    }))

    return {
        paths,
        fallback: "blocking"
    }
}
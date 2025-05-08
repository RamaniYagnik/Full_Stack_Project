import React, { useContext, useEffect, useState } from 'react'
import fetchCategoryWiseProduct from '../../helpers/fetchCategoryWiseProduct'
import displayINRcurrency from '../../helpers/DisplayCurrency'
import { Link } from 'react-router-dom'
import Addtocart from '../../helpers/Addtocart'
import Context from '../../context/context'

const VerticalCardProduct = ({
    category,
    heading,
    products = null
}) => {

    const [data, setData] = useState([])
    const [loading, setLoading] = useState(false)
    const loadingList = new Array(15).fill(null)

    const { fetchAddTocart } = useContext(Context)

    const handleAddToCart = async (e, id) => {
        await Addtocart(e, id)
        fetchAddTocart()
    }

    const fetchData = async () => {
        if (products && Array.isArray(products)) {
            setData(products)
        } else {
            setLoading(true)
            const categoryProduct = await fetchCategoryWiseProduct(category)
            setData(categoryProduct?.data || [])
            setLoading(false)
        }
    }

    useEffect(() => {
        fetchData()
    }, [category, products])

    return (
        <div className='px-4 my-6 mx-16'>
            <h2 className='text-2xl font-semibold'>{heading}</h2>

            <div className="flex my-4 flex-wrap">
                {loading ? (
                    loadingList.map((_, index) => (
                        <div key={index} className='lg:w-1/3 md:w-1/2 w-full'>
                            <div className="mx-3 my-5 p-4 bg-slate-100 rounded-lg animate-pulse w-[350px] h-[400px] flex flex-col justify-between">
                                <div className="bg-gray-300 h-40 w-full rounded mb-4"></div>
                                <div className="bg-gray-300 h-4 w-3/4 rounded mb-2"></div>
                                <div className="bg-gray-300 h-4 w-1/2 rounded mb-2"></div>
                                <div className="bg-gray-300 h-10 w-full rounded mt-4"></div>
                            </div>
                        </div>
                    ))
                ) : (
                    data.map((product, index) => (
                        <Link to={"/productdetails/" + product?._id} key={index} className='lg:w-1/3 md:w-1/2 w-full'>
                            <div className="mx-3 my-5 flex justify-center bg-slate-100 rounded-lg items-center p-4 hover:shadow-lg shadow-black transition-all">
                                <div className="overflow-hidden flex justify-center items-center w-[350px]">
                                    <div>
                                        <img
                                            src={product?.productImage[0]}
                                            alt=""
                                            className="object-contain w-full h-full mix-blend-multiply hover:scale-105 transition-all"
                                        />
                                        <div>
                                            <p className='my-4 text-slate-500 line-clamp-2'>{product?.productName}</p>
                                            <div className='flex gap-2 items-center'>
                                                <p className='text-sm font-medium'>
                                                    {displayINRcurrency(product?.sellingPrice)}
                                                </p>
                                                {
                                                    product?.sellingPrice < product?.price && (
                                                        <>
                                                            <p className='text-red-500 text-xs'>
                                                                <del>{displayINRcurrency(product?.price)}</del>
                                                            </p>
                                                            <p className='text-green-600 text-sm font-semibold'>
                                                                ({Math.round(((product?.price - product?.sellingPrice) / product?.price) * 100)}% OFF)
                                                            </p>
                                                        </>
                                                    )
                                                }
                                            </div>

                                            <div>
                                                <button className='bg-white py-2 px-6 rounded-xl border border-slate-400 my-3 hover:border-yellow-700 hover:text-yellow-700 transition-all w-full group'>
                                                    <span className='inline-block transition-transform group-hover:scale-125' onClick={(e) => handleAddToCart(e, product?._id)}>Add To Cart</span>
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </Link>
                    ))
                )}
            </div>
        </div>
    )
}

export default VerticalCardProduct

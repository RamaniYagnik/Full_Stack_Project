import React, { useEffect, useState } from 'react'
import fetchCategoryWiseProduct from '../../helpers/fetchCategoryWiseProduct'
import displayINRcurrency from '../../helpers/DisplayCurrency'
import { Link } from 'react-router-dom'
import Addtocart from '../../helpers/Addtocart'
import { useContext } from 'react'
import Context from '../../context/context'

const HorizontalCardProduct = ({
    category,
    heading
}) => {

    const [data, setData] = useState([])
    const [loading, setloading] = useState(false)
    const loadingList = new Array(13).fill(null)

    const { fetchAddTocart } = useContext(Context)

    const handleAddToCart = async (e, id) => {
        await Addtocart(e, id)
        fetchAddTocart()
    }

    const fetchData = async () => {
        setloading(true)
        const categoryProduct = await fetchCategoryWiseProduct(category)
        setData(categoryProduct?.data || [])
        setloading(false)
    }

    useEffect(() => {
        fetchData()
    }, [category])

    return (
        <div className='px-4 my-6 mx-16'>
            <h2 className='text-2xl font-semibold'>{heading}</h2>

            <div className="flex my-4 overflow-scroll scrollbarnone">
                {loading ? (
                    loadingList.map((_, index) => (
                        <div key={index} className="w-full mx-3 my-5 flex justify-center bg-slate-100 rounded-lg items-center p-4 animate-pulse">
                            <div className="w-full">
                                <div className="bg-gray-300 h-40 w-[200px] rounded mb-4"></div>
                                <div className="h-4 bg-gray-300 w-full rounded mb-2"></div>
                                <div className="h-4 bg-gray-300 rounded mb-2 w-full"></div>
                                <div className="h-8 bg-gray-300 rounded w-full mt-3"></div>
                            </div>
                        </div>
                    ))
                ) : (
                    data.map((product, index) => (
                        <Link to={"/productdetails/" + product?._id} key={index} className="mx-3 my-5 flex justify-center bg-slate-100 rounded-lg items-center p-4 hover:shadow-lg shadow-black transition-all">
                            <div className="overflow-hidden flex justify-center items-center w-[250px]">
                                <div>
                                    <img
                                        src={product?.productImage[0]}
                                        alt=""
                                        className="object-contain w-full h-full mix-blend-multiply hover:scale-105 transition-all"
                                    />
                                    <div>
                                        <p className='text-xs my-4 text-slate-500 line-clamp-2'>{product?.productName}</p>
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
                                                        <p className='text-green-600 text-xs font-semibold'>
                                                            ({Math.round(((product?.price - product?.sellingPrice) / product?.price) * 100)}% OFF)
                                                        </p>
                                                    </>
                                                )
                                            }
                                        </div>

                                        <div>
                                            <button className='bg-white py-1 px-6 rounded-xl border border-slate-400 my-3 hover:border-yellow-700 hover:text-yellow-700 transition-all w-full group'>
                                                <span className='inline-block text-xs transition-transform group-hover:scale-125' onClick={(e) => handleAddToCart(e, product?._id)}>Add To Cart</span>
                                            </button>
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

export default HorizontalCardProduct

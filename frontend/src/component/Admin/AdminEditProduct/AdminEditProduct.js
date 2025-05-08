import React, { useState } from 'react'
import { IoMdClose } from "react-icons/io";
import { toast } from 'react-toastify'
import Api from '../../../APIs/BackendApi'
import productCategory from '../../../helpers/productCategory';
import { FaCloudUploadAlt } from "react-icons/fa";
import uploadImage from '../../../helpers/uploadImage';
import DisplayImage from '../../displayImage/DisplayImage';
import { MdDelete } from "react-icons/md";

const AdminEditProduct = ({
  onClose,
  data,
  fetchData
}) => {

  const [formData, setFormData] = useState({
    ...data,
    productName: data?.productName,
    brandName: data?.brandName,
    category: data?.category,
    description: data?.description,
    productImage: data?.productImage || [],
    price: data?.price,
    sellingPrice: data?.sellingPrice,
  })

  const [openFullScreenImage, setopenFullScreenImage] = useState(false)
  const [fullScreenImage, setFullScreenImage] = useState('')

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleUploadProduct = async (e) => {
    const file = e.target.files[0]
    const uploadImageCloudinary = await uploadImage(file)

    setFormData((prev) => {
      return {
        ...prev,
        productImage: [...prev.productImage, uploadImageCloudinary.url]
      }
    })

  }

  const handleDeleteProductImage = async (index) => {

    const newProductImage = [...formData.productImage]
    newProductImage.splice(index, 1)

    setFormData((prev) => {
      return {
        ...prev,
        productImage: [...newProductImage]
      }
    })

  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    const response = await fetch(Api.updateproducts.url,{
      method: Api.updateproducts.method,
      headers: {
        "Content-Type":"application/json"
      },
      credentials: "include",
      body : await JSON.stringify(formData)
    })

    const responseData = await response.json()

    if(responseData.success){
      toast.success(responseData?.message)
      onClose()
      fetchData()
    }
    if(responseData.error){
      toast.error(responseData?.message)
    }

  };

  return (
    <div className='fixed w-full h-full bg-slate-200 bg-opacity-50 top-0 bottom-0 left-0 right-0 flex justify-center items-center'>
      <div className='bg-white p-4 rounded-xl w-full max-w-xl h-full max-h-[75%] overflow-hidden'>
        <div className='flex justify-between items-center'>
          <h2 className='font-bold text-lg'>Edit Products</h2>
          <div>
            <button onClick={onClose} className='border-2 border-slate-200 rounded-lg hover:text-yellow-600 hover:border-yellow-600 transition-all p-1'><IoMdClose /></button>
          </div>
        </div>
        <form onSubmit={handleSubmit} className=' mt-5 flex flex-col' encType='multipart/form-data'>
          <div className='overflow-y-scroll max-h-[400px] pr-2 space-y-3'>
            <div>
              <input
                type="text"
                name="productName"
                placeholder="Enter Product Name :- "
                className="w-full border px-4 py-2 rounded"
                value={formData.productName}
                onChange={handleChange}
                required
              />
            </div>

            <div>
              <input
                type="text"
                name="brandName"
                placeholder="Enter Brand Name :- "
                className="w-full border px-4 py-2 rounded"
                value={formData.brandName}
                onChange={handleChange}
                required
              />
            </div>

            <div>
              <select name='category' value={formData.category} onChange={handleChange} className=" w-full border px-4 py-2 rounded">
                <option value={""} disabled>Select category :- </option>
                {
                  productCategory.map((p, index) => {
                    return (
                      <option value={p.value} key={p.value + index} >{p.label}</option>
                    )
                  })
                }
              </select>
            </div>


            <div>
              <textarea
                name="description"
                placeholder="Enter Description :- "
                className="w-full border px-4 py-2 rounded"
                rows={4}
                value={formData.description}
                onChange={handleChange}
                required
              />
            </div>

            <label htmlFor='uploadImage'>
              <div className="w-full border px-4 py-2 rounded bg-slate-200 h-44">
                <label >Product Image :- </label>
                <div className='flex justify-center items-center cursor-pointer'>
                  <div className='flex justify-center items-center flex-col gap-2'>
                    <span className='text-3xl text-slate-600'><FaCloudUploadAlt /></span>
                    <p className='text-xs text-slate-600'>Upload Product Image</p>
                    <input type='file' id='uploadImage' className='hidden' onChange={handleUploadProduct} />
                  </div>
                </div>
              </div>
            </label>
            <div>
              {
                formData?.productImage[0] ? (
                  <div className='flex items-center'>
                    {
                      formData.productImage.map((p, index) => {
                        return (
                          <div className='relative transition-all group' key={p + index}>
                            <img src={p} alt={p} width={80} height={80} className='bg-slate-100 border' onClick={() => {
                              setFullScreenImage(p)
                              setopenFullScreenImage(true)
                            }} />
                            <div className='absolute bottom-0 right-0 p-1 hover:bg-yellow-700 bg-yellow-600 text-white rounded-full group-hover:block hidden transition-all' onClick={(e) => {
                              e.stopPropagation()
                              handleDeleteProductImage(index)
                            }}>
                              <MdDelete />
                            </div>
                          </div>
                        )
                      })
                    }
                  </div>
                ) : (
                  <p>*Please Upload Product Image</p>
                )
              }
            </div>

            <div>
              <input
                type="number"
                name="price"
                placeholder="Original Price"
                className="w-full border px-4 py-2 rounded"
                value={formData.price}
                onChange={handleChange}
                required
              />
            </div>

            <div>
              <input
                type="number"
                name="sellingPrice"
                placeholder="Selling Price"
                className="w-full border px-4 py-2 rounded"
                value={formData.sellingPrice}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          <div className='mt-4'>
            <button
              type="submit"
              className="block mx-auto bg-yellow-600 hover:bg-yellow-700 text-white py-1 px-6 rounded-full transition-all"
            >
              Edi Product
            </button>
          </div>

        </form>
      </div>

      {
        openFullScreenImage && (
          <DisplayImage onClose={() => setopenFullScreenImage(false)} ImgUrl={fullScreenImage} />
        )
      }

    </div>
  )
}

export default AdminEditProduct

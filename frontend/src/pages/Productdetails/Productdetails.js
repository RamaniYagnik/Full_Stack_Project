import { useParams } from 'react-router-dom';
import { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import displayINRcurrency from '../../helpers/DisplayCurrency';
import { LiaAmazonPay } from "react-icons/lia";
import { Truck, RefreshCcw, ShieldCheck, ShoppingCart } from 'lucide-react'; // Icons (use lucide-react or any other icon library)
import Context from '../../context/context';
import Addtocart from '../../helpers/Addtocart';

const ProductDetails = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [mainImage, setMainImage] = useState('');

  const { fetchAddTocart } = useContext(Context)

    const handleAddToCart = async(e,id) => {
        await Addtocart(e,id)
        fetchAddTocart()
    }

  useEffect(() => {
    axios.get(`http://localhost:4000/products/productdetails/${id}`)
      .then(response => {
        setProduct(response.data);
        setMainImage(response.data.productImage[0]);
      })
      .catch(error => console.error('Error fetching product:', error));
  }, [id]);

  if (!product) {
    return (
      <div className="flex items-center justify-center h-64">
        <p className="text-lg font-semibold animate-pulse text-blue-600">Loading product details...</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col lg:flex-row gap-10 p-6 max-w-screen-xl mx-auto">
      
      <div className="flex gap-6 w-full lg:w-1/2 justify-center">
        
        <div className="flex md:flex-col gap-2 overflow-y-auto scrollbarnone max-h-96 pr-1 mt-4">
          {product.productImage.map((img, idx) => (
            <img
              key={idx}
              src={img}
              alt={`thumb-${idx}`}
              onClick={() => setMainImage(img)}
              className="w-16 h-16 object-cover cursor-pointer border border-gray-300 hover:border-black transition-all"
            />
          ))}
        </div>

        
        <div className="border p-2 max-h-[500px]">
          <img src={mainImage} alt={product.productName} className="w-[400px] object-contain" />
        </div>
      </div>

      <div className="lg:w-1/2 flex flex-col justify-center px-4">
        <p className="text-gray-500 font-semibold">{product.brandName}</p>
        <h1 className="text-2xl font-bold mb-2">{product.productName}</h1>
        <p className="text-xl font-semibold text-red-600">{displayINRcurrency(product.sellingPrice)}</p>
        {product.price > product.sellingPrice && (
          <p className="line-through text-gray-500 text-sm mb-4">{displayINRcurrency(product.price)}</p>
        )}
        <p className="mb-6 line-clamp-4">{product.description}</p>

        <div className="flex gap-4 mb-8">
          <button className="bg-yellow-500 text-white px-6 py-2 rounded hover:bg-yellow-600">Buy Now</button>
          <button onClick={(e) => handleAddToCart(e,product?._id)} className="border border-black px-6 py-2 rounded hover:bg-gray-100 flex items-center gap-2">
            <ShoppingCart size={18} /> Add to Cart
          </button>
        </div>

        <div className="grid grid-cols-2 gap-4 text-sm text-gray-700">
          <div className="flex items-center gap-2">
            <ShieldCheck size={20} /> <span>24 Months Warranty</span>
          </div>
          <div className="flex items-center gap-2">
            <Truck size={20} /> <span>Free Shipping</span>
          </div>
          <div className="flex items-center gap-2">
            <RefreshCcw size={20} /> <span>Easy Return</span>
          </div>
          <div className="flex items-center gap-2">
            <LiaAmazonPay size={20}/>
            <span>Pay on Delivery</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;

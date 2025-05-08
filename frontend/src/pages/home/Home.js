import React from 'react'
import CategoryList from '../../component/CategoryList/CategoryList'
import HomeCrousel from './HomeCrousel/HomeCrousel'
import HomeSection from './homesection/HomeSection'
import HorizontalCardProduct from '../../component/HorizontalCardProduct/horizontalCardProduct'
import VerticalCardProduct from '../../component/VerticalProductCard/VerticalProductCard'

const Home = () => {
  return (
    <div className=''>
      <HomeCrousel/>
      <HomeSection/>
      <CategoryList/>
      <HorizontalCardProduct category={'women'} heading={"BestSellers"} />
      <VerticalCardProduct category={'nebula'} heading={"New'arrivlas"} />
    </div>
  )
}

export default Home

import React from 'react'

import { client } from '../lib/client'
import { Products, HeroBanner, FooterBanner } from '../components'

const Home = ({ products, bannerData, category }) => (
  <div>
    <HeroBanner heroBanner={bannerData.length && bannerData[0]} />
    <div className="products-heading">
      <h2>Best Selling Products</h2>
      <p>Speakers of many variations</p>
    </div>
    {/* <FilterButtons category={category} /> */}

    {/* {products?.map((product) => (
        <Product key={product._id} product={product} />
      ))} */}
    <Products products={products} category={category} />

    <FooterBanner footerBanner={bannerData && bannerData[0]} />
  </div>
)
export const getServerSideProps = async () => {
  const query = `*[_type == "product"]`
  const products = await client.fetch(query)

  const bannerQuery = '*[_type == "banner"]'
  const bannerData = await client.fetch(bannerQuery)

  const categoryQuery = '*[_type == "category"]'
  const category = await client.fetch(categoryQuery)

  return {
    props: {
      products,
      bannerData,
      category,
    },
  }
}

export default Home

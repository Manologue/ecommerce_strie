import React, { useEffect, useState } from 'react'
import Link from 'next/link'

import { urlFor } from '../lib/client'
import { useStateContext } from '../context/StateContext'

function Products({ products, category }) {
  const { filterProducts, setFilterProducts } = useStateContext()
  const [activeState, setActiveState] = useState('all')

  let productList = products
  useEffect(() => {
    setFilterProducts(productList)
  }, [productList])

  function handleProducts(e) {
    let type = e.target.value
    if (type !== 'all') {
      console.log(type)
      productList = products.filter((product) => {
        return product.category[0]._ref === type
      })
      setFilterProducts(productList)
    } else {
      setFilterProducts(products)
    }
    // set active btn
    setActiveState(type)
  }
  return (
    <>
      <div className="filter-buttons-container">
        <div className="filter-button-container">
          <button
            type="button"
            className={activeState == 'all' ? 'active' : ''}
            value={'all'}
            onClick={handleProducts}
          >
            all
          </button>
        </div>
        {category &&
          category.map((cat, index) => (
            <div className="filter-button-container" key={index}>
              <button
                type="button"
                className={activeState == cat._id ? 'active' : ''}
                value={cat._id}
                onClick={handleProducts}
              >
                {cat.title}
              </button>
            </div>
          ))}
      </div>

      <div className="products-container">
        {filterProducts &&
          filterProducts.map((product, index) => (
            <div className="product-container" key={index}>
              <Link href={`/product/${product.slug.current}`}>
                <div className="product-card">
                  <img
                    src={urlFor(product.image && product.image[0])}
                    width={250}
                    height={250}
                    className="product-image"
                  />
                  <p className="product-name">{product.name}</p>
                  <p className="product-price">${product.price}</p>
                </div>
              </Link>
            </div>
          ))}
      </div>
    </>
  )
}

export default Products

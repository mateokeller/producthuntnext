import React, { useEffect, useState, useContext } from "react";
import Layout from "../components/layout/Layout";
import ProductDetail from "../components/layout/ProductDetail";

import useProducts from "../hooks/useProducts";

const Populars = () => {
  const { products } = useProducts("votes");

  return (
    <div>
      <Layout>
        <div className="product-list">
          <div className="products-container">
            {products.length === 0 ? (
              <h1 className="title">No se encuentran productos actualmente.</h1>
            ) : (
              <>
                <ul className="bg-white">
                  {products.map((product, id) => (
                    <ProductDetail key={product.id} product={product} />
                  ))}
                </ul>
              </>
            )}
          </div>
        </div>
      </Layout>
    </div>
  );
};

export default Populars;

/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState, useContext } from "react";
import Layout from "../components/layout/Layout";
import ProductDetail from "../components/layout/ProductDetail";

import { FirebaseContext } from "../firebase";
import { collection, onSnapshot } from "firebase/firestore";
import useProducts from "../hooks/useProducts";

const Home = () => {
  const { products } = useProducts("created");

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

export default Home;

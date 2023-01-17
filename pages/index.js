/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState, useContext } from "react";
import Layout from "../components/layout/Layout";
import ProductDetail from "../components/layout/ProductDetail";

import { FirebaseContext } from "../firebase";
import { collection, onSnapshot } from "firebase/firestore";

const Home = () => {
  const [products, setProducts] = useState([]);

  const { firebase } = useContext(FirebaseContext);

  useEffect(() => {
    const getProducts = () => {
      const querySnapshot = collection(firebase.db, "products");
      onSnapshot(querySnapshot, ({ docs }) => {
        const newProducts = docs.map((doc) => {
          const data = doc.data();
          const id = doc.id;

          return {
            ...data,
            id,
          };
        });
        setProducts(newProducts);
      });
    };
    getProducts();
  }, []);

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

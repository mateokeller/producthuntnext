import React, { useState, useEffect } from "react";
import Layout from "../components/layout/Layout";
import Router, { useRouter } from "next/router";

import useProducts from "../hooks/useProducts";

import ProductDetail from "../components/layout/ProductDetail";

const Search = () => {
  const router = useRouter();
  const {
    query: { q },
  } = router;

  // All the products
  const { products } = useProducts("created");
  const [result, setResult] = useState([]);

  useEffect(() => {
    const query = q.toLowerCase();

    const filter = products.filter((product) => {
      return (
        product.name.toLowerCase().includes(query) ||
        product.description.toLowerCase().includes(query) ||
        product.creator.name.toLowerCase().includes(query)
      );
    });

    setResult(filter);
  }, [q, products]);

  return (
    <div>
      <Layout>
        <div className="products-list ">
          <div className="container">
            <ul className="bg-white">
              {result.map((product) => (
                <ProductDetail key={product.id} product={product} />
              ))}
            </ul>
          </div>
        </div>
      </Layout>
    </div>
  );
};

export default Search;

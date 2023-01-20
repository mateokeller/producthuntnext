/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState, useContext } from "react";

import { FirebaseContext } from "../firebase";
import { collection, onSnapshot, query, orderBy } from "firebase/firestore";

const useProducts = (order) => {
  const [products, setProducts] = useState([]);

  const { firebase } = useContext(FirebaseContext);

  useEffect(() => {
    const getProducts = () => {
      const querySnapshot = query(
        collection(firebase.db, "products"),
        orderBy(order, "desc")
      );

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

  return { products };
};

export default useProducts;

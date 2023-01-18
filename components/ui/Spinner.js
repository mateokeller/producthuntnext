import React from "react";
import Layout from "../layout/Layout";

const Spinner = () => {
  return (
    <Layout>
      <p className="bold text-center">
        Cargando <span className="text-center loader"></span>
      </p>
    </Layout>
  );
};

export default Spinner;

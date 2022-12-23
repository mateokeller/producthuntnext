import Router from "next/router";
import React, { useState } from "react";
import Layout from "../components/layout/Layout";

import firebase from "../firebase";

// validaciones
import useValidation from "../hooks/useValidation";
import validateCreateAccount from "../validation/validateCreateAccount";

const INITIAL_STATE = {
  name: "",
  company: "",
  image: "",
  url: "",
  description: "",
};

const NewProduct = () => {
  const [error, setError] = useState(false);

  const { values, errors, handleChange, handleSubmit, handleBlur } =
    useValidation(INITIAL_STATE, validateCreateAccount, createAccount);

  const { name, company, image, url, description } = values;

  async function createAccount() {}

  return (
    <div>
      <Layout>
        <>
          <h1 className="create-account-title text-center">Nuevo Producto</h1>
          <form onSubmit={handleSubmit} noValidate>
            <fieldset>
              <legend>Informacion General</legend>

              <div className="form-field">
                <label htmlFor="name">Nombre</label>
                <input
                  type="text"
                  id="name"
                  placeholder="Nombre del Producto"
                  name="name"
                  value={name}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
              </div>

              {errors.name ? (
                <div className="error-message text-center">{errors.name}</div>
              ) : null}

              <div className="form-field">
                <label htmlFor="company">Empresa</label>
                <input
                  type="text"
                  id="company"
                  placeholder="Nombre de Empresa o Compañia"
                  name="company"
                  value={company}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
              </div>

              {error.company ? (
                <div className="error-message text-center">{error.company}</div>
              ) : null}

              <div className="form-field">
                <label htmlFor="image">Imagen</label>
                <input
                  type="file"
                  id="image"
                  name="image"
                  value={image}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
              </div>

              {error.image ? (
                <div className="error-message text-center">{error.image}</div>
              ) : null}

              <div className="form-field">
                <label htmlFor="url">URL</label>
                <input
                  type="url"
                  id="url"
                  name="url"
                  value={url}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
              </div>

              {error.url ? (
                <div className="error-message text-center">{error.url}</div>
              ) : null}
            </fieldset>

            <fieldset>
              <legend>Sobre tu Producto</legend>

              <div className="form-field">
                <label htmlFor="description">Descripcion</label>
                <textarea
                  type="description"
                  id="description"
                  name="description"
                  value={description}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
              </div>

              {error.description ? (
                <div className="error-message text-center">
                  {error.description}
                </div>
              ) : null}
            </fieldset>

            {error ? (
              <div className="error-message text-center">{error}</div>
            ) : null}

            <input className="form-btn" type="submit" value="Crear Producto" />
          </form>
        </>
      </Layout>
    </div>
  );
};
export default NewProduct;

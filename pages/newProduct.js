import React, { useState, useContext } from "react";
import Layout from "../components/layout/Layout";
import Router from "next/router";
import Error404 from "../components/layout/Error404";

import { FirebaseContext } from "../firebase";
import { collection, addDoc, doc } from "firebase/firestore";
import { ref, getDownloadURL, uploadBytesResumable } from "@firebase/storage";

// validaciones
import useValidation from "../hooks/useValidation";
import validateCreateProduct from "../validation/validateCreateProduct";

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
    useValidation(INITIAL_STATE, validateCreateProduct, createProduct);

  const { name, company, image, url, description, imageURL } = values;

  // context con las operaciones crud de firebase
  const { user, firebase } = useContext(FirebaseContext);

  // States para la subida de la imagen
  const [uploading, setUploading] = useState(false);
  const [imgURL, setImageURL] = useState("");

  const handleImageUpload = (e) => {
    // Se obtiene referencia de la ubicación donde se guardará la imagen
    const file = e.target.files[0];
    const randomId = doc(collection(firebase.db, "temp")).id;
    const imageRef = ref(firebase.storage, `/posts ${(file.name, randomId)}`);

    // Se inicia la subida
    setUploading(true);
    const uploadTask = uploadBytesResumable(imageRef, file);

    // Registra eventos para cuando detecte un cambio en el estado de la subida
    uploadTask.on(
      "state_changed",
      // Muestra progreso de la subida
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log(`Uploading Imagen: ${progress}% done`);
      },
      // En caso de error
      (error) => {
        setUploading(false);
        console.error(error);
      },
      // Subida finalizada correctamente
      () => {
        setUploading(false);
        getDownloadURL(uploadTask.snapshot.ref).then((imgURL) => {
          console.log("Image available at:", imgURL);
          setImageURL(imgURL);
        });
      }
    );
  };

  async function createProduct() {
    //si el usuario no esta autenticado llevar al login
    if (!user) {
      return Router.push("/");
    }

    // crear el objeto de nuevo producto
    const product = {
      name,
      company,
      url,
      imageURL: imgURL,
      description,
      votes: 0,
      comments: [],
      created: Date.now(),
      creator: {
        id: user.uid,
        name: user.displayName,
      },
      hasVoted: [],
    };

    // insertarlo en la base de datos
    try {
      await addDoc(collection(firebase.db, "products"), product);
    } catch (error) {
      console.error(error);
    }

    return Router.push("/");
  }

  return (
    <div>
      <Layout>
        {!user ? (
          <Error404 />
        ) : (
          <>
            <h1 className="create-account-title text-center">Nuevo Producto</h1>
            <form className="form-center" onSubmit={handleSubmit} noValidate>
              <fieldset>
                <legend>Informacion general</legend>
                <div className="form-field">
                  <label htmlFor="name">Nombre</label>
                  <input
                    type="text"
                    id="name"
                    placeholder="Tu nombre"
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
                    placeholder="Nombre empresa o compañía"
                    name="company"
                    value={company}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                </div>
                {errors.company ? (
                  <div className="error-message text-center">
                    {errors.company}
                  </div>
                ) : null}

                <div className="form-field">
                  <label htmlFor="image">Imagen</label>
                  <input
                    accept="image/*"
                    type="file"
                    id="image"
                    onChange={handleImageUpload}
                    name="image"
                  />
                </div>
                {/* {errors.image ? (
                <div className="error-message text-center">{errors.image}</div>
              ) : null} */}

                <div className="form-field">
                  <label htmlFor="url">URL</label>
                  <input
                    type="url"
                    id="url"
                    name="url"
                    value={url}
                    placeholder="URL de tu producto"
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                </div>
                {errors.url ? (
                  <div className="error-message text-center">{errors.url}</div>
                ) : null}
              </fieldset>

              <fieldset>
                <legend>Sobre el producto</legend>
                <div className="form-field">
                  <label htmlFor="description">Descripción</label>
                  <textarea
                    id="description"
                    name="description"
                    value={description}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                </div>

                {errors.description ? (
                  <div className="error-message text-center">
                    {errors.description}
                  </div>
                ) : null}
              </fieldset>

              {error ? (
                <div className="error-message text-center">{error}</div>
              ) : null}

              <input
                className="form-btn"
                type="submit"
                value="Crear Producto"
              />
            </form>
          </>
        )}
      </Layout>
    </div>
  );
};

export default NewProduct;

/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable @next/next/no-img-element */
/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useContext, useState } from "react";
import { useRouter } from "next/router";
import { FirebaseContext } from "../../firebase";
import { getDoc, doc } from "firebase/firestore";
import formatDistanceToNow from "date-fns/formatDistanceToNow";
import { es } from "date-fns/locale";

import Layout from "../../components/layout/Layout";
import Error404 from "../../components/layout/404";
import Spinner from "../../components/ui/Spinner";

const Product = () => {
  //state del componente
  const [product, setProduct] = useState({});
  const [error, setError] = useState(false);
  // const [loading, setLoading] = useState(false);
  //Routing para obtener el id actual
  const Router = useRouter();
  const {
    query: { id },
  } = Router;

  console.log(id);

  //Context del firebase
  const { firebase } = useContext(FirebaseContext);

  useEffect(() => {
    if (id) {
      const getProduct = async () => {
        const productQuery = doc(firebase.db, "products", id);
        const product = await getDoc(productQuery);

        if (product.exists()) {
          setProduct(product.data());
        } else {
          setError(true);
        }
      };
      getProduct();
    }
  }, [id]);

  // if (Object.keys(product).length === 0) return <Spinner />;

  const {
    comments,
    created,
    description,
    company,
    name,
    url,
    imageURL,
    votes,
  } = product;

  const onChangeComment = () => {};

  return (
    <Layout>
      {error ? <Error404 /> : null}

      <div id="container">
        <h1 id="product-title"></h1>

        <div id="product-container">
          <div>
            <p>
              Publicado hace{" "}
              {created
                ? formatDistanceToNow(new Date(created), { locale: es })
                : null}
            </p>
            {/* <p>
              By: <strong>{created.name}</strong> of {company}
            </p> */}

            <img src={imageURL} />
            <p>{description}</p>

            <h2>Agrega tu comentario</h2>

            <div className="form-field">
              <label htmlFor="name">Comentario</label>
              <input type="text" name="message" onChange={onChangeComment} />
            </div>

            <input
              className="form-btn"
              type="submit"
              value="Agregar comentario"
            />

            {/* <h2 className="comment-title">Comentarios</h2>
            {comments.map((comment) => {
              <li>
                <p>{comment.name}</p>
                <p>Escrito por: {comment.userName}</p>
              </li>;
            })} */}
          </div>
          <aside>2</aside>
        </div>
      </div>
    </Layout>
  );
};

export default Product;

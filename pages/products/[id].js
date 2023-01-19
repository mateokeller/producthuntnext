/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @next/next/no-img-element */
import { useEffect, useContext, useState } from "react";
import Image from "next/image";
import { useRouter } from "next/router";
import { FirebaseContext } from "../../firebase";
import {
  getDoc,
  doc,
  updateDoc,
  increment,
  setDoc,
  deleteDoc,
} from "firebase/firestore";
import { getStorage, ref, deleteObject } from "firebase/storage";
import formatDistanceToNow from "date-fns/formatDistanceToNow";
import { es } from "date-fns/locale";

import Layout from "../../components/layout/Layout";
import Error404 from "../../components/layout/Error404";
import Spinner from "../../components/ui/Spinner";
import Button from "../../components/ui/Button";

const Product = () => {
  //state del componente
  const [product, setProduct] = useState({});
  const [error, setError] = useState(false);
  const [comment, setComment] = useState({});
  const [consultDB, setConsultDB] = useState(true);

  //Routing para obtener el id actual
  const Router = useRouter();
  const {
    query: { id },
  } = Router;

  //Context del firebase
  const { firebase, user } = useContext(FirebaseContext);

  useEffect(() => {
    if (id && consultDB) {
      const getProduct = async () => {
        const productQuery = doc(firebase.db, "products", id);
        const product = await getDoc(productQuery);

        if (product.exists()) {
          setProduct(product.data());
          setConsultDB(false);
        } else {
          setError(true);
          setConsultDB(false);
        }
      };
      getProduct();
    }
  }, [id]);

  const {
    comments,
    created,
    description,
    company,
    name,
    url,
    imageURL,
    votes,
    creator,
    hasVoted,
  } = product;

  const upvoteProduct = () => {
    if (!user) {
      return router.push("/login"); // Security layer
    }

    // Get and add new vote
    const newTotal = votes + 1;

    // Verify is actual user has voted in this product
    if (hasVoted.includes(user.uid)) return console.log("already voted");

    // Save the id of the user who have voted
    const newHasVoted = [...hasVoted, user.uid];

    // Update db
    const productRef = doc(firebase.db, "products", id);
    setDoc(
      productRef,
      { votes: newTotal, hasVoted: newHasVoted },
      { merge: true }
    );

    // Update state
    setProduct({
      ...product,
      votes: newTotal,
      hasVoted: newHasVoted,
    });

    setConsultDB(true); // When voting, then consult db
  };

  const src = imageURL;

  // Functions to create comments
  const onChangeComment = (e) => {
    setComment({
      ...comment,
      [e.target.name]: e.target.value,
    });
  };

  // Identify if the comment is from the product creator
  const isCreator = (id) => {
    if (creator.id === id) {
      return true;
    }

    return false;
  };

  const addComment = (e) => {
    e.preventDefault();

    if (!user) {
      return router.push("/login"); // Security layer
    }

    // Extra info to comment
    comment.userId = user.uid;
    comment.userName = user.displayName;

    // Get copy of comments and add it to the array
    const newComments = [...comments, comment];

    // Update db
    // const productRef = doc(firebase.db, "products", id);
    setDoc(
      doc(firebase.db, "products", id),
      { comments: newComments },
      { merge: true }
    );

    // Update state
    setProduct({
      ...product,
      comments: newComments,
    });

    setConsultDB(true); // When commenting, then consult db
  };

  // Function that checks if product creator is the same that the actual authenticated user
  const canDelete = () => {
    if (!user) return false;

    if (creator.id === user.uid) {
      return true;
    }
  };

  // Delete a product from database
  const deleteProduct = async () => {
    if (!user) {
      return Router.push("/login"); // Security layer
    }

    if (creator.id !== user.uid) {
      return Router.push("/");
    }

    try {
      // delete product
      await deleteDoc(doc(firebase.db, "products", id));

      // eliminar imagen
      const storage = getStorage();
      const imgRef = ref(storage, imageURL);
      deleteObject(imgRef)
        .then(() => {
          // image deleted correctly
          console.log("product deleted correctly");
          Router.push("/");
        })
        .catch((error) => {
          console.log("Error: ", error);
        });

      Router.push("/");
    } catch (error) {
      console.log("ERROR: ", error);
    }
  };

  if (Object.keys(product).length === 0 && !error) return <Spinner />;

  return (
    <Layout>
      {error ? (
        <Error404 />
      ) : (
        <div id="container">
          <h1 id="product-title">{name}</h1>

          <div id="product-container">
            <div>
              <p>
                Publicado hace{" "}
                {created
                  ? formatDistanceToNow(new Date(created), { locale: es })
                  : null}
              </p>
              {creator ? (
                <p>
                  Publicado por: <strong>{creator.name}</strong> of {company}
                </p>
              ) : null}
              <div></div>
              <div className="product-image-container">
                <Image
                  className="product-image"
                  loader={() => src}
                  src={src}
                  alt="product image"
                  fill
                />
              </div>

              <p>{description}</p>
              {user && (
                <>
                  <h2>Agrega tu comentario</h2>
                  <form className="comment-form" onSubmit={addComment}>
                    <div className="form-field">
                      {/* <label htmlFor="name">Comentario</label> */}
                      <input
                        type="text"
                        name="message"
                        placeholder="Comentario"
                        onChange={onChangeComment}
                      />
                    </div>

                    <input
                      className="form-btn"
                      type="submit"
                      value="Agregar comentario"
                    />
                  </form>
                </>
              )}

              <h2 className="comment-title">Comentarios</h2>

              {comments === undefined ? (
                <p>No comments yet</p>
              ) : (
                <>
                  <ul>
                    {comments.length === 0 ? <p>No comments yet</p> : null}
                  </ul>
                  <ul>
                    {comments.map((comment, i) => (
                      <li
                        className="comment-text"
                        key={`${comment.userId}-${i}`}
                      >
                        <p>{comment.message}</p>
                        <p>
                          Written by:
                          <span className="bold"> {comment.userName}</span>
                        </p>

                        {isCreator(comment.userId) ? (
                          <p className="creator-text">Creado por</p>
                        ) : null}
                      </li>
                    ))}
                  </ul>
                </>
              )}
            </div>
            <aside>
              <a target="_blank" rel="noreferrer" href={url}>
                <Button bgColor="true">Visitar URL</Button>
              </a>
              <div className="votes-container">
                <p className="text-center">{votes} Votos</p>

                {user ? <Button onClick={upvoteProduct}>Votar</Button> : null}
              </div>
            </aside>
          </div>
          {creator === undefined ? null : (
            <>
              {canDelete() ? (
                <Button onClick={deleteProduct}>Delete Product</Button>
              ) : null}
            </>
          )}
        </div>
      )}
    </Layout>
  );
};

export default Product;

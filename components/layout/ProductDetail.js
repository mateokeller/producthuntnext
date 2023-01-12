/* eslint-disable @next/next/no-img-element */
import React from "react";
import formatDistanceToNow from "date-fns/formatDistanceToNow";
import { es } from "date-fns/locale";

const ProductDetail = ({ product }) => {
  console.log(product);

  const {
    id,
    comments,
    created,
    description,
    company,
    name,
    url,
    imageURL,
    votes,
  } = product;

  return (
    <li className="product">
      <div className="product-description">
        <div>
          <img src={imageURL} alt="image" className="product-image" />
        </div>
        <div>
          <h1 className="product-title">{name}</h1>
          <p className="text-description">{description}</p>
          <div className="product-comments">
            <div>
              <img
                src="/static/image/coment-icon.png"
                alt="comment icon"
                className="comment-icon"
              />
              <p>{comments.length} Comentarios</p>
            </div>
          </div>

          <p>
            Publicado hace{" "}
            {formatDistanceToNow(new Date(created), { locale: es })}
          </p>
        </div>
      </div>
      <div className="product-votes">
        <div>&#9650;</div>
        <p>{votes}</p>
      </div>
    </li>
  );
};

export default ProductDetail;

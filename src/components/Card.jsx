import React from "react";

// Card component
export const Card = ({ title, imageUrl, description, link }) => {
  return (
    <div className="card">
      <div className="card__image">
        <a href={link}>
          <img src={imageUrl} alt={title} border="0" />
        </a>
      </div>
      <div className="card__content">
        <p className="card__title">{title}</p>
        <p className="card__text">{description}</p>
      </div>
    </div>
  );
};

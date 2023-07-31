import React from "react";

const CustomerCard = ({ imageUrl, name, review }) => {
  return (
    <div className="customer-card">
      <img src={imageUrl} alt="" className="customer-img" />
      <h1 className="customer-h1">{name}</h1>
      <p className="customer-p">{review}</p>
    </div>
  );
};

const CustomerReview = () => {
  return (
    <div className="customer-review">
      <div className="review-heading">
        <h1>Customer Review</h1>
      </div>
      <div id="mainbox-customer">
        <CustomerCard
          imageUrl="http://media.npr.org/assets/news/2009/10/27/facebook1_sq-17f6f5e06d5742d8c53576f7c13d5cf7158202a9.jpg?s=16"
          name="Sachin Tendulkar"
          review="From the restored 540 K Streamliner to the all-new S65 AMG Coupe to the Concept Coupe SUV, last weekend in Monterey was a celebration of the Mercedes-Benz coupe."
        />
        <CustomerCard
          imageUrl="http://media.npr.org/assets/news/2009/10/27/facebook1_sq-17f6f5e06d5742d8c53576f7c13d5cf7158202a9.jpg?s=16"
          name="Rohit Sharma"
          review="From the restored 540 K Streamliner to the all-new S65 AMG Coupe to the Concept Coupe SUV, last weekend in Monterey was a celebration of the Mercedes-Benz coupe."
        />
        <CustomerCard
          imageUrl="http://media.npr.org/assets/news/2009/10/27/facebook1_sq-17f6f5e06d5742d8c53576f7c13d5cf7158202a9.jpg?s=16"
          name="Virat Kohli"
          review="From the restored 540 K Streamliner to the all-new S65 AMG Coupe to the Concept Coupe SUV, last weekend in Monterey was a celebration of the Mercedes-Benz coupe."
        />
        <CustomerCard
          imageUrl="http://media.npr.org/assets/news/2009/10/27/facebook1_sq-17f6f5e06d5742d8c53576f7c13d5cf7158202a9.jpg?s=16"
          name="Ms Dhoni"
          review="From the restored 540 K Streamliner to the all-new S65 AMG Coupe to the Concept Coupe SUV, last weekend in Monterey was a celebration of the Mercedes-Benz coupe."
        />
      </div>
    </div>
  );
};

export default CustomerReview;

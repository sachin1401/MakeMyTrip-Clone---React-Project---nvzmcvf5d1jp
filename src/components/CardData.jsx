import React from "react";
import { Card } from "./Card";

const TravelCard = () => {
  return (
    <div className="travel-card">
      <div className="seven">
        <h1>Handpicked Collections for You</h1>
      </div>
      <div className="all-cards">
        <Card
          title="Delhi"
          imageUrl="https://i.ibb.co/z4Jq1Bf/wallpaperflare-com-wallpaper-6.jpg"
          description="Delhi is officially the National Capital Territory. It is a 1000-year-old structure."
          link="https://ibb.co/NyScXJY"
        />
        <Card
          title="Mumbai"
          imageUrl="https://i.ibb.co/HzJHnyH/wallpaperflare-com-wallpaper-7.jpg"
          description="All they know is that you’re trying to get the city of gold, and that’s enough. Mumbai is not just a city. It’s life."
          link="https://ibb.co/zRk4Gg4"
        />
        <Card
          title="Goa"
          imageUrl="https://i.ibb.co/p3p7q14/wallpaperflare-com-wallpaper-8.jpg"
          description="Goa is one of the famous tourist destinations of India. The beach here is quite beautiful and attractive."
          link="https://ibb.co/K9HPn5V"
        />
        <Card
          title="Kolkata"
          imageUrl="https://i.ibb.co/6ZMsz9q/wallpaperflare-com-wallpaper-9.jpg"
          description="Kolkata is famous Indian city in West Bengal. Howrah Railway Station is the biggest railway station in Kolkata."
          link="https://ibb.co/dcTKFCH"
        />
      </div>
      <div className="all-cards">
        <Card
          title="Bangalore"
          imageUrl="https://i.ibb.co/j8ZxSZQ/wallpaperflare-com-wallpaper-12.jpg"
          description="In Karnataka state, Bangalore is a famous tourist place. Tipu Sultan’s Palace is popular historical place in Bangalore. "
          link="https://ibb.co/wdrbfrP"
        />
        <Card
          title="Chennai"
          imageUrl="https://i.ibb.co/5K7y5Sv/wallpaperflare-com-wallpaper-13.jpg"
          description="Chennai is also known as ‘Detroit of Asia’. Oldest historical places in Chennai are Government Museum, Fort St George etc."
          link="https://ibb.co/VwKZvzD"
        />
        <Card
          title="Hyderabad"
          imageUrl="https://i.ibb.co/wdwYrPk/wallpaperflare-com-wallpaper-14.jpg"
          description="Hyderabad city is also famous as the city of pearls. Best tourism places in Hyderabad city are Golconda Fort, Charminar etc."
          link="https://ibb.co/RgB74sF"
        />
        <Card
          title="Chhattisgarh"
          imageUrl="https://i.ibb.co/C72c901/1493894496-AD007-small-JPG.jpg"
          description="Chhattisgarh was founded on 1st November 2000. It is a heavily forested state. Chhattisgarh is in the central part of India."
          link="https://ibb.co/d2gTpKW"
        />
      </div>
    </div>
  );
};

export default TravelCard;

import TravelCard from "../components/CardData";
import CustomerReview from "../components/CustomerReview";
import ImageSlider from "../components/ImageSlider";
import WebsiteUser from "../components/WebsiteUserDetails";
import HomeTable from "../components/HomeTable";
import Footer from "./Footer";
import "../styles/homePage.css";

export const Home = () => {
  // const navigate = useNavigate();
  return (
    <>
      {/* image slider */}
      <ImageSlider />

      {/* tarvel card - visit */}
      <TravelCard />

      {/* reviews customer */}
      <CustomerReview />

      {/* details about website provide to user */}
      <WebsiteUser />
      {/* home table */}
      <HomeTable />

      {/* footer */}
      <Footer />
    </>
  );
};

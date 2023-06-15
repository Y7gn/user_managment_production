import main from "../assets/images/main-alternative.svg";
import Wrapper from "../assets/wrappers/LandingPage";
// import { Logo } from '../components';
import { Link, Navigate } from "react-router-dom";
import React from "react";
import { useAppContext } from "../context/appContext";

const Landing = () => {
  const { user } = useAppContext();
  return (
    <React.Fragment>
      {user && <Navigate to="/" />}
      <Wrapper>
        <nav>{/* <Logo/> */}</nav>
        <div className="container page">
          {/* info */}
          <div className="info">
            <h1>
              موقع <span>التحكم</span> بالمستخدمين
            </h1>
            <p>موقع خدمة العملاء يتيح للموظفين التحكم الكامل بالعملاء.</p>
            <Link to="/register" className="btn btn-hero">
              تسجيل الدخول
            </Link>
          </div>

          <img src={main} alt="job hunt" className="img main-img" />
        </div>
      </Wrapper>
    </React.Fragment>
  );
};
export default Landing;

// rafce component

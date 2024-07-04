import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Home: React.FC = () => {
  const navigate = useNavigate();
  useEffect(() => {
    if (!(localStorage.getItem("name") && localStorage.getItem("pass"))) {
      navigate("/login");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return <div>Home</div>;
};

export default Home;

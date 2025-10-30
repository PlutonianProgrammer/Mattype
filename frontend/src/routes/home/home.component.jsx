import { Link } from "react-router-dom";

import "./home.styles.scss";
const Home = () => {
  return (
    <div className='home-container'>
      <div className='main-image' />
      <div className='main-link'>
        <Link to='/play'>Play Now</Link>
      </div>
    </div>
  );
};

export default Home;

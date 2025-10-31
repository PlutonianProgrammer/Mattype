import PodiumPiece from "../../components/podium-piece/podium-piece.component";

import "./about.styles.scss";

const About = () => {
  return (
    <div className='about-container'>
      <PodiumPiece name='Albert' medalType='gold' />
      <PodiumPiece name='Bob' medalType='silver' />
      <PodiumPiece name='Carlos' medalType='bronze' />
    </div>
  );
};

export default About;

import PodiumPiece from "../podium-piece/podium-piece.component";

import "./podium.styles.scss";
const Podium = ({ firstPlace, secondPlace, thirdPlace }) => {
  return (
    <div className='podium-container'>
      {secondPlace && <PodiumPiece name={secondPlace.username} placement='2' />}
      {firstPlace && <PodiumPiece name={firstPlace.username} placement='1' />}
      {thirdPlace && <PodiumPiece name={thirdPlace.username} placement='3' />}
    </div>
  );
};

export default Podium;

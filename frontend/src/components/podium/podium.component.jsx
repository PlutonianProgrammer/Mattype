import PodiumPiece from "../podium-piece/podium-piece.component";

import "./podium.styles.scss";
const Podium = ({ firstPlace, secondPlace, thirdPlace }) => {
  return (
    <div className='podium-container'>
      {secondPlace && <PodiumPiece user={secondPlace} placement='2' />}
      {firstPlace && <PodiumPiece user={firstPlace} placement='1' />}
      {thirdPlace && <PodiumPiece user={thirdPlace} placement='3' />}
    </div>
  );
};

export default Podium;

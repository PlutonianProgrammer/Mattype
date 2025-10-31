import PodiumPiece from "../podium-piece/podium-piece.component";

import "./podium.styles.scss";
const Podium = ({ firstPlace, secondPlace, thirdPlace }) => {
  return (
    <div className='podium-container'>
      {secondPlace ? (
        <PodiumPiece
          name={secondPlace.name}
          placement={secondPlace.placement}
        />
      ) : (
        " "
      )}
      {firstPlace ? (
        <PodiumPiece name={firstPlace.name} placement={firstPlace.placement} />
      ) : (
        " "
      )}
      {thirdPlace ? (
        <PodiumPiece name={thirdPlace.name} placement={thirdPlace.placement} />
      ) : (
        " "
      )}
    </div>
  );
};

export default Podium;

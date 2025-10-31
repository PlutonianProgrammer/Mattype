import "./podium-piece.styles.scss";
const PLACEMENT_TO_HEIGHT = {
  1: 50,
  2: 37,
  3: 25,
};
const PLACEMENT_TO_MEDAL_COLOR = {
  1: "gold",
  2: "silver",
  3: "brown",
};
const PodiumPiece = ({ name, placement }) => {
  return (
    <div className='podium-piece-container'>
      <div
        className='medal'
        style={{ backgroundColor: `${PLACEMENT_TO_MEDAL_COLOR[placement]}` }}
      ></div>
      <div
        className='podium-tower'
        style={{ height: `${PLACEMENT_TO_HEIGHT[placement]}%` }}
      >
        <h3 style={{ color: `${PLACEMENT_TO_MEDAL_COLOR[placement]}` }}>
          {name}
        </h3>
      </div>
    </div>
  );
};
export default PodiumPiece;

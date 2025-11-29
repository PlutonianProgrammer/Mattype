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
const PodiumPiece = ({ user, placement }) => {
  console.log("USER", user);
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
          {user.username}
        </h3>
        <p style={{ color: `${PLACEMENT_TO_MEDAL_COLOR[placement]}` }}>
          {(user.best_wpm || user.avg_wpm).toFixed(2)} WPM
        </p>
      </div>
    </div>
  );
};
export default PodiumPiece;

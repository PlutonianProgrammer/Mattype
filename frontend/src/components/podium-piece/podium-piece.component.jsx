import "./podium-piece.styles.scss";

const PodiumPiece = (props) => {
  const { name, medalType } = props;
  return (
    <div className='podium-piece-container'>
      <div className={`medal ${medalType}`}></div>
      <h3>{name}</h3>
    </div>
  );
};
export default PodiumPiece;

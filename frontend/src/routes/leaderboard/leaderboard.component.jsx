import "./leaderboard.styles.scss";

const Leaderboard = () => {
  return (
    <div className='leaderboard-container'>
      <div className='left-side'>
        <h2>Your Placement:</h2>
        <p>1st</p>
      </div>

      <div className='right-side'>
        <div id='second-place' className='podium'></div>
        <div id='first-place' className='podium'></div>
        <div id='third-place' className='podium'></div>
      </div>
    </div>
  );
};

export default Leaderboard;

import "./bubble-div.styles.scss";
const BubbleDiv = ({ id, children }) => {
  return (
    <div id={id} className='bubble-div'>
      {children}
    </div>
  );
};

export default BubbleDiv;

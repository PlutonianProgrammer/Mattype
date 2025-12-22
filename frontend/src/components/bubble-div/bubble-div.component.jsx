import "./bubble-div.styles.scss";
const BubbleDiv = ({ id, className, onClick, children }) => {
  return (
    <div id={id} onClick={onClick} className={`bubble-div ${className}`}>
      {children}
    </div>
  );
};

export default BubbleDiv;

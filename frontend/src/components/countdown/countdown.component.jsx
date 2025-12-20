import { useContext, useEffect } from "react";
import { PlayContext } from "../../contexts/PlayContext";
import BubbleDiv from "../bubble-div/bubble-div.component";
import "./countdown.styles.scss";
const CountDown = () => {
  const { countDown, countDownVar, setParagraph } = useContext(PlayContext);
  useEffect(() => {
    countDown(3);
  }, []);

  useEffect(() => {
    const getWiki = async () => {
      const title = "soccer";
      const response = await fetch(
        `https://en.wikipedia.org/w/api.php?action=query&prop=extracts&exintro&explaintext&titles=Computer_keyboard&format=json&origin=*`
      );
      console.log("RES:", response);
      const data = await response.json();
      console.log("DATA:", data);
      const pages = data.query.pages;
      const pageID = Object.keys(pages)[0];
      const extract = pages[pageID].extract;

      const introParagraph = extract.split("\n")[0];
      setParagraph(introParagraph);
    };
    getWiki();
  }, []);
  return (
    <div className='count-down-container'>
      <BubbleDiv>
        <h1>{countDownVar}</h1>
      </BubbleDiv>
    </div>
  );
};

export default CountDown;

import { useContext, useEffect } from "react";
import { PlayContext } from "../../contexts/PlayContext";
import BubbleDiv from "../bubble-div/bubble-div.component";
import "./countdown.styles.scss";
const CountDown = () => {
  const { countDown, countDownVar, setParagraph, setLink } =
    useContext(PlayContext);

  useEffect(() => {
    countDown(3);
  }, []);

  useEffect(() => {
    // Fetching paragraph from Wikipedia, by CC BY-SA 4.0
    const getWiki = async () => {
      const isEnglish = (text) => /^[A-Za-z]+$/.test(text);

      let paragraph = "";
      let i = 0;
      while (paragraph.length < 300 && !isEnglish(paragraph)) {
        console.log(i);
        const response = await fetch(
          "https://en.wikipedia.org/api/rest_v1/page/random/summary",
          { headers: { Accept: "application/json" } }
        );
        const data = await response.json();
        paragraph = data.extract;
        setLink(data.content_urls.desktop.page);
      }
      setParagraph(paragraph);
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

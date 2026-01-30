import { useContext, useEffect, useState } from "react";
import { PlayContext } from "../../contexts/PlayContext";
import BubbleDiv from "../bubble-div/bubble-div.component";
import "./countdown.styles.scss";
const CountDown = () => {
  const { setParagraph, setLink, setPhase } = useContext(PlayContext);

  // COUNTDOWN:
  const [countDownVar, setCountDownVar] = useState(100);
  const countDown = async (startNum) => {
    const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
    while (startNum > 0) {
      setCountDownVar(startNum);
      startNum -= 1;
      await delay(1000);
    }
    setCountDownVar(0);
    setPhase(3);
  };

  useEffect(() => {
    countDown(3);
  }, []);

  useEffect(() => {
    // Fetching paragraph from Wikipedia, by CC BY-SA 4.0
    const getWiki = async () => {
      const isEnglish = (str) => /^[A-Za-z0-9 .,!?'"\-:;()]*$/.test(str);

      let paragraph = "";
      let i = 1;
      while ((paragraph.length < 300 || !isEnglish(paragraph)) && i < 10) {
        console.log("FETCH #", i, "LENGTH:", paragraph.length);
        const response = await fetch(
          "https://en.wikipedia.org/api/rest_v1/page/random/summary",
          { headers: { Accept: "application/json" } },
        );
        const data = await response.json();
        paragraph = data.extract;
        console.log(paragraph);
        setLink(data.content_urls.desktop.page);
        i++;
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

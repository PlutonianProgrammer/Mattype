import { useContext, useState, useEffect, useRef } from "react";
import { AuthContext } from "../../contexts/AuthContext";

import "./heatmap.styles.scss";
import BubbleDiv from "../../components/bubble-div/bubble-div.component";

const HeatMap = () => {
  const { helperFetch } = useContext(AuthContext);
  const [tenLast, setTenLast] = useState(null);
  const [lifetime, setLifetime] = useState(null);
  const displayingLifetime = useRef(false);
  const isDisplayingInProportion = useRef(true);

  const colorKeyboard = (
    tenMistakes,
    tenWordCount,
    lifetimeMistakes,
    lifetimeWordCount
  ) => {
    const getWorstRatio = (mistakes, wordCount) => {
      let currentWorstRatio = 0;
      for (const key of Object.keys(mistakes)) {
        if (wordCount[key] != 0) {
          if (mistakes[key] / wordCount[key] > currentWorstRatio) {
            currentWorstRatio = mistakes[key] / wordCount[key];
          }
        }
      }
      return currentWorstRatio != 0 ? currentWorstRatio : 1;
    };

    const replacePrefix = (divClass, toPrepend) =>
      toPrepend + " " + divClass.slice(divClass.indexOf(" ") + 1);

    const [mistakes, wordCount] = displayingLifetime.current
      ? [lifetimeMistakes, lifetimeWordCount]
      : [tenMistakes, tenWordCount];

    const multiplier = isDisplayingInProportion.current
      ? getWorstRatio(mistakes, wordCount)
      : 1;

    for (const key of Object.keys(mistakes)) {
      const div = document.getElementById(key);
      if (wordCount[key] == 0) {
        div.className = replacePrefix(div.className, "none");
      } else if (mistakes[key] / wordCount[key] == 0) {
        div.className = replacePrefix(div.className, "perfect");
      } else if (mistakes[key] / wordCount[key] <= 0.25 * multiplier) {
        div.className = replacePrefix(div.className, "best-quarter");
      } else if (mistakes[key] / wordCount[key] <= 0.5 * multiplier) {
        div.className = replacePrefix(div.className, "better-quarter");
      } else if (mistakes[key] / wordCount[key] <= 0.75 * multiplier) {
        div.className = replacePrefix(div.className, "worst-half");
      } else {
        console.log(typeof mistakes[key], typeof wordCount[key]);
        console.log(wordCount[key]);
        div.className = replacePrefix(div.className, "worst-quarter");
      }
    }
  };

  useEffect(() => {
    const getAndSetHeatmaps = async () => {
      const response = await helperFetch(
        "http://localhost:8000/userauth/get-user-heatmaps/",
        "GET",
        null
      );
      const data = await response.json();
      console.log(data);
      const lastTenTestsMistakes = data.last_ten_tests_mistakes;
      const lastTenTestsWordCount = data.last_ten_tests_word_count;
      const lifetimeMistakes = data.lifetime_mistakes;
      const lifetimeWordCount = data.lifetime_word_count;
      colorKeyboard(
        lastTenTestsMistakes,
        lastTenTestsWordCount,
        lifetimeMistakes,
        lifetimeWordCount
      );
    };
    getAndSetHeatmaps();
  }, []);

  return (
    <div className='heatmap-container'>
      <h1>Heatmap</h1>
      <p>Heatmap Displaying Mistakes Made While Typing</p>
      <div className='button-container'>
        <BubbleDiv>Displaying From Past 10 Tests</BubbleDiv>
      </div>
      <div className='keyboard-container'>
        <div className='row 1'>
          <div id='~' className='none key double'>
            <p>`</p>
            <p>~</p>
          </div>
          <div id='1' className='none key double'>
            <p>1</p>
            <p>!</p>
          </div>
          <div id='2' className='none key double'>
            <p>2</p>
            <p>@</p>
          </div>
          <div id='3' className='none key double'>
            <p>3</p>
            <p>#</p>
          </div>
          <div id='4' className='none key double'>
            <p>4</p>
            <p>$</p>
          </div>
          <div id='5' className='none key double'>
            <p>5</p>
            <p>%</p>
          </div>
          <div id='6' className='none key double'>
            <p>6</p>
            <p>^</p>
          </div>
          <div id='7' className='none key double'>
            <p>7</p>
            <p>&</p>
          </div>
          <div id='8' className='none key double'>
            <p>8</p>
            <p>*</p>
          </div>
          <div id='9' className='none key double'>
            <p>9</p>
            <p>(</p>
          </div>
          <div id='0' className='none key double'>
            <p>0</p>
            <p>)</p>
          </div>
          <div id='-' className='none key double'>
            <p>-</p>
            <p>_</p>
          </div>
          <div id='=' className='none key double'>
            <p>=</p>
            <p>+</p>
          </div>
        </div>
        <div className='row 2'>
          <div id='q' className='none key'>
            q
          </div>
          <div id='w' className='none key'>
            w
          </div>
          <div id='e' className='none key'>
            e
          </div>
          <div id='r' className='none key'>
            r
          </div>
          <div id='t' className='none key'>
            t
          </div>
          <div id='y' className='none key'>
            y
          </div>
          <div id='u' className='none key'>
            u
          </div>
          <div id='i' className='none key'>
            i
          </div>
          <div id='o' className='none key'>
            o
          </div>
          <div id='p' className='none key'>
            p
          </div>
          <div id='[' className='none key double'>
            <p>[</p>
            <p>{`${"{"}`}</p>
          </div>
          <div id=']' className='none key double'>
            <p>]</p>
            <p>{`${"}"}`}</p>
          </div>
          <div id='|' className='none key double'>
            <p>\</p>
            <p>|</p>
          </div>
        </div>
        <div className='row 3'>
          <div id='a' className='none key'>
            a
          </div>
          <div id='s' className='none key'>
            s
          </div>
          <div id='d' className='none key'>
            d
          </div>
          <div id='f' className='none key'>
            f
          </div>
          <div id='g' className='none key'>
            g
          </div>
          <div id='h' className='none key'>
            h
          </div>
          <div id='j' className='none key'>
            j
          </div>
          <div id='k' className='none key'>
            k
          </div>
          <div id='l' className='none key'>
            l
          </div>
          <div id=';' className='none key double'>
            <p>;</p>
            <p>:</p>
          </div>
          <div id='"' className='none key double'>
            <p>'</p>
            <p>"</p>
          </div>
        </div>
        <div className='row 4'>
          <div id='z' className='none key'>
            z
          </div>
          <div id='x' className='none key'>
            x
          </div>
          <div id='c' className='none key'>
            c
          </div>
          <div id='v' className='none key'>
            v
          </div>
          <div id='b' className='none key'>
            b
          </div>
          <div id='n' className='none key'>
            n
          </div>
          <div id='m' className='none key'>
            m
          </div>
          <div id=',' className='none key double'>
            <p>,</p>
            <p>{`${"<"}`}</p>
          </div>
          <div id='.' className='none key double'>
            <p>.</p>
            <p>{`${">"}`}</p>
          </div>
          <div id='/' className='none key double'>
            <p>/</p>
            <p>?</p>
          </div>
        </div>
        <div className='row 5'>
          <div id='space' className='none key'></div>
        </div>
      </div>
    </div>
  );
};

export default HeatMap;

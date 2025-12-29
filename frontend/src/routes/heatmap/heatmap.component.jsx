import { useContext, useState, useEffect, useRef } from "react";
import { AuthContext } from "../../contexts/AuthContext";

import "./heatmap.styles.scss";
import BubbleDiv from "../../components/bubble-div/bubble-div.component";

const HeatMap = () => {
  const { helperFetch } = useContext(AuthContext);
  const [tenLastMistakes, setTenLastMistakes] = useState(null);
  const [tenLastWordCount, setTenLastWordCount] = useState(null);
  const [lifetimeMistakes, setLifetimeMistakes] = useState(null);
  const [lifetimeWordCount, setLifetimeWordCount] = useState(null);
  const [displayingLifetime, setDisplayingLifetime] = useState(false);
  const [displayingProportion, setDisplayingProportion] = useState(true);

  const colorKeyboard = (
    tenMistakes,
    tenWordCount,
    lifetimeMistakes,
    lifetimeWordCount,
    displayingLifetime,
    displayingProportion
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

    const [mistakes, wordCount] = displayingLifetime
      ? [lifetimeMistakes, lifetimeWordCount]
      : [tenMistakes, tenWordCount];

    // console.log("10 Mist:", mistakes);

    const multiplier = displayingProportion
      ? getWorstRatio(mistakes, wordCount)
      : 1;

    // console.log(mistakes);
    for (const key of Object.keys(mistakes)) {
      // console.log(key);
      const div = document.getElementById(key);
      if (wordCount[key] == 0) {
        div.className = replacePrefix(div.className, "none");
      } else if (mistakes[key] / wordCount[key] == 0) {
        div.className = replacePrefix(div.className, "perfect");
      } else if (mistakes[key] / wordCount[key] <= 0.25 * multiplier) {
        div.className = replacePrefix(div.className, "best-quarter");
      } else if (mistakes[key] / wordCount[key] <= 0.5 * multiplier) {
        div.className = replacePrefix(div.className, "best-half");
      } else if (mistakes[key] / wordCount[key] <= 0.75 * multiplier) {
        div.className = replacePrefix(div.className, "worst-half");
      } else {
        console.log(mistakes);
        console.log(typeof mistakes[key], typeof wordCount[key]);
        console.log(wordCount[key]);
        div.className = replacePrefix(div.className, "worst-quarter");
      }
    }
  };

  const holdKeyChars = useRef(null);
  const holdKeyClass = useRef(null);

  const handleMouseEnter = (e) => {
    const div = e.currentTarget;

    holdKeyChars.current = div.innerHTML;
    holdKeyClass.current = div.className;

    const [mistakes, wordCount] = displayingLifetime
      ? [lifetimeMistakes, lifetimeWordCount]
      : [tenLastMistakes, tenLastWordCount];
    const id = div.id;

    div.className = "hovered " + div.className;

    div.innerHTML = `<p>${wordCount[id] - mistakes[id]} / ${wordCount[id]}</p>`;
    if (wordCount[id] != 0) {
      div.innerHTML += `<p>${
        ((wordCount[id] - mistakes[id]) / wordCount[id]).toFixed(2) * 100
      }%</p>`;
    }
  };
  const handleMouseLeave = (e) => {
    const div = e.currentTarget;

    div.innerHTML = holdKeyChars.current;
    div.className = holdKeyClass.current;
  };

  useEffect(() => {
    const getAndSetHeatmaps = async () => {
      const response = await helperFetch(
        "http://localhost:8000/userauth/get-user-heatmaps/",
        "GET",
        null
      );
      const data = await response.json();
      const lastTenTestsMistakes = data.last_ten_tests_mistakes;
      setTenLastMistakes(lastTenTestsMistakes);
      const lastTenTestsWordCount = data.last_ten_tests_word_count;
      setTenLastWordCount(lastTenTestsWordCount);
      const lifetimeMistakes = data.lifetime_mistakes;
      setLifetimeMistakes(lifetimeMistakes);
      const lifetimeWordCount = data.lifetime_word_count;
      setLifetimeWordCount(lifetimeWordCount);

      // console.log("10 MIST:", lastTenTestsMistakes);
      console.log("LIFE MIST:", lifetimeMistakes);
      console.log("LIFE COUNT:", lifetimeWordCount);

      colorKeyboard(
        lastTenTestsMistakes,
        lastTenTestsWordCount,
        lifetimeMistakes,
        lifetimeWordCount,
        false,
        true
      );
    };
    getAndSetHeatmaps();
  }, []);

  return (
    <div className='heatmap-container'>
      <h1>Heatmap</h1>
      <p>Heatmap Displaying Mistakes Made While Typing</p>
      <div className='button-container'>
        <BubbleDiv
          onClick={() => {
            const temp = displayingLifetime;
            setDisplayingLifetime(!displayingLifetime);
            colorKeyboard(
              tenLastMistakes,
              tenLastWordCount,
              lifetimeMistakes,
              lifetimeWordCount,
              !temp,
              displayingProportion
            );
          }}
        >
          {displayingLifetime
            ? "Displaying from Lifetime"
            : "Displaying from Past 10 Tests"}
        </BubbleDiv>
        <BubbleDiv
          onClick={() => {
            const temp = displayingProportion;
            setDisplayingProportion(!displayingProportion);
            colorKeyboard(
              tenLastMistakes,
              tenLastWordCount,
              lifetimeMistakes,
              lifetimeWordCount,
              displayingLifetime,
              !temp
            );
          }}
        >
          {displayingProportion
            ? "Displaying in Proportion"
            : "Displaying in Absolute"}
        </BubbleDiv>
      </div>
      <div className='keyboard-container'>
        <div className='row 1'>
          <div
            id='~'
            className='none key double'
            onPointerEnter={handleMouseEnter}
            onPointerLeave={handleMouseLeave}
          >
            <p>`</p>
            <p>~</p>
          </div>
          <div
            id='1'
            className='none key double'
            onPointerEnter={handleMouseEnter}
            onPointerLeave={handleMouseLeave}
          >
            <p>1</p>
            <p>!</p>
          </div>
          <div
            id='2'
            className='none key double'
            onPointerEnter={handleMouseEnter}
            onPointerLeave={handleMouseLeave}
          >
            <p>2</p>
            <p>@</p>
          </div>
          <div
            id='3'
            className='none key double'
            onPointerEnter={handleMouseEnter}
            onPointerLeave={handleMouseLeave}
          >
            <p>3</p>
            <p>#</p>
          </div>
          <div
            id='4'
            className='none key double'
            onPointerEnter={handleMouseEnter}
            onPointerLeave={handleMouseLeave}
          >
            <p>4</p>
            <p>$</p>
          </div>
          <div
            id='5'
            className='none key double'
            onPointerEnter={handleMouseEnter}
            onPointerLeave={handleMouseLeave}
          >
            <p>5</p>
            <p>%</p>
          </div>
          <div
            id='6'
            className='none key double'
            onPointerEnter={handleMouseEnter}
            onPointerLeave={handleMouseLeave}
          >
            <p>6</p>
            <p>^</p>
          </div>
          <div
            id='7'
            className='none key double'
            onPointerEnter={handleMouseEnter}
            onPointerLeave={handleMouseLeave}
          >
            <p>7</p>
            <p>&</p>
          </div>
          <div
            id='8'
            className='none key double'
            onPointerEnter={handleMouseEnter}
            onPointerLeave={handleMouseLeave}
          >
            <p>8</p>
            <p>*</p>
          </div>
          <div
            id='9'
            className='none key double'
            onPointerEnter={handleMouseEnter}
            onPointerLeave={handleMouseLeave}
          >
            <p>9</p>
            <p>(</p>
          </div>
          <div
            id='0'
            className='none key double'
            onPointerEnter={handleMouseEnter}
            onPointerLeave={handleMouseLeave}
          >
            <p>0</p>
            <p>)</p>
          </div>
          <div
            id='-'
            className='none key double'
            onPointerEnter={handleMouseEnter}
            onPointerLeave={handleMouseLeave}
          >
            <p>-</p>
            <p>_</p>
          </div>
          <div
            id='='
            className='none key double'
            onPointerEnter={handleMouseEnter}
            onPointerLeave={handleMouseLeave}
          >
            <p>=</p>
            <p>+</p>
          </div>
        </div>
        <div className='row 2'>
          <div
            id='q'
            className='none key'
            onPointerEnter={handleMouseEnter}
            onPointerLeave={handleMouseLeave}
          >
            q
          </div>
          <div
            id='w'
            className='none key'
            onPointerEnter={handleMouseEnter}
            onPointerLeave={handleMouseLeave}
          >
            w
          </div>
          <div
            id='e'
            className='none key'
            onPointerEnter={handleMouseEnter}
            onPointerLeave={handleMouseLeave}
          >
            e
          </div>
          <div
            id='r'
            className='none key'
            onPointerEnter={handleMouseEnter}
            onPointerLeave={handleMouseLeave}
          >
            r
          </div>
          <div
            id='t'
            className='none key'
            onPointerEnter={handleMouseEnter}
            onPointerLeave={handleMouseLeave}
          >
            t
          </div>
          <div
            id='y'
            className='none key'
            onPointerEnter={handleMouseEnter}
            onPointerLeave={handleMouseLeave}
          >
            y
          </div>
          <div
            id='u'
            className='none key'
            onPointerEnter={handleMouseEnter}
            onPointerLeave={handleMouseLeave}
          >
            u
          </div>
          <div
            id='i'
            className='none key'
            onPointerEnter={handleMouseEnter}
            onPointerLeave={handleMouseLeave}
          >
            i
          </div>
          <div
            id='o'
            className='none key'
            onPointerEnter={handleMouseEnter}
            onPointerLeave={handleMouseLeave}
          >
            o
          </div>
          <div
            id='p'
            className='none key'
            onPointerEnter={handleMouseEnter}
            onPointerLeave={handleMouseLeave}
          >
            p
          </div>
          <div
            id='['
            className='none key double'
            onPointerEnter={handleMouseEnter}
            onPointerLeave={handleMouseLeave}
          >
            <p>[</p>
            <p>{`${"{"}`}</p>
          </div>
          <div
            id=']'
            className='none key double'
            onPointerEnter={handleMouseEnter}
            onPointerLeave={handleMouseLeave}
          >
            <p>]</p>
            <p>{`${"}"}`}</p>
          </div>
          <div
            id='|'
            className='none key double'
            onPointerEnter={handleMouseEnter}
            onPointerLeave={handleMouseLeave}
          >
            <p>\</p>
            <p>|</p>
          </div>
        </div>
        <div className='row 3'>
          <div
            id='a'
            className='none key'
            onPointerEnter={handleMouseEnter}
            onPointerLeave={handleMouseLeave}
          >
            a
          </div>
          <div
            id='s'
            className='none key'
            onPointerEnter={handleMouseEnter}
            onPointerLeave={handleMouseLeave}
          >
            s
          </div>
          <div
            id='d'
            className='none key'
            onPointerEnter={handleMouseEnter}
            onPointerLeave={handleMouseLeave}
          >
            d
          </div>
          <div
            id='f'
            className='none key'
            onPointerEnter={handleMouseEnter}
            onPointerLeave={handleMouseLeave}
          >
            f
          </div>
          <div
            id='g'
            className='none key'
            onPointerEnter={handleMouseEnter}
            onPointerLeave={handleMouseLeave}
          >
            g
          </div>
          <div
            id='h'
            className='none key'
            onPointerEnter={handleMouseEnter}
            onPointerLeave={handleMouseLeave}
          >
            h
          </div>
          <div
            id='j'
            className='none key'
            onPointerEnter={handleMouseEnter}
            onPointerLeave={handleMouseLeave}
          >
            j
          </div>
          <div
            id='k'
            className='none key'
            onPointerEnter={handleMouseEnter}
            onPointerLeave={handleMouseLeave}
          >
            k
          </div>
          <div
            id='l'
            className='none key'
            onPointerEnter={handleMouseEnter}
            onPointerLeave={handleMouseLeave}
          >
            l
          </div>
          <div
            id=';'
            className='none key double'
            onPointerEnter={handleMouseEnter}
            onPointerLeave={handleMouseLeave}
          >
            <p>;</p>
            <p>:</p>
          </div>
          <div
            id='"'
            className='none key double'
            onPointerEnter={handleMouseEnter}
            onPointerLeave={handleMouseLeave}
          >
            <p>'</p>
            <p>"</p>
          </div>
        </div>
        <div className='row 4'>
          <div
            id='z'
            className='none key'
            onPointerEnter={handleMouseEnter}
            onPointerLeave={handleMouseLeave}
          >
            z
          </div>
          <div
            id='x'
            className='none key'
            onPointerEnter={handleMouseEnter}
            onPointerLeave={handleMouseLeave}
          >
            x
          </div>
          <div
            id='c'
            className='none key'
            onPointerEnter={handleMouseEnter}
            onPointerLeave={handleMouseLeave}
          >
            c
          </div>
          <div
            id='v'
            className='none key'
            onPointerEnter={handleMouseEnter}
            onPointerLeave={handleMouseLeave}
          >
            v
          </div>
          <div
            id='b'
            className='none key'
            onPointerEnter={handleMouseEnter}
            onPointerLeave={handleMouseLeave}
          >
            b
          </div>
          <div
            id='n'
            className='none key'
            onPointerEnter={handleMouseEnter}
            onPointerLeave={handleMouseLeave}
          >
            n
          </div>
          <div
            id='m'
            className='none key'
            onPointerEnter={handleMouseEnter}
            onPointerLeave={handleMouseLeave}
          >
            m
          </div>
          <div
            id=','
            className='none key double'
            onPointerEnter={handleMouseEnter}
            onPointerLeave={handleMouseLeave}
          >
            <p>,</p>
            <p>{`${"<"}`}</p>
          </div>
          <div
            id='.'
            className='none key double'
            onPointerEnter={handleMouseEnter}
            onPointerLeave={handleMouseLeave}
          >
            <p>.</p>
            <p>{`${">"}`}</p>
          </div>
          <div
            id='/'
            className='none key double'
            onPointerEnter={handleMouseEnter}
            onPointerLeave={handleMouseLeave}
          >
            <p>/</p>
            <p>?</p>
          </div>
        </div>
        <div className='row 5'>
          <div
            id='space'
            className='none key'
            onPointerEnter={handleMouseEnter}
            onPointerLeave={handleMouseLeave}
          ></div>
        </div>
      </div>
    </div>
  );
};

export default HeatMap;

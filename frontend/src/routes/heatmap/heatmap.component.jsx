import { useContext } from "react";
import { AuthContext } from "../../contexts/AuthContext";

import "./heatmap.styles.scss";
import BubbleDiv from "../../components/bubble-div/bubble-div.component";

const HeatMap = () => {
  const { helperFetch } = useContext(AuthContext);

  return (
    <div className='heatmap-container'>
      <h1>Heatmap</h1>
      <p>Heatmap Displaying Mistakes Made While Typing</p>
      <div className='button-container'>
        <BubbleDiv>Displaying From Past 10 Tests</BubbleDiv>
      </div>
      <div className='keyboard-container'>
        <div className='row 1'>
          <div id='`' className='key double'>
            <p>`</p>
            <p>~</p>
          </div>
          <div id='1' className='key double'>
            <p>1</p>
            <p>!</p>
          </div>
          <div id='2' className='key double'>
            <p>2</p>
            <p>@</p>
          </div>
          <div id='3' className='key double'>
            <p>3</p>
            <p>#</p>
          </div>
          <div id='4' className='key double'>
            <p>4</p>
            <p>$</p>
          </div>
          <div id='5' className='key double'>
            <p>5</p>
            <p>%</p>
          </div>
          <div id='6' className='key double'>
            <p>6</p>
            <p>^</p>
          </div>
          <div id='7' className='key double'>
            <p>7</p>
            <p>&</p>
          </div>
          <div id='8' className='key double'>
            <p>8</p>
            <p>*</p>
          </div>
          <div id='9' className='key double'>
            <p>9</p>
            <p>(</p>
          </div>
          <div id='0' className='key double'>
            <p>0</p>
            <p>)</p>
          </div>
          <div id='-' className='key double'>
            <p>-</p>
            <p>_</p>
          </div>
          <div id='=' className='key double'>
            <p>=</p>
            <p>+</p>
          </div>
        </div>
        <div className='row 2'>
          <div id='q' className='key'>
            q
          </div>
          <div id='w' className='key'>
            w
          </div>
          <div id='e' className='key'>
            e
          </div>
          <div id='r' className='key'>
            r
          </div>
          <div id='t' className='key'>
            t
          </div>
          <div id='y' className='key'>
            y
          </div>
          <div id='u' className='key'>
            u
          </div>
          <div id='i' className='key'>
            i
          </div>
          <div id='o' className='key'>
            o
          </div>
          <div id='p' className='key'>
            p
          </div>
          <div id='[' className='key double'>
            <p>[</p>
            <p>{`${"{"}`}</p>
          </div>
          <div id=']' className='key double'>
            <p>]</p>
            <p>{`${"}"}`}</p>
          </div>
          <div id='\' className='key double'>
            <p>\</p>
            <p>|</p>
          </div>
        </div>
        <div className='row 3'>
          <div id='a' className='key'>
            a
          </div>
          <div id='s' className='key'>
            s
          </div>
          <div id='d' className='key'>
            d
          </div>
          <div id='f' className='key'>
            f
          </div>
          <div id='g' className='key'>
            g
          </div>
          <div id='h' className='key'>
            h
          </div>
          <div id='j' className='key'>
            j
          </div>
          <div id='k' className='key'>
            k
          </div>
          <div id='l' className='key'>
            l
          </div>
          <div id=';' className='key double'>
            <p>;</p>
            <p>:</p>
          </div>
          <div id='"' className='key double'>
            <p>'</p>
            <p>"</p>
          </div>
        </div>
        <div className='row 4'>
          <div id='z' className='key'>
            z
          </div>
          <div id='x' className='key'>
            x
          </div>
          <div id='c' className='key'>
            c
          </div>
          <div id='v' className='key'>
            v
          </div>
          <div id='b' className='key'>
            b
          </div>
          <div id='n' className='key'>
            n
          </div>
          <div id='m' className='key'>
            m
          </div>
          <div id=',' className='key double'>
            <p>,</p>
            <p>{`${"<"}`}</p>
          </div>
          <div id='.' className='key double'>
            <p>.</p>
            <p>{`${">"}`}</p>
          </div>
          <div id='/' className='key double'>
            <p>/</p>
            <p>?</p>
          </div>
        </div>
        <div className='row 5'>
          <div id='space' className='key'></div>
        </div>
      </div>
    </div>
  );
};

export default HeatMap;

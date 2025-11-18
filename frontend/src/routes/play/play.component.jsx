import { useState } from "react";
import "./play.styles.scss";
const Play = () => {
  const paragraph =
    'Wolverine is a superhero who appears in American comic books published by Marvel Comics. The character first appeared in the comic book The Incredible Hulk #180 (1974) and is best known as a member of the superhero team the X-Men. Wolverine is the alias of James Howlett (also known as Logan), a mutant born in Canada in the late 19th century. He possesses a range of superpowers including highly advanced self-healing abilities, a significantly prolonged lifespan, animal-keen senses, and retractable claws. His skeleton is reinforced with the unbreakable fictional metal adamantium, which he acquired after becoming an unwilling test subject in the Weapon X super soldier program. Wolverine is commonly depicted as a gruff loner susceptible to animalistic "berserker rages" who struggles to reconcile his humanity with his wild nature.';

  const [wordsTyped, setWordsTyped] = useState(0);
  const [mistakesCount, setMistakesCount] = useState(0);
  const [timeElapsed, setTimeElapsed] = useState(0.0);

  return (
    <div className='play-page'>
      <div className='heads-up-display'>
        <div className='words-typed-container'>
          <span>Words Typed: {wordsTyped}</span>
        </div>
        <div className='mistakes-container'>
          <span>Mistakes Made: {mistakesCount}</span>
        </div>
        <div className='time-container'>
          <span>Time Elapsed: {timeElapsed}</span>
        </div>
      </div>
      <div className='paragraph-holder'>
        {paragraph.split("").map((char, idx) => (
          <div id={idx} key={idx}>
            {char}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Play;

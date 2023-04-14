import styled from "styled-components";
import { useState } from "react";

export default function KanjiGuesser({ hiragana, meaning, image, vocabSize }) {
  // Create random index picker function
  function randomNumber() {
    let chosen = Math.floor(Math.random() * vocabSize);
    return chosen;
  }

  // Initialize some values
  const fullImage = document.getElementById("kanjiPic");
  let message = "";

  // Gets called when the user moves on to a new kanji to guess
  function newKanji() {
    // Choose a new kanji randomly
    setListIndex(randomNumber());
    // Clear the form
    update("", "userInput");
    // Reset isGuessCorrect to 0
    setGuessCorrect(0);
    fullImage.style.border = "7px solid purple";
  }

  // Create the state for current position in lists
  const [listIndex, setListIndex] = useState(randomNumber());

  //create the state for the guess being correct or not
  // 0: has not guessed yet
  // 1: guessed incorrectly at least once
  // 2: guessed correctly
  // 3: clicked 'ShowAnswer' button
  const [isGuessCorrect, setGuessCorrect] = useState(0);

  //initialize values based on first randomly selected kanji
  let currPic = image[listIndex];
  let correctHiragana = hiragana[listIndex];
  let correctMeaning = meaning[listIndex];

  // Create the state for the user input
  const [input, setInput] = useState({
    userInput: ""
  });

  // Boilerplate update function for the form input
  // FOR SOME REASON, THE ORDER OF THESE PARAMETERS MATTERS!!!!
  function update(value, name) {
    console.log("update Start");
    let newState = {
      ...input, //spread operator: let's you select everything that's currently there (all key-value pairs in the object)
      [name]: value //use the parameter 'name' as the key, param 'value' as the new value
    };
    setInput(newState);
    // THIS IS PRINTING OUT 1 STEP BEHIND WHERE IT SHOULD BE???
    console.log("updated to: " + input.userInput);
  }

  //when form is submitted, check if userAnswer === correctHiragana
  function handleSubmit(event) {
    console.log("handleSubmit Start");
    event.preventDefault();
    isUserInputCorrect();
    console.log("handleSubmit End");
  }

  // Function to check if userInput is the same as correctHiragana
  function isUserInputCorrect() {
    console.log("isUserInputCorrect Start");
    if (input.userInput === correctHiragana) {
      console.log("Correct: " + correctHiragana + "/" + input.userInput);
      setGuessCorrect(2);
    } else {
      console.log("Incorrect: " + correctHiragana + "/" + input.userInput);
      setGuessCorrect(1);
    }
  }

  // create the photo object
  let kanjiImage = (
    <Image
      id="kanjiPic"
      class="kanjiPic"
      src={currPic}
      alt="current Kanji to be guessed"
    ></Image>
  );

  // decide how to render the success/fail message
  if (isGuessCorrect === 2) {
    message = "You got it!";
    fullImage.style.border = "7px solid rgb(57, 255, 20)";
  } else if (isGuessCorrect === 1) {
    message = "Not quite. Try again!";
    fullImage.style.border = "7px solid red";
  } else if (isGuessCorrect === 3) {
    message = "Correct Answer: " + correctHiragana;
    fullImage.style.border = "7px solid gray";
  } else {
    message = "";
    // fullImage.style.border = "5px solid purple";
  }

  return (
    <BackgroundWrapper>
      <Spacer size={1} />
      <WrapperForm id="theForm" onSubmit={handleSubmit}>
        {kanjiImage}
        <p class="meaning"> Meaning: {correctMeaning} </p>
        {/* Uncomment this line to have the answers displayed */}
        {/* <p> Correct Hiragana: {correctHiragana} </p> */}
        <Spacer size={1} />
        {/* Find out what this line below is for I have no idea */}
        <label htmlFor="userInput">Your Guess: </label>
        <Spacer size={1} />
        <input
          id="theInput"
          type="text"
          name="userInput"
          // any time the value in the form changes, call function
          // first param: we want the value from the input that changed the event: pass in as value to update function
          // second param: pass in the name of the value you want to change
          onChange={(e) => update(e.target.value, "userInput")}
          value={input.userInput}
        />
        <Spacer size={3} />
        <button
          id="SubmitButton"
          type="submit"
          disabled={isGuessCorrect === 3 || isGuessCorrect === 2}
        >
          Check Answer
        </button>
        <Spacer size={3} />
        <div> {message} </div>
        <Spacer size={3} />
        <BottomRowWrapper>
          <button
            id="ShowAnswerButton"
            type="Button"
            onClick={() => setGuessCorrect(3)}
            disabled={isGuessCorrect === 3 || isGuessCorrect === 2}
          >
            Show Answer
          </button>
          <button id="NextButton" type="button" onClick={() => newKanji()}>
            {" "}
            Next Kanji{" "}
          </button>
        </BottomRowWrapper>
        <Spacer size={1} />
      </WrapperForm>
    </BackgroundWrapper>
  );
}

const BackgroundWrapper = styled.div`
  background-color: lightblue;
  padding-top: max(5vw, 20px);
  padding-bottom: none;
  padding-left: 30vw;
  padding-right: 30vw;
  font-size: larger;

  @media (max-width: 1300px) {
    padding-left: 25vw;
    padding-right: 25vw;
    font-size: auto;
  }

  @media (max-width: 1100px) {
    padding-left: 20vw;
    padding-right: 20vw;
  }

  @media (max-width: 900px) {
    padding-left: 15vw;
    padding-right: 15vw;
  }

  @media (max-width: 700px) {
    padding-left: 10vw;
    padding-right: 10vw;
  }

  @media (max-width: 620px) {
    padding-left: 5vw;
    padding-right: 5vw;
  }
`;

const WrapperForm = styled.form`
  background-color: black;
  border-radius: 10px;
  color: white;
  height: auto;
  padding: 10px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  .meaning {
    margin-top: 3%;
    margin-left: 5%;
    margin-bottom: 5%;
    align-self: start;
    font-size: larger;
    font-weight: bold;
  }

  input {
    padding: 8px;
    border: none;
    border-radius: 5px;
    box-shadow: var(--shadow-elevation-medium);
    font-size: large;
  }

  button {
    background-color: purple;
    border: none;
    color: white;
    font-weight: bold;
    padding: 7.5px 12.5px;
    text-align: center;
    text-decoration: none;
    display: inline-block;
    font-size: 13px;
    border-radius: 10%;
    border: 3px solid white;
    transition-duration: 0.4s;
    min-width: fit-content;
    max-width: 120px;
  }

  #SubmitButton:hover {
    background-color: white;
    color: purple;
    border: 3px solid purple;
    cursor: crosshair;
  }

  *:disabled {
    opacity: 0.45;
    cursor: not-allowed;
  }
`;

const BottomRowWrapper = styled.div`
  width: 80%;
  display: flex;
  flex-direction: row;
  justify-content: space-evenly;

  #NextButton:hover {
    background-color: white;
    color: purple;
    border: 3px solid purple;
    cursor: e-resize;
  }

  #ShowAnswerButton {
    background-color: red;
    color: black;
  }

  #ShowAnswerButton:hover {
    background-color: white;
    color: black;
    border: 3px solid red;
    cursor: help;
  }
`;

const Image = styled.img`
  object-fit: fill;
  border: 7px solid purple;
  border-top-left-radius: 7px;
  border-top-right-radius: 7px;
  max-width: 430px;
  width: 80vw;
  max-height: 240px;
  height: 50vh;

  @media (max-width: 500px) {
    /* max-width: 370px; */
    max-height: 200px;
  }
`;

const Spacer = styled.div`
  height: ${(p) => p.size}vh;
`;

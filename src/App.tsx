import React, {useState} from 'react';
import Questioncard from './components/Questioncard';
import {fetchQuizQuestions, QuestionState, Difficulty} from './API'
import {GlobalStyles, Wrapper} from './App.styles'


export type AnswerObject = {
  question: string;
  answer: string;
  correct: boolean;
  correctAnswer: string
}

const TOTAL_QUESTIONS = 10;

const App = () => {
  const [loading, setLoading] = useState(false)
  const [questions, setQuestions] = useState<QuestionState[]>([])
  const [number, setNumber] = useState(0)
  const [userAnswers, setUserAnswers] = useState<AnswerObject[]>([])
  const [score, setScore] = useState(0)
  const [gameOver, setGameOver] = useState(true)

  const startTrivia = async () => {
    setLoading(true);
    setGameOver(false);
    const newQuestions = await fetchQuizQuestions(TOTAL_QUESTIONS, Difficulty.EASY)
    setQuestions(newQuestions)
    setScore(0);
    setUserAnswers([]);
    setNumber(0);
    setLoading(false)
  }
  const checkAnswer = (e: React.MouseEvent<HTMLButtonElement>) =>{
    if(!gameOver){
      // user answers
      const answer = e.currentTarget.value;
      // check correct answer
      const correct = questions[number].correct_answer === answer;
      // add score if answer is correct
      if(correct) setScore(prev => prev + 1)
      // save answer in the araay of user answer
      const answerObject = {
        question: questions[number].question,
        answer,
        correct,
        correctAnswer: questions[number].correct_answer
      }
      setUserAnswers(prev => [...prev, answerObject])
    }
  }

  const nextQuetion = ()=> {
    // move to the next question if the not the last question
    const nextQuetion = number + 1;
    if(nextQuetion === TOTAL_QUESTIONS){
      setGameOver(true)
    } else {
      setNumber(nextQuetion)
    }
  }


  return (
    <>
    <GlobalStyles />
    
    <Wrapper>
      <h1>Quiz App</h1>
      {gameOver || userAnswers.length === TOTAL_QUESTIONS ? (
        <button className="start" onClick={startTrivia}>Satrt</button>
      ) : null}
      
      {!gameOver ? <p className="score">Score: {score}</p> : null} 
      {loading ? <p>Loadding Question...</p> : null}
      
      {!loading && !gameOver && (
        <Questioncard 
          questionNr={number + 1}
          totalQuestions={TOTAL_QUESTIONS}
          question={questions[number].question}
          answers={questions[number].answers} 
          userAnswer={userAnswers ? userAnswers[number] : undefined}
          callback={checkAnswer} 
        />
      )}
      {!loading && !gameOver && userAnswers.length === number + 1 && number !== TOTAL_QUESTIONS -1 ? (
        <button className="next" onClick={nextQuetion}>Next Quetion</button>
      ): null}
      
    </Wrapper>
    </>
  );
}

export default App;

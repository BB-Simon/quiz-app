import React, {useState} from 'react';
import Questioncard from './components/Questioncard';
import {fetchQuizQuestions} from './API'
import {QuestionState, Difficulty,  AnswerObject} from './Types'
import {GlobalStyles, Wrapper} from './App.styles'


const TOTAL_QUESTIONS = 10;

const App = () => {
  const [loading, setLoading] = useState<boolean>(false)
  const [questions, setQuestions] = useState<QuestionState[]>([])
  const [questionNumber, setQuestionNumber] = useState<number>(0)
  const [userAnswers, setUserAnswers] = useState<AnswerObject[]>([])
  const [score, setScore] = useState<number>(0)
  const [gameOver, setGameOver] = useState<boolean>(true)

  const startTrivia = async () => {
    setLoading(true);
    setGameOver(false);
    const newQuestions = await fetchQuizQuestions(TOTAL_QUESTIONS, Difficulty.EASY)
    setQuestions(newQuestions)
    setScore(0);
    setUserAnswers([]);
    setQuestionNumber(0);
    setLoading(false)
  }
  const checkAnswer = (e: React.MouseEvent<HTMLButtonElement>) =>{
    if(!gameOver){
      // user answers
      const answer = e.currentTarget.value;
      // check correct answer
      const correct = questions[questionNumber].correct_answer === answer;
      // add score if answer is correct
      if(correct) setScore(prev => prev + 1)
      // save answer in the araay of user answer
      const answerObject = {
        question: questions[questionNumber].question,
        answer,
        correct,
        correctAnswer: questions[questionNumber].correct_answer
      }
      setUserAnswers(prev => [...prev, answerObject])
    }
  }

  const nextQuetion = ()=> {
    // move to the next question if the not the last question
    const nextQuetion = questionNumber + 1;
    if(nextQuetion === TOTAL_QUESTIONS){
      setGameOver(true)
    } else {
      setQuestionNumber(nextQuetion)
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
          questionNumber={questionNumber + 1}
          totalQuestions={TOTAL_QUESTIONS}
          question={questions[questionNumber].question}
          answers={questions[questionNumber].answers} 
          userAnswer={userAnswers ? userAnswers[questionNumber] : undefined}
          callback={checkAnswer} 
        />
      )}
      {!loading && !gameOver && userAnswers.length === questionNumber + 1 && questionNumber !== TOTAL_QUESTIONS -1 ? (
        <button className="next" onClick={nextQuetion}>Next Quetion</button>
      ): null}
      
    </Wrapper>
    </>
  );
}

export default App;

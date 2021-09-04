import React from 'react';
import  {QuestionCardProps} from '../Types'

const Questioncard: React.FC<QuestionCardProps> = ({question, answers, callback, userAnswer, questionNumber, totalQuestions}) => {
    return (
        <div>
            <p className="number">
                Question: {questionNumber} / {totalQuestions}
            </p>
            <p dangerouslySetInnerHTML={{__html: question}} />
            <div>
                {answers.map((answer, index) => (
                    <div key={index}>
                        <button disabled={!!userAnswer} value={answer} onClick={callback}>
                            <span dangerouslySetInnerHTML={{ __html: answer }}/>
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Questioncard;
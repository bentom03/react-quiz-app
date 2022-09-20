import React from "react";

export default function Question(props) {

    const isDisabled = !!props.correctAnswer // !! converts object value to Boolean falsy values become false and truthy values become true
    
    const answerBtns = props.answers.map((ans, i) => {    
        let ansStyle = 'unselected';
        if(isDisabled && ans === props.correctAnswer) {
            ansStyle = 'correct'
        } else if (isDisabled && props.selectedAns === ans && ans !== props.correctAnswer) {
            ansStyle = 'wrong'
        } else if (props.selectedAns === ans) {
            ansStyle = 'selected'
        } else {
            ansStyle = 'unselected'
        }

        return (
            <button 
                key={i}
                className={`ans-btn ${ansStyle}`}
                value={ans}
                onClick={() => props.onChange(ans)}
                disabled={isDisabled}
            >
            {ans}
            </button>
        )
    })

 
    return(
        <div className="question-wrapper">
            <div className="question">
                <h3>{props.question}</h3>
            </div>
            <div>
                {answerBtns}
            </div>
        </div>
    )
}
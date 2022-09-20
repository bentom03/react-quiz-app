import React from "react"

export default function Intro(props) {
    return (
        <div className="intro">
            <h2>Quizzical</h2>
            <p>Take the quiz to grow your knowledge and measure your intelligence</p>
            <button className="start-quiz" onClick={props.getNewQuiz}>Start Quiz</button>
        </div>
    )
}
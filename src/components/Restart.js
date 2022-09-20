import React  from "react";

export default function Restart(props) {
    return (
        <div className="restart-quiz">
            <h3>You scored {props.correct}/{props.total} correct answers</h3>
            <button className="start-quiz" onClick={props.action}>Play Again</button>
        </div>
    )
}
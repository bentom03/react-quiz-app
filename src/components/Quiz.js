import React from "react"
import Question from "./Question"
import Restart from "./Restart";

export default function Quiz() {
    const [newQuiz, setNewQuiz] = React.useState(0);
    const [allQuestions, setAllQuestions] = React.useState([])
    const [selectedAnswers, setSelectedAnswers] = React.useState([])
    const [isChecked, setIsChecked] = React.useState(false)
    let score;

    React.useEffect( () => {
        fetch("https://opentdb.com/api.php?amount=5&category=11&type=multiple")
            .then(res => res.json())
            .then(data => getQuestions(data.results))
    },[newQuiz])

    function getQuestions(arr) {
        setAllQuestions(() => (
            arr.map( (el) => {
                return {
                    question: el.question,
                    answers: shuffle([...el.incorrect_answers, el.correct_answer]),
                    correctAnswer: el.correct_answer
                }
            })
        ))
    }

    function setSelectedAns(i, a) {
        // console.log(a);
        setSelectedAnswers((prevSelectedAnswers) => {
            const selectedAnswers = prevSelectedAnswers.slice();
            selectedAnswers[i] = a;
            return selectedAnswers;
          });
    }

    // console.log(selectedAnswers);

    if (isChecked) {
        score = 0;
        for(let i = 0; i < allQuestions.length; i++) {
            score += allQuestions[i].correctAnswer === selectedAnswers[i] ? 1 : 0
        }

        // console.log(score);
    }
    
    const newQuestions = allQuestions.map((q, i) => {
        // console.log(q.answers);
        return (
            <Question 
                key={i}
                question={q.question}
                answers={q.answers}
                correctAnswer={isChecked ? q.correctAnswer : null}
                selectedAns={selectedAnswers[i]}
                onChange={(a) => setSelectedAns(i, a)}
            />
        )
    })

    function shuffle(arr) {
        // console.log(arr);
        for (let i = arr.length - 1; i > 0; i--) {
            let j = Math.floor(Math.random() * (i + 1));
            let temp = arr[i];
            arr[i] = arr[j];
            arr[j] = temp;
        }
        return arr;
    }

    function checkAnswers() {
        setIsChecked(true);
    }

    function restartQuiz() {
        // console.log('restart');
        setNewQuiz(prevVal => prevVal + 1)
        setIsChecked(prevVal => !prevVal)
    }

    return (
        <div className="quiz-wrapper">
            {newQuestions}
            {isChecked === true ? 
            <Restart correct={score} total={newQuestions.length} action={restartQuiz} /> :
            <button className="start-quiz" onClick={checkAnswers}>Check answers</button>}
        </div>
    )
}
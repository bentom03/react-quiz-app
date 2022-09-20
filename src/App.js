import React from "react"
import Intro from "./components/Intro"
import Quiz from "./components/Quiz"
import Blob from "./components/Blob"

export default function App() {
    const [quiz, setQuiz] = React.useState(false)

    const getQuiz = () => {
        setQuiz(!quiz)
    }

    return (
        <main>
            <Blob position="top"/>
            { quiz ? <Quiz /> : <Intro getNewQuiz={getQuiz}/> }
            <Blob position="bottom"/>
        </main>
    )
}
import React, {useState, useEffect} from "react";
import QuestionItem from "./QuestionItem";

function QuestionList( ) {
  
  const [questions, setQuestions] = useState([])
 
  function handleDelete(deletedId){
    fetch(`http://localhost:4000/questions/${deletedId}`,{
      method : 'DELETE'
    })
    .then((resp) => resp.json())
    .then(() => {
      const newQuestions = questions.filter((question) => {
        if(question.id !== deletedId) {
          return question
        }
      })
      setQuestions(newQuestions)
    })
  }
  useEffect(() => {
    fetch("http://localhost:4000/questions")
    .then((resp) => resp.json())
    .then((data) => setQuestions(data))
    
  }, [])
  console.log(questions)
  return (
    <section>
      <h1>Quiz Questions</h1>
      <ul>{questions.map((question) => {
        return <QuestionItem key={question.id} question={question} handleDelete={handleDelete} />
      })}</ul>
    </section>
  );
}

export default QuestionList;

import React, { useContext, useState } from 'react'
import { UserContext } from '../../UserContext'
import { useParams } from 'react-router-dom'

const CreateQuiz = () => {

    const {ready, user} = useContext(UserContext)
    const {id} = useParams();

    const [quizTitle, setQuizTitle] = useState('');
    const [quizDescription, setQuizDescription] = useState('');

    const [startMakingQuiz, setStartMakingQuiz] = useState(false);
    const [howMany, setHowMany] = useState(0);
    const [counter, setCounter] = useState(0);

    const [questionStatement, setQuestionStatement] = useState('');
    const [questionOptions, setQuestionOptions] = useState([]);
    const [correctOption, setCorrectOption] = useState('');

    function handleQuestionCounter(ev){
        ev.preventDefault();

        if(counter != howMany && counter < howMany){
            setCounter(counter+1);
            
        }

        if(counter === howMany){
            console.log('concluir')
        }
    }

    const handleChange = (ev, index) => {
        const newValue = ev.target.value;
    
        setQuestionOptions(prevOptions => {
          const updatedOptions = [...prevOptions];
          updatedOptions[index] = newValue;
          return updatedOptions;
        });
        console.log(questionOptions)
        console.log(questionStatement)
    };
    
    const addOption = () => {
        setQuestionOptions([...questionOptions, '']);
    };

    if(startMakingQuiz){
        return (
            <div className='my-auto mx-auto items-center mt-12 max-w-4xl px-8'>
                <h2 className='text-2xl mt-12 mb-4'>Pergunta {counter+1} do seu Quiz</h2>
                <input type="text" placeholder="Type here" className="input input-ghost w-full max-w-xs" value={questionStatement} onChange={ev => setQuestionStatement(ev.target.value)} />

                <h2 className='text-2xl mt-12 mb-4'>Adicione suas alternativas</h2>
                {questionOptions.map((option, index) => (
                    <input type="text" key={index} value={option} onChange={ev => handleChange(ev, index)} placeholder="Type here" className="input input-ghost w-full max-w-xs" />
                ))} 
                
                <button className='btn btn-neutral' onClick={addOption}>Add Option</button>

                <div className='mb-10 mt-12'>
                    <button onClick={handleQuestionCounter} className='btn btn-info py-2 px-4 w-full'>{counter === howMany ? 'Finalizar' : 'Continuar'}</button>
                </div>
            </div>
        )
    }
    
    return (
        <div className='my-auto mx-auto items-center mt-12 max-w-4xl px-8'>
            <button className='btn btn-active'>
                ⬅️ Voltar
            </button>
            <form>
                <h2 className='text-2xl mt-4 mb-4'>Título do seu Quiz</h2>
                <input className="input input-ghost w-full max-w-xs" type="text" value={quizTitle} onChange={ev => setQuizTitle(ev.target.value)} placeholder='Um título de cair as calças...' />

                <h2 className='text-2xl mt-12 mb-4'>Descrição do seu Quiz</h2>
                <input className="input input-ghost w-full max-w-xs" type="text" value={quizDescription} onChange={ev => setQuizDescription(ev.target.value)} placeholder='Um descrição de abrir a boca...' /> 


                <h2 className='text-2xl mt-12 mb-4'>Quantas questões terão o seu Quiz</h2>
                <input type="text" placeholder="Type here" className="input input-ghost w-full max-w-xs" value={howMany} onChange={ev => setHowMany(ev.target.value)} />


                <div className='mb-10 mt-12'>
                    <button onClick={() => setStartMakingQuiz(true)} className='btn btn-info py-2 px-4 w-full'>Continuar</button>
                </div>
            </form>
        </div>
    )
}

export default CreateQuiz
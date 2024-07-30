import { useRef, useState } from "react"

const FaqsCard = (props) => {

    const answerElRef = useRef()
    const [state, setState] = useState(false)
    const [answerH, setAnswerH] = useState('0px')
    const { faqsList, idx } = props

    const handleOpenAnswer = () => {
        const answerElH = answerElRef.current.childNodes[0].offsetHeight
        setState(!state)
        setAnswerH(`${answerElH + 20}px`)
    }

    return (
        <div 
            className="space-y-3 mt-5 overflow-hidden border border-blue-600 rounded-lg px-4 pt-2 items-center my-auto"
            key={idx}
            onClick={handleOpenAnswer}
        >
            <h4 className="cursor-pointer flex items-center justify-between text-lg font-medium">
                {faqsList.q}
                {
                    state ? (
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5  ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 12H4" />
                        </svg>
                    ) : (
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5  ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                        </svg>
                    )
                }
            </h4>
            <div
                ref={answerElRef} className="duration-300"
                style={state ? {height: answerH } : {height: '0px'}}
            >
                <div>
                    <p className="">
                        {faqsList.a}
                    </p>
                </div>
            </div>
        </div>
    )
}

export default function FAQ(){

    const faqsList = [
        {
            q: "What is Directory of Satoshi?",
            a: "Directory of Satoshi is a platform designed to help beginners learn about Bitcoin. We provide a curated collection of resources, tutorials, and tools to make understanding and using Bitcoin straightforward and accessible."
        },
        {
            q: "How does Directory of Satoshi help beginners learn Bitcoin?",
            a: "Our platform offers step-by-step guides, easy technical explanations, and a comprehensive directory of educational materials. These resources are designed to help beginners grasp the basics of Bitcoin, set up wallets, and make transactions with confidence."
        },
        {
            q: "What types of resources does Directory of Satoshi provide?",
            a: "We offer a variety of resources including articles, book summaries, AI prompts, and curated lists of influential Bitcoin content creators. Our frequently updated content ensures you always have access to the latest information and insights."
        },
        {
            q: "How often is the content updated on Directory of Satoshi?",
            a: "We regularly update our content to keep you informed about the latest developments in the Bitcoin world. This includes new tutorials, articles, and insights to ensure you have the most current information."
        },
        {
            q: "Does Directory of Satoshi has a free trial?",
            a: "No, Directory of Satoshi does not offer a free trial. This is to ensure the value and integrity of our comprehensive content, which could otherwise be accessed and utilized without commitment."
        }
    ]
  
    return (
        <section className="leading-relaxed max-w-screen-xl mt-8 md:mt-12 mx-auto px-4 md:px-8 mb-8">
            <div className="space-y-3 text-center">
                <h1 className="text-3xl font-semibold">
                    Dúvidas frequentes sobre a plataforma
                </h1>
                <p className="max-w-lg mx-auto text-lg">
                    Aqui respondemos as dúvidas mais frequentes sobre o funcionamento da plataforma. Caso ainda tenha alguma dúvida entre em contato com nosso suporte.
                </p>
            </div>
            <div className="mt-14 max-w-3xl mx-auto">
                {
                    faqsList.map((item, idx) => (
                        <FaqsCard
                            idx={idx}
                            faqsList={item}
                        />
                    ))
                }
            </div>
        </section>
    )
}
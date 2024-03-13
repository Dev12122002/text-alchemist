import React from 'react'
import TextBox from '../component/TextBox';
import { useState } from 'react'
import { toast } from 'react-hot-toast';
import '../Styles/qa.css';
const { GoogleGenerativeAI } = require("@google/generative-ai");

export default function QA() {
    const [text, setText] = useState('');
    const [answer, setAnswer] = useState('');
    const [question, setQuestion] = useState('');

    const removeExtraSpaces = (text) => {
        // Regular expression to match one or more whitespace characters
        const regex = /\s+/g;

        // Replace extra spaces with a single space
        const trimmedText = text.replace(regex, ' ');

        // Trim leading and trailing spaces (optional)
        return trimmedText.trim();
    }

    const handleText = (event) => {
        let text = event.target.value;
        if (text.charAt(text.length - 1) !== ' ')
            text = removeExtraSpaces(event.target.value);
        setText(text);
    };

    const handleQuestion = (event) => {
        let text = event.target.value;
        if (text.charAt(text.length - 1) !== ' ')
            text = removeExtraSpaces(event.target.value);
        setQuestion(text);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        if (text === '') {
            toast.error('Please enter some text.');
            return;
        }
        else if (question === '') {
            toast.error('Please enter the question.');
            return;
        }

        const prompt = `context : ${text}
        
Answer the following question based on context:
${question}?`;

        toast.promise(findAnswer(prompt), {
            loading: 'Generating Answer...',
            success: 'Answer generated successfully!',
            error: error => error.message,
        });
    };

    const findAnswer = async (prompt) => {

        const token = process.env.REACT_APP_GEMINI_API_KEY;
        const genAI = new GoogleGenerativeAI(token);

        const generationConfig = {
            maxOutputTokens: 128, // Adjust for desired summary length (max 1024)
            temperature: 1.0, // Adjust for creativity vs. informativeness (0.0-1.0)
            topP: 0.1,
            topK: 16,
        };

        const model = genAI.getGenerativeModel({ model: "gemini-pro", generationConfig });

        // console.log(prompt);

        let text = '';
        try {
            const result = await model.generateContent(prompt);
            const response = await result.response;
            text = response.text();
        }
        catch (error) {
            throw new Error('Error generating answer...');
        }

        // console.log(text);
        setAnswer(text);

        return text;

    }

    const copyText = (e) => {
        e.preventDefault();
        navigator.clipboard.writeText(answer).then(() => {
            toast.success('Text copied to clipboard!');
        }, () => {
            toast.error('Error copying text to clipboard!');
        });
    }

    const btnsForQuestion = (

        <div className="row w-50 m-auto p-2 justify-content-around">
            <div className="col my-1">
                <button className="btn btn-success" onClick={handleSubmit}>Answer</button>
            </div>
            <div className="col my-1">
                <button className="btn btn-primary" onClick={(e) => {
                    e.preventDefault();
                    setQuestion('');
                }}>Clear</button>
            </div>
        </div>

    );

    const btnsForResult = (

        <div className="row w-50 m-auto p-2 justify-content-around">
            <div className="col my-1">
                <button className="btn btn-danger" onClick={copyText}>Copy</button>
            </div>
            <div className="col my-1">
                <button className="btn btn-primary" onClick={(e) => {
                    e.preventDefault();
                    setAnswer('');
                }}>Clear</button>
            </div>
        </div>

    );

    const btnsForInput = (

        <div className="row w-50 m-auto p-2 justify-content-around">
            <div className="col">
                <button className="btn btn-primary" onClick={(e) => {
                    e.preventDefault();
                    setText('');
                }}>Clear</button>
            </div>
        </div>

    );

    return (
        <div className="container-fluid w-100 px-5">
            <div className="row">
                <div className="col-12 col-md-6">
                    <TextBox value={text} disabled={false} placeholder={"Enter text here.."} rows={10} handleChange={handleText} handleSubmit={handleSubmit} buttons={btnsForInput} />
                </div>
                <div className="col-12 col-md-6">
                    <div className="row">
                        <div className="col-12 p-0">
                            <TextBox value={question} disabled={false} placeholder={"Enter question here.."} rows={2} handleChange={handleQuestion} buttons={btnsForQuestion} width={"90%"} />
                        </div>
                        <div className="col-12 p-0">
                            <TextBox value={answer} disabled={true} placeholder={"Answer will be shown here.."} rows={3} handleChange={handleText} buttons={btnsForResult} width={"90%"} />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

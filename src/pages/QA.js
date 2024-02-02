import React from 'react'
import TextBox from '../component/TextBox';
import { useState } from 'react'
import { toast } from 'react-hot-toast';
import '../Styles/qa.css';

export default function QA() {
    const [text, setText] = useState('');
    const [answer, setAnswer] = useState('');
    const [question, setQuestion] = useState('');

    const handleText = (event) => {
        setText(event.target.value);
    };

    const handleQuestion = (event) => {
        setQuestion(event.target.value);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        // console.log(text);

        if (text === '') {
            toast.error('Please enter some text.');
            return;
        }
        else if (question === '') {
            toast.error('Please enter the question.');
            return;
        }

        const input = text + " Answer the following question. " + question;
        const data = { inputs: input };
        toast.promise(findAnswer(data), {
            loading: 'Generating Summary...',
            success: 'Answer generated successfully!',
            error: 'Error generating answer.',
        });
    };

    const findAnswer = async (data) => {

        const token = "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";
        // console.log("token : ", token);

        const response = await fetch(
            "https://api-inference.huggingface.co/models/google/flan-t5-large",
            {
                headers: { Authorization: `Bearer ${token}` },
                method: "POST",
                body: JSON.stringify(data),
            }
        );

        const result = await response.json();
        console.log(result);
        setAnswer(result[0].generated_text);

        return result;

    }

    const copyText = (e) => {
        e.preventDefault();
        navigator.clipboard.writeText(answer).then(() => {
            // Success message
            toast.success('Text copied to clipboard!');
        }, () => {
            // Error message
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
            {/* <div className="col">
                <button className="btn btn-success" onClick={handleSubmit}>Summary</button>
            </div> */}
            <div className="col">
                <button className="btn btn-primary" onClick={(e) => {
                    e.preventDefault();
                    setText('');
                }}>Clear</button>
            </div>
        </div>

    );

    return (
        <div className="container">
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

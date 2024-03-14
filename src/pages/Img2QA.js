import React from 'react'
import TextBox from '../component/TextBox';
import { useState } from 'react'
import { toast } from 'react-hot-toast';
import ImageUploader from '../component/ImageUploader';
const { GoogleGenerativeAI } = require("@google/generative-ai");

export default function Img2QA() {

    const [answer, setAnswer] = useState('');
    const [question, setQuestion] = useState('');
    const [imagebase64, setImageBase64] = useState('');
    const [mimeType, setMimeType] = useState('');

    const copyText = (e) => {
        e.preventDefault();
        navigator.clipboard.writeText(answer).then(() => {
            toast.success('Text copied to clipboard!');
        }, () => {
            toast.error('Error copying text to clipboard!');
        });
    }

    const removeExtraSpaces = (text) => {
        // Regular expression to match one or more whitespace characters
        const regex = /\s+/g;

        // Replace extra spaces with a single space
        const trimmedText = text.replace(regex, ' ');

        // Trim leading and trailing spaces (optional)
        return trimmedText.trim();
    }

    const handleQuestion = (event) => {
        let text = event.target.value;
        if (text.charAt(text.length - 1) !== ' ')
            text = removeExtraSpaces(event.target.value);
        setQuestion(text);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        if (imagebase64 === '') {
            toast.error('Please upload an image!');
            return;
        }
        if (question === '') {
            toast.error('Please enter a question!');
            return;
        }

        const isOnline = window.navigator.onLine;
        if (!isOnline) {
            toast.error('Please check your internet connection!!.');
            return;
        }

        toast.promise(ImageQuestionAnswer(question), {
            loading: 'Generating response...',
            success: 'Response generated successfully!',
            error: error => error.message,
        });
    }

    function fileToGenerativePart(data, mimeType) {
        return {
            inlineData: {
                data,
                mimeType
            },
        };
    }

    const ImageQuestionAnswer = async (prompt) => {

        const token = process.env.REACT_APP_GEMINI_API_KEY;
        const genAI = new GoogleGenerativeAI(token);

        const generationConfig = {
            maxOutputTokens: 128, // Adjust for desired summary length (max 1024)
            temperature: 0.0, // Adjust for creativity vs. informativeness (0.0-1.0)
            topP: 0.1,
            topK: 16,
        };

        const model = genAI.getGenerativeModel({ model: "gemini-pro-vision", generationConfig });

        let text = '';

        const imageParts = [
            fileToGenerativePart(imagebase64, mimeType),
        ];

        try {
            const result = await model.generateContent([prompt, ...imageParts]);
            const response = await result.response;
            text = response.text();
        }
        catch (error) {
            if ((error.message).includes('Request payload size exceeds the limit')) {
                throw new Error('Request payload size exceeds the limit. Reduce the size of the image or question.');
            }
            throw new Error('Error generating response...');
        }

        if (text === '') {
            throw new Error('Error generating response...');
        }

        setAnswer(text);

        return text;

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

    return (
        <div className="container-fluid w-100 px-5">
            <div className="row">
                <div className="col-12 col-md-6">
                    {/* <TextBox value='' disabled={false} placeholder={"Enter text here.."} rows={10} handleSubmit={handleSubmit} /> */}
                    <ImageUploader setImageBase64={setImageBase64} setMimeType={setMimeType} />
                </div>
                <div className="col-12 col-md-6">
                    <div className="row">
                        <div className="col-12 p-0">
                            <TextBox value={question} disabled={false} placeholder={"Enter question here.."} rows={2} handleChange={handleQuestion} buttons={btnsForQuestion} width={"90%"} />
                        </div>
                        <div className="col-12 p-0">
                            <TextBox value={answer} disabled={true} placeholder={"Answer will be shown here.."} rows={3} buttons={btnsForResult} width={"90%"} />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

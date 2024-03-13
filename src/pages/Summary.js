import React from 'react'
import TextBox from '../component/TextBox';
import { useState } from 'react'
import { toast } from 'react-hot-toast';
import '../Styles/Summary.css';
const { GoogleGenerativeAI } = require("@google/generative-ai");

// import { useLockBodyScroll } from "@uidotdev/usehooks";

export default function Summary() {

    // useLockBodyScroll();

    const [text, setText] = useState('');
    const [summary, setSummary] = useState('');
    const [maxOutputSentence, setMaxOutputSentence] = useState(1);
    const [outputSentence, setOutputSentence] = useState('');

    const countSentences = (paragraph) => {
        // Split the paragraph into sentences using regular expression
        const sentences = paragraph.split(/[.?!]\s+/);

        // Filter out empty elements (potential extra splits at the end)
        const filteredSentences = sentences.filter(sentence => sentence.trim() !== "");

        // Return the length of the filtered array (number of sentences)
        return filteredSentences.length;
    }

    const removeExtraSpaces = (text) => {
        // Regular expression to match one or more whitespace characters
        const regex = /\s+/g;

        // Replace extra spaces with a single space
        const trimmedText = text.replace(regex, ' ');

        // Trim leading and trailing spaces (optional)
        return trimmedText.trim();
    }


    const handleChange = (event) => {
        let text = event.target.value;
        if (text.charAt(text.length - 1) !== ' ')
            text = removeExtraSpaces(event.target.value);
        setMaxOutputSentence(countSentences(text));
        setText(text);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        // console.log(text);

        if (text === '') {
            toast.error('Please enter some text.');
            return;
        }

        let trimText = removeExtraSpaces(text);
        setText(trimText);

        let prompt = `write a summary of the following text : 
        ` + text;

        if (outputSentence < 1) {
            if (outputSentence !== '') {
                toast.error('Output sentences cannot be less than 1.');
                return;
            }
        }

        if (outputSentence > maxOutputSentence) {
            toast.error('Output sentences cannot be more than the number of sentences in the input text.');
            return;
        }

        if (outputSentence >= 1 && outputSentence <= maxOutputSentence) {
            prompt = `write a summary of the following text : 
        ` + text + `
        Summarize it in ` + outputSentence + ` sentences at the third-grade reading level.`;
        }

        toast.promise(summarize(prompt), {
            loading: 'Generating Summary...',
            success: 'Summary generated successfully!',
            error: error => error.message,
        });
        // await summarize(text);
    };

    const summarize = async (prompt) => {

        const token = process.env.REACT_APP_GEMINI_API_KEY;
        const genAI = new GoogleGenerativeAI(token);
        // const prompt = 'write a summary of the following text: ' + data;
        console.log("token : ", token);

        // const response = await fetch(
        //     "https://api-inference.huggingface.co/models/facebook/bart-large-cnn",
        //     {
        //         headers: { Authorization: `Bearer ${token}` },
        //         method: "POST",
        //         body: JSON.stringify(data),
        //     }
        // );

        const generationConfig = {
            maxOutputTokens: 128, // Adjust for desired summary length (max 1024)
            temperature: 0.0, // Adjust for creativity vs. informativeness (0.0-1.0)
            topP: 0.1,
            topK: 16,
        };

        const model = genAI.getGenerativeModel({ model: "gemini-pro", generationConfig });

        let text = '';
        console.log(prompt);
        try {
            const result = await model.generateContent(prompt);
            const response = await result.response;
            text = response.text();
        }
        catch (error) {
            throw new Error('Error generating summary...');
        }
        // console.log(text);

        // const result = await response.json();
        console.log(text);
        // setSummary(result[0].summary_text);
        if (text === '') {
            if (outputSentence === '')
                throw new Error('Error generating summary...');
            else
                throw new Error('Error generating summary... Please try again with a smaller number of sentences.');
        }

        setSummary(text);

        return text;

    }

    const copyText = (e) => {
        e.preventDefault();
        navigator.clipboard.writeText(summary).then(() => {
            // Success message
            toast.success('Text copied to clipboard!');
        }, () => {
            // Error message
            toast.error('Error copying text to clipboard!');
        });
    }

    const btnsForResult = (

        <div className="row w-50 m-auto p-2 justify-content-between">
            <div className="col my-1">
                <button className="btn btn-primary" onClick={(e) => {
                    e.preventDefault();
                    setSummary('');
                }}>Clear</button>
            </div>
            <div className="col my-1">
                <button className="btn btn-danger" onClick={copyText}>Copy</button>
            </div>
        </div>

    );

    const btnsForInput = (

        <div className="row w-100 m-auto p-2 justify-content-around">
            <div className="col-3 my-1">
                <button className="btn btn-success" onClick={handleSubmit}>Summary</button>
            </div>
            <div className="col-3 my-1">
                <button className="btn btn-primary" onClick={(e) => {
                    e.preventDefault();
                    setText('');
                }}>Clear</button>
            </div>
            <div className="form-group col-6 my-1">
                <input type="number" value={outputSentence} onChange={e => setOutputSentence(e.target.value)} min={1} max={maxOutputSentence} className='w-100' id="numberInput" placeholder='Output Sentences' style={{ color: "white", display: "inline", background: "transparent", border: "none!important", outline: "none!important", borderBottom: "2px solid white" }} />
            </div>
        </div>

    );

    return (
        // <div className="container-fluid vh-100 mw-100">
        //     <div className="row">
        //         <div className="col-12 col-md-6 mw-100" style={{ minWidth: "auto" }}>
        //             <TextBox disabled={false} placeholder={"Enter text here.."} rows={10} value={text} handleChange={handleChange} handleSubmit={handleSubmit} buttons={btnsForInput} />
        //         </div>
        //         <div className="col-12 col-md-6 mw-100" style={{ minWidth: "auto" }}>
        //             <TextBox disabled={true} placeholder={"Result will be shown here.."} rows={10} value={summary} handleChange={handleChange} buttons={btnsForResult} />
        //         </div>
        //     </div>
        // </div>

        <div className="container-fluid" style={{ minWidth: "100%" }}>
            <div className="row">
                <div className="col-12 col-md-6">
                    <TextBox disabled={false} placeholder={"Enter text here.."} rows={10} value={text} handleChange={handleChange} handleSubmit={handleSubmit} buttons={btnsForInput} width={"100%"} />
                </div>
                <div className="col-12 col-md-6">
                    <TextBox disabled={true} placeholder={"Result will be shown here.."} rows={10} value={summary} handleChange={handleChange} buttons={btnsForResult} width={"100%"} />
                </div>
            </div>
        </div >
    )
}

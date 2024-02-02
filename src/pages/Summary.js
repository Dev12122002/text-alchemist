import React from 'react'
import TextBox from '../component/TextBox';
import { useState } from 'react'
import { toast } from 'react-hot-toast';
import '../Styles/Summary.css';
// import { useLockBodyScroll } from "@uidotdev/usehooks";

export default function Summary() {

    // useLockBodyScroll();

    const [text, setText] = useState('');
    const [summary, setSummary] = useState('');

    const handleChange = (event) => {
        setText(event.target.value);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        // console.log(text);

        if (text === '') {
            toast.error('Please enter some text.');
            return;
        }

        toast.promise(summarize(text), {
            loading: 'Generating Summary...',
            success: 'Summary generated successfully!',
            error: 'Error generating summary.',
        });
        // await summarize(text);
    };

    const summarize = async (data) => {

        const token = "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";
        // console.log("token : ", token);

        const response = await fetch(
            "https://api-inference.huggingface.co/models/facebook/bart-large-cnn",
            {
                headers: { Authorization: `Bearer ${token}` },
                method: "POST",
                body: JSON.stringify(data),
            }
        );

        const result = await response.json();
        // console.log(result);
        setSummary(result[0].summary_text);

        return result;

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

        <div className="row w-50 m-auto p-2 justify-content-around">
            <div className="col my-1">
                <button className="btn btn-success" onClick={handleSubmit}>Summary</button>
            </div>
            <div className="col my-1">
                <button className="btn btn-primary" onClick={(e) => {
                    e.preventDefault();
                    setText('');
                }}>Clear</button>
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

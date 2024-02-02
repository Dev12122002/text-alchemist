import React from 'react'
import '../Styles/textbox.css'

export default function TextBox(props) {
    // const [text, setText] = useState('');

    // const handleChange = (event) => {
    //     setText(event.target.value);
    // };

    // const handleSubmit = (event) => {
    //     event.preventDefault();
    //     console.log(text);
    //     summarize(text);
    // };

    // const summarize = async (data) => {
    //     const token = "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";
    //     console.log("token : ", token);
    //     const response = await fetch(
    //         "https://api-inference.huggingface.co/models/facebook/bart-large-cnn",
    //         {
    //             headers: { Authorization: `Bearer ${token}` },
    //             method: "POST",
    //             body: JSON.stringify(data),
    //         }
    //     );
    //     const result = await response.json();
    //     console.log(result);
    //     return result;
    // }

    return (

        // <form onSubmit={handleSubmit}>
        //     <label>
        //         Enter Text Here:
        //         <textarea value={text} onChange={handleChange} />
        //     </label>
        //     <input type="submit" value="Submit" />
        // </form>

        // <form onSubmit={handleSubmit} className='m-auto vh-100' style={{ border: "2px solid yellow" }}>
        //     <div className="mb-3">
        //         <label htmlFor="exampleFormControlTextarea1" className="form-label">Enter Text Here:</label>
        //         <textarea className="form-control" value={text} onChange={handleChange} id="exampleFormControlTextarea1" rows="3"></textarea>
        //     </div>
        // </form >

        // <div className="container p-0 vh-100" style={{ border: "2px solid red" }}>
        <div id="wrapper" style={{ width: props.width }}>

            <form id="paper">

                <textarea
                    disabled={props.disabled} className='mt-5' placeholder={props.placeholder} value={props.value} onChange={props.handleChange} id="text" name="text" rows={props.rows} style={{ overflowY: "auto", wordWrap: "break-word", resize: "none", height: "80%", width: "100%" }}></textarea>
                <br />
                {props.buttons}

            </form>

        </div >
        //</div>

    )
}

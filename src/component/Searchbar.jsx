import React, { useRef, useEffect } from 'react'
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';
import useSound from 'use-sound';
import on from './on.mp3';
import off from './off.mp3';

export default function Searchbar(props) {

    // const [transcript, setTranscript] = useState('');
    const [micOn] = useSound(on);
    const [micOff] = useSound(off);

    const inputRef = useRef(null);
    const {
        transcript,
        listening,
        // resetTranscript,
        // browserSupportsSpeechRecognition
    } = useSpeechRecognition();

    const handleMicClick = () => {
        if (!listening) {
            SpeechRecognition.startListening();
        } else {
            SpeechRecognition.stopListening();
        }
    }

    useEffect(() => {
        props.setSearch(transcript);// eslint-disable-next-line
    }, [transcript])

    useEffect(() => {
        inputRef.current.focus();
    }, [listening])
    return (

        <div className="row height d-flex justify-content-center align-items-center">

            <div className="col-12 p-0 d-flex">

                <span className="left-pan1 d-block"><i className="fa fa-search"></i></span>
                <div className="form w-100">
                    <input type="text" ref={inputRef} onKeyDown={props.handleKeyDown} value={props.value} onChange={props.handleChange} className="form-control form-input" placeholder="Write Query here..." />
                </div>
                <span className="left-pan d-block"><i onClick={listening ? () => { handleMicClick(); micOff(); } : () => { handleMicClick(); micOn(); }} className={listening ? "fa fa-microphone" : "fa fa-microphone-slash"}></i></span>

            </div>
            {/* <div>
                <p>Microphone: {listening ? 'on' : 'off'}</p>
                <button onClick={SpeechRecognition.startListening}>Start</button>
                <button onClick={SpeechRecognition.stopListening}>Stop</button>
                <button onClick={resetTranscript}>Reset</button>
                <p>{transcript}</p>
            </div> */}

        </div>

    )
}

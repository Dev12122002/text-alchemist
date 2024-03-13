import React, { useState } from 'react'
import Searchbar from '../component/Searchbar';
import '../Styles/searchbar.css';
import '../Styles/text2img.css';
import { toast } from 'react-hot-toast';
import LoadingGif from '../images/loading.gif';
// import ReactPlayer from 'react-player';

export default function Text2image() {
    const [search, setSearch] = useState('');
    const [image, setImage] = useState();
    const [tryAgain, setTryAgain] = useState(false);
    const [loading, setLoading] = useState(false);

    const handleChange = (event) => {
        setSearch(event.target.value);
    };

    const beforeImageGeneration = async () => {
        setSearch('');
        setImage();
        setLoading(true)
        if (search === '') {
            toast.error('Please enter query!!.');
            setLoading(false);
            return;
        }
        const isOnline = window.navigator.onLine;
        if (!isOnline) {
            toast.error('Please check your internet connection!!.');
            setLoading(false);
            return;
        }

        const data = { inputs: search };

        toast.promise(generateImage(data), {
            loading: 'Generating Image...',
            success: 'Image generated successfully!',
            error: error => error.message,
        }).then(() => {
            setLoading(false)
        }).catch((error) => {
            setLoading(false);
            setSearch(data.inputs);
        });
    }

    const handleKeyDown = async (event) => {
        if (event.key === 'Enter') {
            beforeImageGeneration();
        }
    };

    const generateImage = async (data) => {
        const token = process.env.REACT_APP_HUGGING_FACE_API_KEY;
        setTryAgain(false);
        let response = {};
        response = await fetch(
            "https://api-inference.huggingface.co/models/playgroundai/playground-v2-1024px-aesthetic",
            {
                headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" },
                method: "POST",
                body: JSON.stringify(data),
            }
        );

        if (!response.ok) {
            const url = require('../images/retry.png');
            setTryAgain(url);
            throw new Error("Error generating Image...");
        }

        const data1 = await response.blob();
        const imgUrl = URL.createObjectURL(data1)
        setImage(imgUrl);
    }

    const downloadImg = () => {
        const a = document.createElement("a");
        a.href = image;
        a.download = "image.png";
        a.click();
        toast.success('Image downloaded.');
    }

    return (
        <>
            <Searchbar handleKeyDown={handleKeyDown} setSearch={setSearch} value={search} handleChange={handleChange} />

            {image && (

                <div className="container">
                    <img src={image} className='img' alt="generated" width="400" height="500" />
                    <div className="overlay"></div>
                    <div className="button" onClick={downloadImg}>DOWNLOAD</div>
                </div>

            )}
            {tryAgain && (

                <div className="container">
                    <img src={tryAgain} className='tryAgain' alt="generated" width="200px" height="200px" onClick={beforeImageGeneration} />
                </div>

            )}
            {loading &&
                <div className="container2">
                    {/* <ReactPlayer url='text2img1.mp4' playing={true} muted={true} loop /> */}
                    <img src={LoadingGif} alt="loading" width="400px" height="400px" />
                </div>

            }
        </>

    )
}


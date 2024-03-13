import React, { useState } from 'react'
import Searchbar from '../component/Searchbar';
import '../Styles/searchbar.css';
import '../Styles/text2img.css';
import { toast } from 'react-hot-toast';
import ReactPlayer from 'react-player';



export default function Text2image() {
    const [search, setSearch] = useState('');
    const [image, setImage] = useState();
    const [loading, setLoading] = useState(false);

    const handleChange = (event) => {
        setSearch(event.target.value);
    };

    const handleKeyDown = async (event) => {
        // event.preventDefault();
        if (event.key === 'Enter') {
            // console.log(search);
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
                error: (error) => {
                    return `Error generating Image: ${error.message}`;
                },
            }).then(() => {
                setLoading(false)
            });
            // await generateImage(data);
        }
    };

    const generateImage = async (data) => {
        const token = process.env.REACT_APP_HUGGING_FACE_API_KEY;
        // console.log("token : ", token);
        let response = {};
        try {
            response = await fetch(
                "https://api-inference.huggingface.co/models/playgroundai/playground-v2-1024px-aesthetic",
                {
                    headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" },
                    method: "POST",
                    body: JSON.stringify(data),
                }
            );

        }
        catch (err) {
            // response.status = 500;

        };

        // if (!response.ok) toast.error("Error generating Image.");

        const data1 = await response.blob();
        const imgUrl = URL.createObjectURL(data1)
        setImage(imgUrl);
    }

    const downloadImg = () => {
        const a = document.createElement("a");
        a.href = image;
        a.download = "image.png";
        a.click();
        // console.log("downloaded");
        toast.success('Image downloaded.');
    }

    return (
        <>
            {/* <div className='container-fluid1'> */}
            <Searchbar handleKeyDown={handleKeyDown} setSearch={setSearch} value={search} handleChange={handleChange} />

            {image && (
                // <div className='container-fluid'>
                // <img src={image} alt='generated' width="400" height="360" />
                // </div>

                <div class="container">
                    <img src={image} alt="generated" width="400" height="500" />
                    {/* <p class="title">card title</p> */}
                    <div class="overlay"></div>
                    <div class="button" onClick={downloadImg}>DOWNLOAD</div>
                </div>

            )}
            {loading &&
                <div class="container2">
                    <ReactPlayer url='text2img1.mp4' playing={true} muted={true} loop />
                </div>
            }

            {/* </div> */}
        </>

    )
}


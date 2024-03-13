import React from 'react'
import '../Styles/textbox.css'

export default function TextBox(props) {
    return (

        <div id="wrapper" style={{ width: props.width }}>

            <form id="paper">

                <textarea
                    disabled={props.disabled} className='mt-5' placeholder={props.placeholder} value={props.value} onChange={props.handleChange} id="text" name="text" rows={props.rows} style={{ overflowY: "auto", wordWrap: "break-word", resize: "none", height: "80%", width: "100%" }}></textarea>
                <br />
                {props.buttons}

            </form>

        </div >

    )
}

import mainImage from './assets/RAISE_First_image.png';
import {useState} from "react";
import {Link} from "react-router-dom";

export const HomePage = () => {
    const [url, setUrl] = useState<string>("");

    function handleClick() {
        console.log("Button clicked")
    }

    return (
        <div>
            <img src={mainImage} width={300}/>
            <h2>Provide a Github URL</h2>
            <p>Enter a Github URL to start the analysis of a project.</p>
            <input type="text" placeholder="GIthub URL" onChange={(e) => (setUrl(e.target.value))} />
            <br/>
            <button type={"submit"} style={{marginTop: 20}} onClick={handleClick}>Start Analysis</button>
        </div>
    )
}
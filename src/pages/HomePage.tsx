import mainImage from '../assets/RAISE_First_image.png';
import {useState} from "react";
import {Link} from "react-router-dom";
import axios from "axios";
import {Loading} from "../components/Loading";
import {DisplayData} from "../components/DisplayData";

export const HomePage = () => {
    const [inputValue, setInputValue] = useState('');
    const [loading, setLoading] = useState(false);
    const [responseData, setResponseData] = useState<projectResponseData | null>(null);

    const handleShowButtonClick = () => {
        axios.get(`http://172.19.0.3:8080/projects/?gitUrl=${inputValue}`)
            .then((response) => {
                setResponseData(response.data);
            })
            .catch((error) => {
                console.error(error);
            });
    }
    
    const handleStartButtonClick = () => {
        setLoading(true);
        axios.post(`http://172.19.0.3:8080/projects/?gitUrl=${inputValue}`)
            .then((response) => {
                setLoading(false);
            })
            .catch((error) => {
                console.error(error);
                setLoading(false);
            });
    }

    const handleInputChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
        setInputValue(event.target.value);
    }

    return (
        <div>
            <img src={mainImage} width={300}/>
            <h2>Provide a Github URL</h2>
            <p>Enter a Github URL to start the analysis of a project.</p>
            <textarea value={inputValue} onChange={handleInputChange} />
            <br/>
            {loading ? <Loading /> : <div>
                <button type={"submit"} style={{marginTop: 20, marginRight: 20}} onClick={handleStartButtonClick}>Start Analysis</button>
                <button type={"submit"} style={{marginTop: 20}} onClick={handleShowButtonClick}>Show data</button>
            </div>
            }
            {responseData ? <DisplayData responseData={responseData} /> : null}
        </div>
    )
}
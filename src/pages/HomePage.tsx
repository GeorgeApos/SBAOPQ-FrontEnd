import mainImage from '../assets/RAISE_First_image.png';
import React, {useState} from "react";
import axios from "axios";
import {Loading} from "../components/Loading";
import {projectResponseData} from "../interfaces/interfaces";
import * as process from 'process';

export const HomePage = () => {
    const [inputValue, setInputValue] = useState('');
    const [loading, setLoading] = useState(false);
    const [responseData, setResponseData] = useState<projectResponseData>();

    const localhost = process.env.REACT_APP_LOCALHOST;
    const sleep = (ms: number | undefined) => new Promise(r => setTimeout(r, ms));

    const handleGithubActions = () => {
        setLoading(true);
        sleep(5000).then(() => {
            setLoading(false);
        });
    }

    const handleShowButtonClick = () => {
        axios.get(`${localhost}:8080/projects/?gitUrl=${inputValue}`,
            {headers: {'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': '*'}})
            .then((response) => {
                setResponseData(response.data);
                console.log(response.data);
            })
            .catch((error) => {
                console.error(error);
            });
    }

    const handleStartButtonClick = () => {
        setLoading(true);
        axios.post(`${localhost}:8080/projects/?gitUrl=${inputValue}`,
            {headers: {'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': '*'}})
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
        <>
            {responseData ? (
                <div>
                    <h2>Project Data</h2>
                    <table>
                        <thead>
                        <tr>
                            <th>ID</th>
                            <th>Git URL</th>
                            <th>SHA</th>
                            <th>Owner</th>
                            <th>Name</th>
                            <th>Directory</th>
                            <th>Total Coverage</th>
                            <th>Total Miss</th>
                            <th>Total Stmts</th>
                        </tr>
                        </thead>
                        <tbody>
                        <tr>
                            <td>{responseData.id}</td>
                            <td>{responseData.gitUrl}</td>
                            <td>{responseData.sha}</td>
                            <td>{responseData.owner}</td>
                            <td>{responseData.name}</td>
                            <td>{responseData.directory}</td>
                            <td>{responseData.totalCoverage}</td>
                            <td>{responseData.totalMiss}</td>
                            <td>{responseData.totalStmts}</td>
                        </tr>
                        </tbody>
                    </table>

                    <h2>Files</h2>
                    <table>
                        <thead>
                        <tr>
                            <th>ID</th>
                            <th>First File</th>
                            <th>Name</th>
                            <th>Stmts</th>
                            <th>Miss</th>
                            <th>Coverage</th>
                            <th>Rating</th>
                            <th>Previous Rating</th>
                            <th>Project Name</th>
                        </tr>
                        </thead>
                        <tbody>
                        {responseData.files.map((file) => (
                            <tr key={file.id}>
                                <td>{file.id}</td>
                                <td>{file.first_file}</td>
                                <td>{file.name}</td>
                                <td>{file.stmts}</td>
                                <td>{file.miss}</td>
                                <td>{file.coverage}</td>
                                <td>{file.rating}</td>
                                <td>{file.previousRating}</td>
                                <td>{file.projectName}</td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                </div>
            ) : (
        <div>
            <img src={mainImage} width={300}/>
            <h2>Provide a Github URL</h2>
            <p>Enter a Github URL to start the analysis of a project.</p>
            <textarea value={inputValue} onChange={handleInputChange} />
            <br/>
            {loading ? <Loading /> : <div>
                <button type={"submit"} style={{marginTop: 20, marginRight: 20}} onClick={handleStartButtonClick}>Start Analysis</button>
                <button type={"submit"} style={{marginTop: 20, marginRight: 20}} onClick={handleGithubActions}>Start Github Actions</button>
                <button type={"submit"} style={{marginTop: 20}} onClick={handleShowButtonClick}>Show data</button>
                </div>
            }
        </div>
            )}
        </>
    )
}
import mainImage from '../assets/RAISE_First_image.png';
import React, {useState} from "react";
import axios from "axios";
import {Loading} from "../components/Loading";
import {projectResponseData} from "../interfaces/interfaces";
import './HomePage.css'

export const HomePage = () => {
    const [inputValue, setInputValue] = useState('');
    const [loading, setLoading] = useState(false);
    const [responseData, setResponseData] = useState<projectResponseData>();

    const localhost = import.meta.env.VITE_REACT_APP_LOCALHOST;

    const sleep = (ms: number | undefined) => new Promise(r => setTimeout(r, ms));

    const handleGithubActions = () => {
        setLoading(true);
        sleep(5000).then(() => {
            setLoading(false);
        });
    }

    const handleShowButtonClick = () => {
        axios.get(`http://${localhost}:8080/projects/?gitUrl=${inputValue}`,
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
        axios.post(`http://${localhost}:8080/projects/?gitUrl=${inputValue}`,
            {headers: {'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': '*'}})
            .then((response) => {
                setLoading(false);
                setResponseData(response.data);
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
                <div className="project-data-container">
                    <h2 className="section-title">Project Data</h2>
                    <table className="data-table">
                        <thead className="table-head">
                        <tr className="table-row">
                            <th className="table-header">Git URL</th>
                            <th className="table-header">SHA</th>
                            <th className="table-header">Owner</th>
                            <th className="table-header">Name</th>
                            <th className="table-header">Dependencies</th>
                            <th className="table-header">Total Coverage</th>
                            <th className="table-header">Total Miss</th>
                            <th className="table-header">Total Stmts</th>
                        </tr>
                        </thead>
                        <tbody className="table-body">
                        <tr className="table-row">
                            <td className="table-data">{responseData.gitUrl}</td>
                            <td className="table-data">{responseData.sha}</td>
                            <td className="table-data">{responseData.owner}</td>
                            <td className="table-data">{responseData.name}</td>
                            <td className="table-data">{responseData.dependenciesCounter}</td>
                            <td className="table-data">{responseData.totalCoverage}</td>
                            <td className="table-data">{responseData.totalMiss}</td>
                            <td className="table-data">{responseData.totalStmts}</td>
                        </tr>
                        </tbody>
                    </table>

                    <h2 className="section-title">Dependencies</h2>
                    <table className="data-table">
                        <tbody className="table-body" style={{alignItems:"center"}}>
                        {responseData.dependencies.map((dependency) => (
                            <tr className="table-row">
                                <td className="table-data">{dependency}</td>

                            </tr>
                        ))}
                        </tbody>
                    </table>

                    <h2 className="section-title">Files</h2>
                    <table className="data-table">
                        <thead className="table-head">
                        <tr className="table-row">
                            <th className="table-header">Name</th>
                            <th className="table-header">Stmts</th>
                            <th className="table-header">Miss</th>
                            <th className="table-header">Coverage</th>
                            <th className="table-header">Rating</th>
                            <th className="table-header">Previous Rating</th>
                        </tr>
                        </thead>
                        <tbody className="table-body">
                        {responseData.files.map((file) => (
                            <tr className="table-row" key={file.id}>
                                <td className="table-data">{file.name}</td>
                                <td className="table-data">{file.stmts}</td>
                                <td className="table-data">{file.miss}</td>
                                <td className="table-data">{file.coverage}</td>
                                <td className="table-data">{file.rating}</td>
                                <td className="table-data">{file.previousRating || '-'}</td>
                            </tr>
                        ))}
                        </tbody>
                    </table>

                    <h2 className="section-title">Similarity</h2>
                    <table className="data-table">
                        <thead className="table-head">
                        <tr className="table-row">
                            <th className="table-header">Name</th>
                            <th className="table-header">Similarity to Main File</th>
                        </tr>
                        </thead>
                        <tbody className="table-body">
                        {responseData.files.map((mainFile) => (
                            <tr className="table-row" key={mainFile.id}>
                                <td className="table-data">{mainFile.name}</td>
                                <td className="table-data">
                                    {Object.keys(mainFile.similarity).map((key) => (
                                        mainFile.name !== key && (
                                            <div key={key}>
                                                {key} = <b>{mainFile.similarity[key]} %</b>
                                            </div>
                                        )
                                    ))}
                                </td>
                            </tr>
                        ))}
                        </tbody>



                    </table>


                    <h2 className="section-title">Comments</h2>
                    <table className="data-table">
                        <thead className="table-head">
                        <tr className="table-row">
                            <th className="table-header">Name</th>
                            <th className="table-header">Comments</th>
                        </tr>
                        </thead>
                        <tbody className="table-body">
                        {responseData.files.map((file) => (
                            <tr className="table-row" key={file.id}>
                                <td className="table-data">{file.name}</td>
                                <td className="table-data">
                                    <ul>
                                        {file.comments.map((comment, index) => (
                                            <li key={index}>{comment.comment}</li>
                                        ))}
                                    </ul>
                                </td>
                            </tr>
                        ))}
                        </tbody>
                    </table>

                    <button className="back-button" type="submit" style={{marginTop: 20}}
                            onClick={() => setResponseData(undefined)}>Back
                    </button>
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
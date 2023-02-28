import { useState } from 'react'
import reactLogo from './assets/react.svg'
import './App.css'

function App() {
  const [gitUrl, setGitUrl] = useState("")

    function handleClick() {
        fetch(`http://localhost:8080/projects/?gitUrl=${gitUrl}`, {
                method: "POST",
            }
        )
    }

    return (
    <div className="App">
        <form>
            <label>
                Give a Github URL:
                <input type="text" name="gitUrl" value={gitUrl} onChange={(e) => {
                    setGitUrl(e.target.value)}
                }/>
            </label>
            <input type="submit" value="Submit" onClick={handleClick} />
        </form>
    </div>
  )
}

export default App

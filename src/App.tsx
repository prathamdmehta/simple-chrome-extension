import { useState } from 'react';
import reactLogo from './assets/react.svg';
import viteLogo from '/vite.svg';
import './App.css';

function App() {

    const [colour, setColour] = useState('#000');
    // Function to handle the button click
    const onclick = async () => {
        const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
        chrome.scripting.executeScript<string[], void>({
          target: { tabId: tab.id! },
          args: [colour],
          func: (colour) => {
            // alert("Hello from the extension!");
            document.body.style.backgroundColor =  colour;
          }
        });
    };

  return (
    <>
      <div>
        <a href="https://vite.dev" target="_blank" rel="noopener noreferrer">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank" rel="noopener noreferrer">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>My Extension</h1>
      <div className="card">
        <input
          type="color"
          onChange={(e) => setColour(e.currentTarget.value)}
          value={colour}
        />
        <button onClick={() => onclick()}>
          Click me
        </button>
        <p>
          Edit <code>src/App.tsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </>
  );
}

export default App;

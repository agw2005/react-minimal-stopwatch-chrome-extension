import { useEffect, useState } from "react";

function App() {
  const [unixEpochMilliseconds, setUnixEpochMilliseconds] = useState<number>(0);
  const setDate = () => {
    if (unixEpochMilliseconds === 0) {
      setUnixEpochMilliseconds(new Date().getTime());
    } else {
      setUnixEpochMilliseconds(0);
      chrome.storage.sync.remove(unixEpochMilliseconds);
    }
  };

  // Load epoch on render from chrome storage
  useEffect(() => {
    chrome.storage.sync.get({ unixEpochMilliseconds: 0 }, (result: any) => {
      if (chrome.runtime.lastError) {
        console.error("Error reading storage:", chrome.runtime.lastError);
      } else {
        setUnixEpochMilliseconds(result.unixEpochMilliseconds);
      }
    });
  }, []);

  // Save epoch to chrome storage
  useEffect(() => {
    chrome.storage.sync.set({ unixEpochMilliseconds }, () => {
      if (chrome.runtime.lastError) {
        console.error("Error writing storage:", chrome.runtime.lastError);
      }
    });
  }, [unixEpochMilliseconds]);

  return (
    <div className="m-4">
      <h1 className="text-2xl font-bold">Stopwatch</h1>
      <p>Unix Epoch : {unixEpochMilliseconds}</p>
      <p>Date Epoch : {new Date(unixEpochMilliseconds).toUTCString()}</p>
      <button type="button" className="p-2 border-2" onClick={setDate}>
        {unixEpochMilliseconds === 0 ? "Start" : "Stop"}
      </button>
    </div>
  );
}

export default App;

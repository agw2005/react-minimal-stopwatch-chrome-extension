import { useState } from "react";

function App() {
  const [unixEpochMilliseconds, setUnixEpochMilliseconds] = useState<number>(0);
  const setDate = () => {
    setUnixEpochMilliseconds(new Date().getTime());
  };

  

  return (
    <div className="m-4">
      <h1 className="text-2xl font-bold">Stopwatch</h1>
      <p>Unix Epoch : {unixEpochMilliseconds}</p>
      <p>Date Epoch : {new Date(unixEpochMilliseconds).toUTCString()}</p>
      <button type="button" className="p-2 border-2" onClick={setDate}>
        Set date
      </button>
    </div>
  );
}

export default App;

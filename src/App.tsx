import { useEffect, useRef, useState } from "react";

/**
 * This component is for the actual extension
 * Use NonExtension.tsx for testing the stopwatch logic with Vite development server
 */

const MILLISECOND_INTERVAL = 10;

function App() {
  const [unixEpochMilliseconds, setUnixEpochMilliseconds] = useState<number>(0);
  const [elapsedMilliseconds, setElapsedMilliseconds] = useState<number>(0);
  const intervalIdRef = useRef<number>(0);

  const start = () => {
    setUnixEpochMilliseconds(Date.now() - elapsedMilliseconds);
  };

  const stop = () => {
    setUnixEpochMilliseconds(0);
  };

  const reset = () => {
    setUnixEpochMilliseconds(0);
    setElapsedMilliseconds(0);
  };

  const formatTime = () => {
    const hours: number = Math.floor(elapsedMilliseconds / (1000 * 60 * 60));
    const minutes: number = Math.floor(
      (elapsedMilliseconds / (1000 * 60)) % 60
    );
    const seconds: number = Math.floor((elapsedMilliseconds / 1000) % 60);
    const milliseconds: number = Math.floor((elapsedMilliseconds % 1000) / 10);

    const hoursFormatted: string = String(hours).padStart(2, "0");
    const minutesFormatted: string = String(minutes).padStart(2, "0");
    const secondsFormatted: string = String(seconds).padStart(2, "0");
    const millisecondsFormatted: string = String(milliseconds).padStart(2, "0");

    return `${hoursFormatted}:${minutesFormatted}:${secondsFormatted}.${millisecondsFormatted}`;
  };

  useEffect(() => {
    if (unixEpochMilliseconds !== 0) {
      intervalIdRef.current = setInterval(() => {
        setElapsedMilliseconds(Date.now() - unixEpochMilliseconds);
      }, MILLISECOND_INTERVAL);
    }

    return () => {
      clearInterval(intervalIdRef.current);
    };
  }, [unixEpochMilliseconds]);

  // Load epoch on render from chrome storage
  useEffect(() => {
    chrome.storage.local.get({ unixEpochMilliseconds: 0 }, (result: any) => {
      if (chrome.runtime.lastError) {
        console.error("Error reading storage:", chrome.runtime.lastError);
      } else {
        setUnixEpochMilliseconds(result.unixEpochMilliseconds);
      }
    });
  }, []);

  // Save epoch to chrome storage
  useEffect(() => {
    chrome.storage.local.set({ unixEpochMilliseconds }, () => {
      if (chrome.runtime.lastError) {
        console.error("Error writing storage:", chrome.runtime.lastError);
      }
    });
  }, [unixEpochMilliseconds]);

  // Load elapsed time on render from chrome storage
  useEffect(() => {
    chrome.storage.local.get({ elapsedMilliseconds: 0 }, (result: any) => {
      if (chrome.runtime.lastError) {
        console.error("Error reading storage:", chrome.runtime.lastError);
      } else {
        setElapsedMilliseconds(result.elapsedMilliseconds);
      }
    });
  }, []);

  // Save epoch to chrome storage
  useEffect(() => {
    chrome.storage.local.set({ elapsedMilliseconds }, () => {
      if (chrome.runtime.lastError) {
        console.error("Error writing storage:", chrome.runtime.lastError);
      }
    });
  }, [elapsedMilliseconds]);

  return (
    <main className="m-4 w-max">
      <div className="flex flex-col justify-center">
        <h1 className="text-2xl font-bold">{formatTime()}</h1>
        <div className="flex gap-2 self-center">
          {unixEpochMilliseconds === 0 ? (
            <button
              type="button"
              className="p-2 border-2 rounded-2xl"
              onClick={start}
            >
              Start
            </button>
          ) : (
            <button
              type="button"
              className="p-2 border-2 rounded-2xl"
              onClick={stop}
            >
              Stop
            </button>
          )}
          <button
            type="button"
            className="p-2 border-2 rounded-2xl"
            onClick={reset}
          >
            Reset
          </button>
        </div>
      </div>
    </main>
  );
}

export default App;

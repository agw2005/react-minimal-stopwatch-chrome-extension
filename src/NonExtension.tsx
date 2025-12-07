import { useEffect, useRef, useState } from "react";

/**
 * This component is for testing stopwatch behaviors with Vite development server
 * Use App.tsx for the actual extension
 * Stopwatch is not running when <unixEpochMilliseconds === 0>
 */

const MILLISECOND_INTERVAL = 10;

function NonExtension() {
  const [unixEpochMilliseconds, setUnixEpochMilliseconds] = useState<number>(0);
  const [elapsedMilliseconds, setElapsedMilliseconds] = useState<number>(0);
  const intervalIdRef = useRef<number>(0);

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

  return (
    <div className="m-4">
      <h1 className="text-2xl font-bold">Stopwatch</h1>
      <p>Unix Epoch : {unixEpochMilliseconds}</p>
      <p>Date Epoch : {new Date(unixEpochMilliseconds).toUTCString()}</p>
      <p>Elapsed Time : {elapsedMilliseconds}</p>
      <p>Formatted : {formatTime()}</p>
      {unixEpochMilliseconds === 0 ? (
        <button type="button" className="p-2 border-2" onClick={start}>
          Start
        </button>
      ) : (
        <button type="button" className="p-2 border-2" onClick={stop}>
          Stop
        </button>
      )}
      <button type="button" className="p-2 border-2" onClick={reset}>
        Reset
      </button>
    </div>
  );
}

export default NonExtension;

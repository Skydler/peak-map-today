import { useState, useRef, useEffect } from "react";

type CountdownTimerProps = {
  initialRemainingTime: number; // in milliseconds
  onComplete?: () => void; // optional completion handler
  className?: string;
};
export default function CountdownTimer({
  initialRemainingTime,
  onComplete,
  className,
}: CountdownTimerProps) {
  // State to hold the current time remaining
  const [timeRemaining, setTimeRemaining] = useState(initialRemainingTime);

  // Reference to hold our interval ID
  const intervalRef = useRef<number | undefined>(undefined);

  useEffect(() => {
    intervalRef.current = setInterval(() => {
      setTimeRemaining((prevTime) => {
        if (prevTime <= 1) {
          clearInterval(intervalRef.current);
          onComplete?.();
          return 0;
        }

        return prevTime - 1000; // Decrease by 1 second (1000 ms)
      });
    }, 1000);

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, []);

  // Convert milliseconds to hours, minutes, seconds
  const totalSeconds = Math.floor(timeRemaining / 1000);
  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;
  return (
    <div className={className}>
      {hours.toString().padStart(2, "0")}:{minutes.toString().padStart(2, "0")}:
      {seconds.toString().padStart(2, "0")}
    </div>
  );
}

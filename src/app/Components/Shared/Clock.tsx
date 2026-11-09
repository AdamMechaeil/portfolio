"use client";

import { useEffect, useState } from "react";

// The ticking clock lives in its own component so only this small span
// re-renders every second, not the whole nav and its contact form.
export const Clock = () => {
  const [time, setTime] = useState<string | null>(null);

  useEffect(() => {
    const updateTime = () => {
      setTime(
        new Date().toLocaleTimeString("en-US", {
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
        }),
      );
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  if (time === null) return null;

  return (
    <span className="text-sm font-medium tabular-nums drop-shadow-md text-white">
      {time}
    </span>
  );
};

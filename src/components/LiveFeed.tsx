"use client";

import { useState } from 'react';
import { Button } from '@/components/ui/button';

const LiveFeed = () => {
  const [isRecording, setIsRecording] = useState(false);

  const toggleRecording = () => {
    setIsRecording(!isRecording);
    // TODO: Implement the recording start/stop logic here
    console.log('Recording toggled:', !isRecording);
  };

  return (
    <div className="flex flex-col items-center">
      <h2 className="text-xl mb-2">Live Feed</h2>
      <img
        src="https://source.unsplash.com/640x360?camera" // Placeholder image
        alt="Live Camera Feed"
        className="rounded-md shadow-lg w-full max-w-screen-md"
      />
      <Button
        onClick={toggleRecording}
        className="mt-4"
        variant={isRecording ? 'destructive' : 'default'}
      >
        {isRecording ? 'Stop Recording' : 'Start Recording'}
      </Button>
    </div>
  );
};

export default LiveFeed;

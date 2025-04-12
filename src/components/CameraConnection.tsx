"use client";

import { useState, useEffect } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

const CameraConnection = () => {
  const [ipAddress, setIpAddress] = useState(process.env.NEXT_PUBLIC_CAMERA_IP || '');

  useEffect(() => {
    // Initialize with the environment variable value on mount
    if (process.env.NEXT_PUBLIC_CAMERA_IP) {
      setIpAddress(process.env.NEXT_PUBLIC_CAMERA_IP);
    }
  }, []);

  const handleConnect = () => {
    // TODO: Implement the connection logic here
    console.log('Connecting to camera with IP:', ipAddress);
  };

  return (
    <div className="flex flex-col items-center">
      <h2 className="text-xl mb-2">Camera Connection</h2>
      <div className="flex space-x-2">
        <Input
          type="text"
          placeholder="Enter Camera IP Address"
          value={ipAddress}
          onChange={(e) => setIpAddress(e.target.value)}
          className="w-64"
        />
        <Button onClick={handleConnect}>Connect</Button>
      </div>
    </div>
  );
};

export default CameraConnection;


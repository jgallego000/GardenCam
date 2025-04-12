"use client";

import { useToast } from "@/hooks/use-toast";
import { useEffect, useState } from "react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

const History = () => {
  const { toast } = useToast();
  const [videoHistory, setVideoHistory] = useState<
    { id: number; name: string; previewUrl: string; timestamp: string }[]
  >([]);
  const [hasCameraPermission, setHasCameraPermission] = useState(false);

  useEffect(() => {
    // Fetch the video history from local storage or server
    const storedHistory = localStorage.getItem("videoHistory");
    if (storedHistory) {
      setVideoHistory(JSON.parse(storedHistory));
    }

    const getCameraPermission = async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ video: true });
        setHasCameraPermission(true);
      } catch (error) {
        console.error("Error accessing camera:", error);
        setHasCameraPermission(false);
        toast({
          variant: "destructive",
          title: "Camera Access Denied",
          description:
            "Please enable camera permissions in your browser settings to use this app.",
        });
      }
    };

    getCameraPermission();
  }, [toast]);

  // Function to get the day of the week in Spanish
  const getDayOfWeekInSpanish = (dateString: string) => {
    const date = new Date(dateString);
    const dayOfWeek = date.toLocaleDateString("es-ES", { weekday: "long" });
    return dayOfWeek.charAt(0).toUpperCase() + dayOfWeek.slice(1);
  };

  return (
    <div className="flex flex-col items-center">
      <h2 className="text-xl mb-2">History</h2>
      {!(hasCameraPermission) && (
        <Alert variant="destructive">
          <AlertTitle>Camera Access Required</AlertTitle>
          <AlertDescription>
            Please allow camera access to use this feature.
          </AlertDescription>
        </Alert>
      )}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {videoHistory.map((video) => (
          <div key={video.id} className="relative">
            <img
              src={video.previewUrl}
              alt={video.name}
              className="rounded-md shadow-md transition-transform transform hover:scale-105"
            />
            <span className="absolute bottom-2 left-2 text-sm text-white bg-gray-800 bg-opacity-60 px-2 py-1 rounded-md">
              {getDayOfWeekInSpanish(video.timestamp)} - {video.timestamp}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default History;

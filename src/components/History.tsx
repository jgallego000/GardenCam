"use client";

import { useToast } from "@/hooks/use-toast";
import { useEffect, useState } from "react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { ScrollArea } from "@/components/ui/scroll-area";

const History = () => {
  const { toast } = useToast();
  const [videoHistory, setVideoHistory] = useState<
    { id: number; name: string; previewUrl: string; timestamp: string }[]
  >([]);
  const [hasCameraPermission, setHasCameraPermission] = useState(false);
  const [recordingEvents, setRecordingEvents] = useState<Date[]>([]);

  useEffect(() => {
    // Load the video history from local storage or server
    const loadVideoHistory = () => {
      try {
        const storedHistory = localStorage.getItem("videoHistory");
        if (storedHistory) {
          setVideoHistory(JSON.parse(storedHistory));
        } else {
          // If no history exists, initialize with empty array
          setVideoHistory([]);
        }
      } catch (error) {
        console.error("Failed to load video history:", error);
        toast({
          variant: "destructive",
          title: "Load Failed",
          description: "Failed to load video history.",
        });
        setVideoHistory([]); // Ensure state is an empty array in case of error
      }
    };

    loadVideoHistory();

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

    // Generate dummy recording events for the last month
    const today = new Date();
    const lastMonth = new Date(
      today.getFullYear(),
      today.getMonth() - 1,
      today.getDate()
    );
    const events: Date[] = [];
    let currentDate = new Date(lastMonth);
    while (currentDate <= today) {
      if (Math.random() > 0.8) {
        events.push(new Date(currentDate));
      }
      currentDate.setDate(currentDate.getDate() + 1);
    }
    setRecordingEvents(events);
  }, [toast]);

  // Function to get the day of the week in Spanish
  const getDayOfWeekInSpanish = (dateString: string) => {
    const date = new Date(dateString);
    const dayOfWeek = date.toLocaleDateString("es-ES", { weekday: "long" });
    return dayOfWeek.charAt(0).toUpperCase() + dayOfWeek.slice(1);
  };

  const formatDate = (date: Date): string => {
    const day = date.getDate();
    const month = date.getMonth() + 1; // Months are 0-indexed
    return `${day}/${month}`;
  };

  const formatDateTitle = (date: Date): string => {
    const day = date.getDate();
    const month = date.getMonth() + 1; // Months are 0-indexed
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  };

  const isWeekend = (date: Date): boolean => {
    const dayOfWeek = date.getDay();
    return dayOfWeek === 0 || dayOfWeek === 6; // 0: Sunday, 6: Saturday
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

      {/* Timeline of Recording Events */}
      <div className="w-full max-w-screen-md">
        <h3 className="text-lg mb-2">Recording Timeline (Last Month)</h3>
        <ScrollArea className="h-24 rounded-md">
          <div className="flex space-x-2 p-2">
            {Array.from({ length: 30 }).map((_, index) => {
              const date = new Date();
              date.setDate(date.getDate() - 30 + index);
              const isRecordingDay = recordingEvents.some(
                (event) =>
                  event.toDateString() === date.toDateString()
              );
              return (
                <div
                  key={index}
                  className="flex flex-col items-center"
                >
                  <div
                    className={`w-6 h-4 rounded-full ${isRecordingDay
                      ? "bg-teal-500"
                      : "bg-gray-300"} ${isWeekend(date) ? "border-2 border-red-500" : ""
                      }`}
                    title={formatDateTitle(date)}
                  />
                  <span className="text-xs">{formatDate(date)}</span>
                </div>
              );
            })}
          </div>
        </ScrollArea>
      </div>

      {/* Display of Video History */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
        {videoHistory.map((video) => (
          <div key={video.id} className="relative">
            <img
              src={video.previewUrl}
              alt={video.name}
              className="rounded-md shadow-md transition-transform transform hover:scale-105"
            />
            <span className="absolute bottom-2 left-2 text-sm text-white bg-gray-800 bg-opacity-60 px-2 py-1 rounded-md">
              {getDayOfWeekInSpanish(video.timestamp)} - {new Date(video.timestamp).toLocaleDateString('es-ES', {
                year: 'numeric',
                month: '2-digit',
                day: '2-digit',
                hour: '2-digit',
                minute: '2-digit',
              })}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default History;

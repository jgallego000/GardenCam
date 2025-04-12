"use client";

const History = () => {
  // TODO: Fetch the video history from local storage or server
  const videoHistory = [
    { id: 1, name: 'Segment 1', previewUrl: 'https://picsum.photos/200/100', timestamp: '2024-07-24 10:00:00' },
    { id: 2, name: 'Segment 2', previewUrl: 'https://picsum.photos/200/100', timestamp: '2024-07-24 11:00:00' },
    { id: 3, name: 'Segment 3', previewUrl: 'https://picsum.photos/200/100', timestamp: '2024-07-24 12:00:00' },
  ];

  return (
    <div className="flex flex-col items-center">
      <h2 className="text-xl mb-2">History</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {videoHistory.map((video) => (
          <div key={video.id} className="relative">
            <img
              src={video.previewUrl}
              alt={video.name}
              className="rounded-md shadow-md transition-transform transform hover:scale-105"
            />
            <span className="absolute bottom-2 left-2 text-sm text-white bg-gray-800 bg-opacity-60 px-2 py-1 rounded-md">
              {video.name} - {video.timestamp}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default History;


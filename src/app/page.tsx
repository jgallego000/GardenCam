import CameraConnection from '@/components/CameraConnection';
import History from '@/components/History';
import LiveFeed from '@/components/LiveFeed';
import { Separator } from '@/components/ui/separator';

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <h1 className="text-2xl font-bold mb-4">WiFi Camera Stream</h1>
      <CameraConnection />
      <Separator className="w-80 my-4" />
      <LiveFeed />
      <Separator className="w-80 my-4" />
      <History />
    </div>
  );
}


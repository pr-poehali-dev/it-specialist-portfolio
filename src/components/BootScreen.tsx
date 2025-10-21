import { asciiArt } from '@/lib/asciiArt';

interface BootScreenProps {
  bootText: string;
}

const BootScreen = ({ bootText }: BootScreenProps) => {
  return (
    <div className="min-h-screen bg-black flex items-center justify-center">
      <div className="space-y-8 text-center">
        <div className="text-white text-6xl mb-4">🪟</div>
        <div className="text-white text-3xl font-bold">
          Microsoft Windows 98
        </div>
        <div className="flex flex-col items-center gap-2">
          <div className="w-64 h-3 bg-win98-dark-gray border-2 border-win98-white overflow-hidden">
            <div className="h-full bg-gradient-to-r from-win98-blue to-win98-teal animate-pulse"></div>
          </div>
          <div className="text-white text-sm animate-pulse">
            {bootText}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BootScreen;
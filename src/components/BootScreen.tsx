import { asciiArt } from '@/lib/asciiArt';

interface BootScreenProps {
  bootText: string;
}

const BootScreen = ({ bootText }: BootScreenProps) => {
  return (
    <div className="min-h-screen bg-dos-black flex items-center justify-center scanline">
      <div className="space-y-6 text-center">
        <pre className="text-dos-green text-sm leading-tight whitespace-pre">{asciiArt.computer}</pre>
        <div className="text-dos-green crt-effect text-2xl animate-pulse">
          {bootText}
        </div>
      </div>
    </div>
  );
};

export default BootScreen;

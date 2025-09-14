'use client';

import Image from 'next/image';

interface Platform {
  id: string;
  name: string;
  icon: string;
}

interface PlatformSelectorProps {
  platforms: Platform[];
  selectedPlatform: string;
  onPlatformChange: (platformId: string) => void;
}

export default function PlatformSelector({
  platforms,
  selectedPlatform,
  onPlatformChange
}: PlatformSelectorProps) {
  return (
    <div className="flex flex-wrap gap-3">
      {platforms.map((platform) => (
        <button
          key={platform.id}
          className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all ${
            selectedPlatform === platform.id
              ? 'bg-primary-600/50 text-white'
              : 'bg-gray-700/50 hover:bg-gray-700 text-gray-300'
          }`}
          onClick={() => onPlatformChange(platform.id)}
        >
          <Image
            src={platform.icon}
            alt={platform.name}
            width={20}
            height={20}
            className="w-5 h-5 object-contain"
          />
          <span>{platform.name}</span>
        </button>
      ))}
    </div>
  );
}
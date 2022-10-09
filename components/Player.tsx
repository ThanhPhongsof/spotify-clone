import {
  ArrowPathIcon,
  ArrowsRightLeftIcon,
  BackwardIcon,
  ForwardIcon,
  PauseCircleIcon,
  PlayCircleIcon,
  SpeakerWaveIcon,
} from "@heroicons/react/24/solid";

let isPlaying = false;

const Player = () => {
  return (
    <div className="h-24 bg-gradient-to-b from-black to-gray-900 grid grid-cols-3 text-xs md:text-base px-2 md:px-8">
      {/* Left */}
      <div className="flex items-center space-x-4">Selected Song</div>
      {/* End Left  */}

      {/* Center */}
      <div className="flex items-center justify-evenly">
        <ArrowsRightLeftIcon className="icon-playback" />
        <BackwardIcon className="icon-playback" />
        {isPlaying ? (
          <PauseCircleIcon className="icon-playback" />
        ) : (
          <PlayCircleIcon className="icon-playback" />
        )}
        <ForwardIcon className="icon-playback" />
        <ArrowPathIcon className="icon-playback" />
      </div>
      {/* End Center */}

      {/* Right */}
      <div className="flex justify-end items-center pr-5 space-x-3 md:space-x-4">
        <SpeakerWaveIcon className="icon-playback" />
        <input type="range" min={0} max={100} className="w-20 md:w-auto" />
      </div>
      {/* End Right */}
    </div>
  );
};

export default Player;

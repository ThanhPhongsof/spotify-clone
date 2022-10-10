import {
  ArrowPathIcon,
  ArrowsRightLeftIcon,
  BackwardIcon,
  ForwardIcon,
  PauseCircleIcon,
  PlayCircleIcon,
  SpeakerWaveIcon,
} from "@heroicons/react/24/solid";
import Image from "next/image";
import { ChangeEventHandler } from "react";
import { useDebouncedCallback } from "use-debounce";
import { useMusicContext } from "../contexts/MusicContext";
import useSpotify from "../hooks/useSpotify";
import { MusicReducerActionType } from "../types";

const Player = () => {
  const spotifyApi = useSpotify();
  const {
    musicContextState: { isPlaying, selectedMusic, deviceId, volume },
    dispatchMusicAction,
  } = useMusicContext();

  const handlePlayPause = async () => {
    const response = await spotifyApi.getMyCurrentPlaybackState();

    if (!response.body) return;

    if (response.body.is_playing) {
      await spotifyApi.pause();
      dispatchMusicAction({
        type: MusicReducerActionType.ToggleIsPlaying,
        payload: false,
      });
    } else {
      await spotifyApi.play();
      dispatchMusicAction({
        type: MusicReducerActionType.ToggleIsPlaying,
        payload: true,
      });
    }
  };

  const handleSkipMusic = async (skipTo: "previous" | "next") => {
    if (!deviceId) return;

    if (skipTo === "previous") await spotifyApi.skipToPrevious();
    else await spotifyApi.skipToNext();

    const musicInfo = await spotifyApi.getMyCurrentPlayingTrack();

    if (!musicInfo.body) return;

    dispatchMusicAction({
      type: MusicReducerActionType.SetCurrentPlayingMusic,
      payload: {
        selectedMusicId: musicInfo.body.item?.id,
        selectedMusic: musicInfo.body.item as SpotifyApi.TrackObjectFull,
        isPlaying: musicInfo.body.is_playing,
      },
    });
  };

  const debounceAdjustVolume = useDebouncedCallback((volume: number) => {
    spotifyApi.setVolume(volume);
  }, 500);

  const handleVolumeChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    const volume = Number(e.target.value);

    if (!deviceId) return;

    debounceAdjustVolume(volume);

    dispatchMusicAction({
      type: MusicReducerActionType.SetVolume,
      payload: volume,
    });
  };

  return (
    <div className="h-24 bg-gradient-to-b from-black to-gray-900 grid grid-cols-3 text-xs md:text-base px-2 md:px-8">
      {/* Left */}
      <div className="flex items-center space-x-4">
        {selectedMusic && (
          <>
            <div className="hidden md:block">
              <Image
                src={selectedMusic.album.images[0].url}
                alt={selectedMusic.name}
                height="40px"
                width="40px"
              />
            </div>
            <div>
              <h3>{selectedMusic.name}</h3>
              <p>{selectedMusic.artists[0].name}</p>
            </div>
          </>
        )}
        {!selectedMusic && (
          <div>
            <h3>No info music</h3>
          </div>
        )}
      </div>
      {/* End Left  */}

      {/* Center */}
      <div className="flex items-center justify-evenly">
        <ArrowsRightLeftIcon className="icon-playback" />
        <BackwardIcon
          className="icon-playback"
          onClick={handleSkipMusic.bind(this, "previous")}
        />
        {isPlaying ? (
          <PauseCircleIcon
            className="icon-playback"
            onClick={handlePlayPause}
          />
        ) : (
          <PlayCircleIcon className="icon-playback" onClick={handlePlayPause} />
        )}
        <ForwardIcon
          className="icon-playback"
          onClick={handleSkipMusic.bind(this, "next")}
        />
        <ArrowPathIcon className="icon-playback" />
      </div>
      {/* End Center */}

      {/* Right */}
      <div className="flex justify-end items-center pr-5 space-x-3 md:space-x-4">
        <SpeakerWaveIcon className="icon-playback" />
        <input
          type="range"
          min={0}
          max={100}
          className="w-20 md:w-auto"
          value={volume}
          onChange={handleVolumeChange}
        />
      </div>
      {/* End Right */}
    </div>
  );
};

export default Player;

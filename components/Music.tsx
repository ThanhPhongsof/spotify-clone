import Image from "next/image";
import { useMusicContext } from "../contexts/MusicContext";
import { usePlayListContext } from "../contexts/PlayListContext";
import useSpotify from "../hooks/useSpotify";
import { IMusic, MusicReducerActionType } from "../types";
import { convertDuration } from "../utils/convertDuration";

const Music = ({ item: { track }, itemIndex }: IMusic) => {
  const spotifyApi = useSpotify();

  const {
    musicContextState: { deviceId },
    dispatchMusicAction,
  } = useMusicContext();

  const {
    playlistContextState: { selectedPlayList },
  } = usePlayListContext();

  const playMusic = async () => {
    if (!deviceId) return;

    dispatchMusicAction({
      type: MusicReducerActionType.SetCurrentPlayingMusic,
      payload: {
        selectedMusicId: track?.id,
        selectedMusic: track,
        isPlaying: true,
      },
    });

    await spotifyApi.play({
      device_id: deviceId,
      context_uri: selectedPlayList?.uri,
      offset: {
        uri: track?.uri as string,
      },
    });
  };

  return (
    <div
      className="grid grid-cols-2 text-gray-500 px-5 py-4 hover:bg-gray-900 rounded-lg cursor-pointer"
      onClick={playMusic}
    >
      <div className="flex items-center space-x-4">
        <p>{itemIndex + 1}</p>
        <div className="">
          <Image
            src={track?.album.images[0].url || ""}
            alt={track?.name}
            height="40px"
            width="40px"
          />
        </div>
        <div className="">
          <p className="w-36 lg:w-72 truncate text-white">{track?.name}</p>
          <p className="w-40 lg:w-72">{track?.artists[0].name}</p>
        </div>
      </div>
      <div className="flex justify-between items-center ml-auto md:ml-0">
        <p className="hidden md:block w-40 lg:w-72">{track?.album.name}</p>
        <p>{convertDuration(track?.duration_ms as number)}</p>
      </div>
    </div>
  );
};

export default Music;

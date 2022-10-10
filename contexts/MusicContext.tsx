import { useSession } from "next-auth/react";
import {
  createContext,
  useContext,
  ReactNode,
  useReducer,
  useEffect,
} from "react";
import useSpotify from "../hooks/useSpotify";
import { musicReducer } from "../reducers/musicReducer";
import {
  IMusicContext,
  IMusicContextState,
  MusicReducerActionType,
} from "../types";

const defaultMusicContextState: IMusicContextState = {
  selectedMusic: null,
  selectedMusicId: undefined,
  isPlaying: false,
  volume: 50,
  deviceId: null,
};

export const MusicContext = createContext<IMusicContext>({
  musicContextState: defaultMusicContextState,
  dispatchMusicAction: () => {},
});

export const useMusicContext = () => useContext(MusicContext);

const MusicContextProvider = ({ children }: { children: ReactNode }) => {
  const spotifyApi = useSpotify();
  const { data: session } = useSession();
  const [musicContextState, dispatchMusicAction] = useReducer(
    musicReducer,
    defaultMusicContextState
  );

  useEffect(() => {
    const setCurrentDevice = async () => {
      const availableDeviceResponse = await spotifyApi.getMyDevices();

      if (!availableDeviceResponse.body.devices.length) return;

      const { id: deviceId, volume_percent } =
        availableDeviceResponse.body.devices[0];

      dispatchMusicAction({
        type: MusicReducerActionType.SetDevice,
        payload: {
          deviceId,
          volume: volume_percent as number,
        },
      });

      await spotifyApi.transferMyPlayback([deviceId as string]);
    };

    if (spotifyApi.getAccessToken()) {
      setCurrentDevice();
    }
  }, [spotifyApi, session]);

  useEffect(() => {
    const getCurrentPlayingMusic = async () => {
      const musicInfo = await spotifyApi.getMyCurrentPlayingTrack();

      if (!musicInfo.body) return;

      dispatchMusicAction({
        type: MusicReducerActionType.SetCurrentPlayingMusic,
        payload: {
          selectedMusic: musicInfo.body.item as SpotifyApi.TrackObjectFull,
          selectedMusicId: musicInfo.body.item?.id,
          isPlaying: musicInfo.body.is_playing,
        },
      });
    };

    if (spotifyApi.getAccessToken()) {
      getCurrentPlayingMusic();
    }
  }, [spotifyApi, session]);

  const musicContextProviderData = {
    musicContextState,
    dispatchMusicAction,
  };

  return (
    <MusicContext.Provider value={musicContextProviderData}>
      {children}
    </MusicContext.Provider>
  );
};

export default MusicContextProvider;

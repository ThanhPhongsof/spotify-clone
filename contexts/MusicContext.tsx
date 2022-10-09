import { useSession } from "next-auth/react";
import { createContext, useContext, ReactNode, useReducer } from "react";
import useSpotify from "../hooks/useSpotify";
import { IMusicContext, IMusicContextState } from "../types";

const defaultMusicContextState: IMusicContextState = {
  selectedMusic: null,
  selectedMusicId: undefined,
  isPlaying: false,
  volume: 50,
  deviceId: null,
};

export const MusicContext = createContext<IMusicContext>({
  musicContextState: defaultMusicContextState,
});

export const useMusicContext = () => useContext(MusicContext);

const MusicContextProvider = ({ children }: { children: ReactNode }) => {
  const spotifyApi = useSpotify();
  const { data: session } = useSession();
  const [musicContextState, dispatchMusicAction] = useReducer(
    musicReducer,
    defaultMusicContextState
  );

  // const [playlistContextState, setPlayListContextState] = useReducer(
  // defaultPlayListContextState

  const musicContextProviderData = {
    musicContextState: defaultMusicContextState,
  };

  return (
    <MusicContext.Provider value={musicContextProviderData}>
      {children}
    </MusicContext.Provider>
  );
};

export default MusicContextProvider;

import { useSession } from "next-auth/react";
import {
  createContext,
  useContext,
  ReactNode,
  useState,
  useEffect,
} from "react";
import useSpotify from "../hooks/useSpotify";
import { IPlayListContext, IPlayListContextState } from "../types";

const defaultPlayListContextState: IPlayListContextState = {
  playlists: [],
  selectedPlayList: null,
  selectedPlayListId: null,
};

export const PlayListContext = createContext<IPlayListContext>({
  playlistContextState: defaultPlayListContextState,
  updatePlayListContextState: () => {},
});

export const usePlayListContext = () => useContext(PlayListContext);

const PlayListContextProvider = ({ children }: { children: ReactNode }) => {
  const spotifyApi = useSpotify();
  const { data: session } = useSession();

  const [playlistContextState, setPlayListContextState] = useState(
    defaultPlayListContextState
  );

  const updatePlayListContextState = (
    updateObj: Partial<IPlayListContextState>
  ) => {
    setPlayListContextState((previousPlayListContextState) => ({
      ...previousPlayListContextState,
      ...updateObj,
    }));
  };

  useEffect(() => {
    const getUserPlaylists = async () => {
      const userPlaylistResponse = await spotifyApi.getUserPlaylists();
      updatePlayListContextState({
        playlists: userPlaylistResponse.body.items,
      });
    };

    if (spotifyApi.getAccessToken()) {
      getUserPlaylists();
    }
  }, [session, spotifyApi]);

  const playlistContextProviderData = {
    playlistContextState,
    updatePlayListContextState,
  };

  return (
    <PlayListContext.Provider value={playlistContextProviderData}>
      {children}
    </PlayListContext.Provider>
  );
};

export default PlayListContextProvider;

import { Session, User } from "next-auth";
import { JWT } from "next-auth/jwt";

export enum TokenError {
  RefreshAccessTokenError = "RefreshAccessTokenError",
}

export interface IExtendedToken extends JWT {
  accessToken: string;
  refreshToken: string;
  accessTokenExpiresAt: number;
  user: User;
  error?: TokenError;
}

export interface IExtendedSession extends Session {
  accessToken: IExtendedToken["accessToken"];
  error: IExtendedToken["error"];
}

export interface IPlayListContextState {
  playlists: SpotifyApi.PlaylistObjectSimplified[];
  selectedPlayListId: string | null;
  selectedPlayList: SpotifyApi.SinglePlaylistResponse | null;
}

export interface IPlayListContext {
  playlistContextState: IPlayListContextState;
  updatePlayListContextState: (
    updateObj: Partial<IPlayListContextState>
  ) => void;
}

export interface IMusic {
  item: SpotifyApi.PlaylistTrackObject;
  itemIndex: number;
}

export interface IMusicContextState {
  selectedMusicId?: string;
  selectedMusic: any | null;
  isPlaying: boolean;
  volume: number;
  deviceId: string | null;
}

export interface IMusicContext {
  musicContextState: IMusicContextState;
}

export enum MusicReducerActionType {
  SetDevice = "SetDevice",
}

export type MusicReducerAction = {
  type: MusicReducerActionType.SetDevice;
  payload: Pick<IMusicContextState, "deviceId" | "volume">;
};

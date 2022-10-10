import {
  IMusicContextState,
  MusicReducerAction,
  MusicReducerActionType,
} from "../types";

export const musicReducer = (
  state: IMusicContextState,
  { type, payload }: MusicReducerAction
): IMusicContextState => {
  switch (type) {
    case MusicReducerActionType.SetDevice:
      return {
        ...state,
        deviceId: payload.deviceId,
        volume: payload.volume,
      };
    case MusicReducerActionType.ToggleIsPlaying:
      return {
        ...state,
        isPlaying: payload,
      };
    case MusicReducerActionType.SetCurrentPlayingMusic:
      const { selectedMusic, selectedMusicId, isPlaying } = payload;
      return {
        ...state,
        selectedMusic,
        selectedMusicId,
        isPlaying,
      };
    case MusicReducerActionType.SetVolume:
      return {
        ...state,
        volume: payload
      };
    default:
      return state;
  }
};

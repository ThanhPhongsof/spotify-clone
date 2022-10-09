import { signIn, useSession } from "next-auth/react";
import { useEffect } from "react";
import { spotifyApi } from "../config/spotify";
import { IExtendedSession, TokenError } from "../types";

const useSpotify = () => {
  const { data: session } = useSession();

  useEffect(() => {
    if (!session) return;

    // if refresh token fails, redirect to login page
    if (
      (session as IExtendedSession).error === TokenError.RefreshAccessTokenError
    ) {
      signIn();
    }
    spotifyApi.setAccessToken((session as IExtendedSession).accessToken);
  }, [session]);

  return spotifyApi;
};

export default useSpotify;

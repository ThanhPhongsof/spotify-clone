import NextAuth, { CallbacksOptions } from "next-auth";
import SpotifyProvider from "next-auth/providers/spotify";
import { scopes, spotifyApi } from "../../../config/spotify";
import { IExtendedToken, TokenError } from "../../../types";

const refreshAccessToken = async (
  token: IExtendedToken
): Promise<IExtendedToken> => {
  try {
    spotifyApi.setAccessToken(token.accessToken);
    spotifyApi.setRefreshToken(token.refreshToken);

    const { body: refreshedTokens } = await spotifyApi.refreshAccessToken();
    console.log("REFRESHED TOKEN ARE", refreshedTokens);

    return {
      ...token,
      accessToken: refreshedTokens.access_token,
      refreshToken: refreshedTokens.refresh_token || token.refreshToken,
      accessTokenExpiresAt: Date.now() + refreshedTokens.expires_in * 1000,
    };
  } catch (error) {
    console.log("REFRESHED TOKEN ERROR", error);

    return { ...token, error: TokenError.RefreshAccessTokenError };
  }
};

const jwtCallback: CallbacksOptions["jwt"] = async ({
  token,
  account,
  user,
}) => {
  let extendedToken: IExtendedToken;

  // User logs in for the first time
  if (account && user) {
    extendedToken = {
      ...token,
      user,
      accessToken: account.access_token as string,
      refreshToken: account.refresh_token as string,
      accessTokenExpiresAt: (account.expires_at as number) * 1000, // convert to milliseconds
    };
    return extendedToken;
  }
  // Subsequent requests to check auth sessions
  if (Date.now() + 5000 < (token as IExtendedToken).accessTokenExpiresAt) {
    console.log("ACCESS TOKEN STILL VALID, RETURNING EXTENDED TOKEN:", token);
    return token;
  }

  // Access token has expired => refresh it
  console.log("ACCESS TOKEN EXPIRES, REFRESHING");
  return await refreshAccessToken(token as IExtendedToken);
};

const sessionCallback: CallbacksOptions["session"] = async ({
  session,
  token,
}) => {
  session.accessToken = (token as IExtendedToken).accessToken;
  session.error = (token as IExtendedToken).error;

  return session;
};

export default NextAuth({
  providers: [
    SpotifyProvider({
      clientId: process.env.SPOTIFY_CLIENT_ID as string,
      clientSecret: process.env.SPOTIFY_CLIENT_SECRET as string,
      authorization: {
        url: "https://accounts.spotify.com/authorize",
        params: {
          scope: scopes,
        },
      },
    }),
  ],
  pages: {
    signIn: "/login",
  },
  callbacks: {
    jwt: jwtCallback,
    session: sessionCallback,
  },
});

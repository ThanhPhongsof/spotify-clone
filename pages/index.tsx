import type { NextPage } from "next";
import Head from "next/head";
import Center from "../components/Center";
import Player from "../components/Player";
import Sidebar from "../components/Sidebar";
import MusicContextProvider from "../contexts/MusicContext";
import PlayListContextProvider from "../contexts/PlayListContext";

const Home: NextPage = () => {
  return (
    <div className="bg-black h-screen overflow-hidden">
      <PlayListContextProvider>
        <MusicContextProvider>
          <Head>
            <title>Spotify 2.0</title>
            <meta name="description" content="Spotify by TP" />
            <link rel="icon" href="/favicon.ico" />
          </Head>

          <main className="flex">
            <Sidebar />
            <Center />
          </main>

          <div className="sticky bottom-0 text-white">
            <Player />
          </div>
        </MusicContextProvider>
      </PlayListContextProvider>
    </div>
  );
};

export default Home;

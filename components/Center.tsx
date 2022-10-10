import { useSession, signOut } from "next-auth/react";
import Image from "next/image";
import { usePlayListContext } from "../contexts/PlayListContext";
import UserIcon from "../assets/user.png";
import { ChevronDownIcon } from "@heroicons/react/outline";
import { useEffect, useState } from "react";
import { pickRandom } from "../utils/pickRandom";
import ListMusic from "./ListMusic";

const colours = [
  "from-indigo-500",
  "from-blue-500",
  "from-green-500",
  "from-red-500",
  "from-orange-500",
  "from-pink-500",
];

const Center = () => {
  const {
    playlistContextState: { selectedPlayList, selectedPlayListId },
  } = usePlayListContext();
  const { data: session } = useSession();
  const [fromColours, setFromColours] = useState<string | null>(null);

  useEffect(() => {
    setFromColours(pickRandom(colours));
  }, [selectedPlayListId]);

  return (
    <div className="text-white flex-grow relative h-screen overflow-y-scroll scrollbar-hidden">
      <header className="absolute top-5 right-8">
        <div
          className="flex items-center bg-black space-x-3 opacity-90 hover:opacity- cursor-pointer rounded-full py-1 pl-1 pr-2"
          onClick={() => {
            signOut();
          }}
        >
          <Image
            src={session?.user?.image || UserIcon}
            alt="User Avatar"
            height="40px"
            width="40px"
            className="rounded-full object-cover"
          />
          <h2>{session?.user?.name}</h2>
          <ChevronDownIcon className="icon" />
        </div>
      </header>
      <section
        className={`flex items-end space-x-7 bg-gradient-to-b ${fromColours} to-black h-80 p-8`}
      >
        {selectedPlayList && (
          <>
            <Image
              src={selectedPlayList.images[0].url}
              alt="Playlist image"
              height="176px"
              width="176px"
              className="shadow-2xl"
            />
            <div className="">
              <p className="uppercase">playlist</p>
              <h1 className="text-2xl font-bold md:text-3xl xl:text-5xl">
                {selectedPlayList.name}
              </h1>
            </div>
          </>
        )}
      </section>
      <div className="songs">
        <ListMusic />
      </div>
    </div>
  );
};

export default Center;

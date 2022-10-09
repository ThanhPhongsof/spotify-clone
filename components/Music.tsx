import Image from "next/image";
import { IMusic } from "../types";
import { convertDuration } from "../utils/convertDuration";

const Music = ({ item: { track }, itemIndex }: IMusic) => {
  console.log(track);

  return (
    <div className="grid grid-cols-2 text-gray-500 px-5 py-4 hover:bg-gray-900 rounded-lg cursor-pointer">
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

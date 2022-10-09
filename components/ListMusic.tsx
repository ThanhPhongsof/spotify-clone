import { usePlayListContext } from "../contexts/PlayListContext";
import Music from "./Music";

const ListMusic = () => {
  const {
    playlistContextState: { selectedPlayList },
  } = usePlayListContext();

  if (!selectedPlayList) return null;

  return (
    <div className="flex flex-col space-y-1 px-8 pb-28">
      {selectedPlayList.tracks.items?.map((item, index) => (
        <Music key={item.track?.id} item={item} itemIndex={index} />
      ))}
    </div>
  );
};

export default ListMusic;

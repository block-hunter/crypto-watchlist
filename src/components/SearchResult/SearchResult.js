import { useState } from "react";
import "./SearchResult.scss"

const SearchResult = ({
  coin,
  watchlist,
  setWatchlist,
}) => {
  const [isSelected, setIsSelected] = useState(
    watchlist.includes(coin.id)
  );

  const toggle = () => {
    if (watchlist.includes(coin.id)) {
      setWatchlist((prevWatchlist) =>
        prevWatchlist.filter((c) => c !== coin.id)
      );
      setIsSelected(false);
    } else {
      setWatchlist((prevWatchlist) => [...prevWatchlist, coin.id]);
      setIsSelected(true);
    }
  };

  return (
    <div
      className={`result ${
        isSelected && "selected-box"
      }`}
    >
      <div className="title">
        <img src={coin.image} alt={coin.name} className="w-5 object-contain" />
        <span>
          <span className="uppercase font-semibold text-xxs ml-2 truncate">
            {coin.name}
          </span>
        </span>
      </div>

      {/* switch input */}

      <label className="switch">
        <input type="checkbox" className="switch-input" onChange={toggle} checked={isSelected} />
        <span className="slider round"></span>
      </label>
    </div>
  );
};

export default SearchResult;
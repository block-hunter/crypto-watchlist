import { useEffect, useState } from "react";
import axios from "axios";
import SearchResult from "../SearchResult/SearchResult";

import "./AddCryptoForm.scss"

const AddCryptoForm = ({
  setWatchlist,
  watchlist,
}) => {

  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [coins, setCoins] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const CancelToken = axios.CancelToken;
    const source = CancelToken.source();

    const fetchData = async () => {
      setLoading(true);
      await axios
        .get("https://api.coingecko.com/api/v3/coins/markets", {
          cancelToken: source.token,
          params: {
            vs_currency: "usd",
            price_change_percentage: "24h",
            per_page: 250,
          },
        })
        .then((res) => setCoins(res.data))
        .catch((err) => {
          if (axios.isCancel(err)) {
            console.log("Fetching aborted");
          } else {
            console.log(err.message);
          }
        });

      setLoading(false);
    };

    fetchData();

    return () => source.cancel();
  }, []);

  useEffect(() => {
    if (searchQuery.length > 0 && coins.length > 0) {
      setSearchResults(
        coins.filter((c) =>
          [c.id, c.name, c.symbol].some((i) =>
            i.toLowerCase().includes(searchQuery.toLowerCase())
          )
        )
      );
    }
  }, [searchQuery, coins]);

  return (
    <div
      className="add-crypto-form"
      onClick={(e) => e.stopPropagation()}
    >
      <div>
        {/* Search bar */}
        <input
          type="text"
          value={searchQuery}
          placeholder="Search coins.."
          onChange={(e) => setSearchQuery(e.target.value)}
          className="search-input"
        />

        <div className="overflow-y-auto scrollbar-thin scrollbar-thumb-blue-900 scrollbar-track-gray-50 pr-2 h-48">
          {searchQuery.length > 0 &&
            searchResults.length > 0 &&
            searchResults.map((c) => (
              <SearchResult
                key={c.id}
                coin={c}
                watchlist={watchlist}
                setWatchlist={setWatchlist}
              />
            ))}
          {searchQuery.length > 0 && searchResults.length === 0 && (
            <p className="info-text">No results found.</p>
          )}
          {searchQuery.length === 0 &&
            coins.map((c) => (
              <SearchResult
                key={c.id}
                coin={c}
                watchlist={watchlist}
                setWatchlist={setWatchlist}
              />
            ))}
          {loading && (
            <p className="info-text">Loading...</p>
          )}
        </div>
      </div>
    </div>
  );
};


export default AddCryptoForm;
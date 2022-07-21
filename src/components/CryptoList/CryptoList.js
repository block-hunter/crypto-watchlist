import React, { useEffect, useState } from 'react';
import axios from 'axios';
import CryptoItem from '../CryptoItem/CryptoItem';
import Pagination from '../UI/Pagination/Pagination';

import "./CryptoList.scss";



const CryptoList = ({watchlist, setWatchlist}) => {

  const [coins, setCoins] = useState([]);
  const [loading, setLoading] = useState(false);
  // pagination
  const [currentPage, setCurrentPage] = useState(1);

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
            ids: watchlist.join(","),
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

    if (watchlist.length > 0) {
      fetchData();
    } else setCoins([]);

    localStorage.setItem("watchlist", JSON.stringify(watchlist));

    return () => source.cancel();
  }, [watchlist]);


  // Pagination
  let coinsPerPage = 4;
  const indexOfLastCoin = currentPage * coinsPerPage;
  const indexOfFirstCoin = indexOfLastCoin- coinsPerPage;
  const currentCoins = coins.slice(indexOfFirstCoin, indexOfLastCoin);

  const paginate = (number) => setCurrentPage(number)

  return (
    <>
      <ul className='crypto-list'>
          {currentCoins.length === 0 && loading ? (
            <span className="text-center my-10">Loading...</span>
          ) : (
            currentCoins.map((c) => <CryptoItem key={c.id} coin={c} watchlist={watchlist} setWatchlist={setWatchlist} />)
          )}
      </ul>

      <Pagination coinsPerPage={coinsPerPage} totalCoins={coins.length} paginate={paginate}  />

      {watchlist.length === 0 && (
        <div className="flex flex-col text-center mt-4 font-semibold text-sm">
          <p>Your watchlist is empty.</p>
          <p>Click the button below to track some cryptocurrencies.</p>
        </div>
      )}
    </>
  );
};

export default CryptoList;
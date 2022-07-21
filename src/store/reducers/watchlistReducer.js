import { createSlice } from "@reduxjs/toolkit";

const initialWatchlistState = [
    {
        id: 'bitcoin',
        count: 15,
    },
    {
        id: 'usd-coin',
        count: 4,
    },
    {
        id: 'ethereum',
        count: 1,
    },
];

const watchlistReducer = createSlice({
    name: 'watchlist',
    initialState: initialWatchlistState,
    reducers: {
        addCoin(state, action) {
            if (state.includes(coin.id)) {
                setWatchlsist((prevWatchlist) =>
                  prevWatchlist.filter((c) => c !== coin.id)
                );
                setIsSelected(false);
              } else {
                setWatchlist((prevWatchlist) => [...prevWatchlist, coin.id]);
                setIsSelected(true);
              }
        },
        deleteCoin(state, action) {

        },
        changeCount(state, action) {

        }
    }
});

export const {addCoin, deleteCoin, changeCount}= watchlistReducer.actions;

export default watchlistReducer;
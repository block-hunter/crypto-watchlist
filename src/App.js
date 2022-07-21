import { useState } from "react";
import {ToastContainer} from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import "./App.scss";
import { AddCryptoForm, CryptoList, Nav } from "./components";

function App() {

  const [list, setList] = useState("watchlist");
  const [watchlist, setWatchlist] = useState(
    JSON.parse(localStorage.getItem("watchlist")) || []
  );



  return (
    <div className="container">
      <div className="app">
        <Nav listPage={list} setListPage={setList} />

        {
          list === 'watchlist' ? <CryptoList watchlist={watchlist} setWatchlist={setWatchlist} /> :
            (<AddCryptoForm watchlist={watchlist} setWatchlist={setWatchlist} />)
        }
      </div>

      <ToastContainer />
    </div>
  );
}

export default App;

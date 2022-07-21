import {confirmAlert} from "react-confirm-alert"
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faTrash} from "@fortawesome/free-solid-svg-icons"
import formatPrice from '../../utils/formatPrice';

import {toast} from "react-toastify";

import 'react-confirm-alert/src/react-confirm-alert.css';
import "./CryptoItem.scss";

const CryptoItem = ({watchlist, setWatchlist, coin}) => {


  const openDeleteModal = () => {

    confirmAlert({
      title: 'Confirm to Delete ' + coin.symbol ,
      message: 'Are you sure to do this.',
      buttons: [
        {
          label: 'Yes',
          onClick: () => deleteCoin()
        },
        {
          label: 'No',
          onClick: () => alert('Click No')
        }
      ]
    });
  }

  const deleteCoin = () => {
    if (watchlist.includes(coin.id)) {
      setWatchlist((prevWatchlist) =>
        prevWatchlist.filter((c) => c !== coin.id)
      );
      toast(`${coin.name} Deleted`)
    } else {
      setWatchlist((prevWatchlist) => [...prevWatchlist, coin.id]);
    }
  }

  return (
    <li className='crypto-item'>
        <div className="img-box">
          <img src={coin.image} className="coin-img" alt={coin.name} />
        </div>

        <div className='title'>
            <h4>{coin.name}</h4>
        </div>
        
        <div className='price'>${formatPrice(coin.current_price)}</div>

        <div className="counter">
          <span class="minus">-</span>
          <input type="text" class="counter-input" value={1} disabled />
          <span class="plus">+</span>
        </div>

        <div className='delete'>
            <FontAwesomeIcon icon={faTrash} onClick={openDeleteModal} />
        </div>
    </li>
  );
};

export default CryptoItem;
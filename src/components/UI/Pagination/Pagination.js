import "./Pagination.scss";

const Pagination = ({coinsPerPage, totalCoins, paginate}) => {
    const pageNumbers = [];

    for(let i = 1; i <= Math.ceil(totalCoins / coinsPerPage); i++) {
        pageNumbers.push(i)
    }
        
    return (
       <div className="page-box">
            {
                pageNumbers.map(number => (
                    <div key={number} className="page-item"> 
                        <a href="#!" onClick={() => paginate(number)} className='page-link'>
                            {number}
                        </a>
                    </div>
                ))
            }
        </div>
    )
}

export default Pagination
import { useState, useEffect} from 'react'

export default function Pagination({ pokedex, page, handleNewPage, handlePageResults, results }) {
    const [pageIndx, setPageIndx] = useState([]);
    const totalPages = Math.floor(1008 / pokedex.length);
    const pageNumbers = Array.from({ length: totalPages }, (_, index) => index + 1);

    useEffect(() => {
        const indxNum = page + 9;
        const indxArr = Array.from({ length: indxNum }, (_, index) => index + 1);

        handlePageIndx(pageNumbers, indxArr);
    }, [page]);

    const handlePageIndx = (pageArr, listArr) => {
        const indxArr = [];
    
        for (let i = 0; i <= pageArr.length; i++) {
            for (let y = 0; y <= listArr.length; y++) {
                if (i === y && i >= page) {
                    indxArr.push(y);
                }
            }
        }

        for (let i = 0; i < 11; i++) {
            if (indxArr.length < 10) {
                indxArr.unshift(page--)
            } else {
                break;
            }
        }
    
        setPageIndx(indxArr);
        return indxArr;
    };
    
    const handlePageNum = (num) => {
        if (num == page) {
            return 'current';
        } else if (num < 0) {
            return 'none';
        }
    }

    const handlePerPageChange = (e) => {
        const perPage = parseInt(e.target.value);
        handlePageResults(perPage);
      };

    return (
        <div className='Pagination'>
            <div className='page-container'>
                <button className={`page-btn ${page < 10 ? 'inactive' : null}`} onClick={() => handleNewPage(page - 10)}>{'<<'}</button>
                <button className={`page-btn ${page === 0 ? 'inactive' : null}`} onClick={() => handleNewPage(page - 1)}>{'<'}</button>
                <div className='page'>
                    {page > 0 && totalPages >= 10 && <div className='page-number' onClick={() => handleNewPage(0)}><p>1...</p></div>}
                    {pageIndx.map((num) => (
                    <div className={`page-number ${handlePageNum(num)}`} onClick={() => handleNewPage(num)} key={num}><p>{num + 1}</p></div>
                    ))}
                    {page < totalPages - 9 && <div className='page-number' onClick={() => handleNewPage(totalPages)}><p>...{totalPages + 1}</p></div>}
                </div>
                <button className={`page-btn ${page === totalPages ? 'inactive' : null}`} onClick={() => handleNewPage(page + 1)}>{'>'}</button>
                <button className={`page-btn ${page > totalPages - 10 ? 'inactive' : null}`} onClick={() => handleNewPage(page + 10)}>{'>>'}</button>
            </div>
            
            <div className="result-container">
                <label>Results per page: </label>
                <select className="dropdown-container" onChange={handlePerPageChange}>
                <option className="dropdown-default">{results}</option>
                <option className="dropdown-item" value="10">10</option>
                <option className="dropdown-item" value="20">20</option>
                <option className="dropdown-item" value="50">50</option>
                <option className="dropdown-item" value="100">100</option>
                <option className="dropdown-item" value="250">250</option>
                <option className="dropdown-item" value="1010">All</option>
                </select>
            </div>
        </div>
    )
}

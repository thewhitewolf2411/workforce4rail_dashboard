import React from "react";
import Pagination from "../../../../app/common/Pagination";

function TableController({numberOfResults, page, setNumberOfResults, setPage}) {

    return(
        <div className="table__controller">

            <div className="results__selector">
                <select onChange={e => setNumberOfResults(parseInt(e.target.value))}>
                    <option value={10} selected={numberOfResults === 10 ? true : false}>10</option>
                    <option value={20} selected={numberOfResults === 20 ? true : false}>20</option>
                    <option value={50} selected={numberOfResults === 50 ? true : false}>50</option>
                    <option value={100} selected={numberOfResults === 100 ? true : false}>100</option>
                </select>
            </div>

            <div className="page__selector">
                <Pagination postPerPage={numberOfResults} totalPosts={10} page={page} setPage={setPage} />
            </div>

        </div>
    );

}

export default TableController;
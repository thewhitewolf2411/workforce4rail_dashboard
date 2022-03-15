import React from "react";
import Pagination from "../Pagination";

function TableController({numberOfResults, page, setNumberOfResults, setPage, numberOfPages}) {

    const handleChange = (value) => {
        setNumberOfResults(parseInt(value));
        setPage(1);
    }

    return(
        <div className="table__controller">

            <div className="results__selector">
                <select onChange={e => handleChange(parseInt(e.target.value))} defaultValue={numberOfResults}>
                    <option value={10}>10</option>
                    <option value={20}>20</option>
                    <option value={50}>50</option>
                    <option value={100}>100</option>
                </select>
            </div>

            <div className="page__selector">
                <Pagination page={page} setPage={setPage} numberOfPages={numberOfPages}/>
            </div>

        </div>
    );

}

export default TableController;
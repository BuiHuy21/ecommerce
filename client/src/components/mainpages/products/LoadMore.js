import React, { useContext } from "react";
import { GlobalState } from "../../../GlobalState";
function LoadMore() {
  const state = useContext(GlobalState);
  const [page, setPage] = state.productsAPI.page;
  const [results] = state.productsAPI.results;
  return (
    <div className="load_more">
      {results < page * 8 ? (
        " "
      ) : (
        <button onClick={() => setPage(page + 1)}>Load more</button>
      )}
    </div>
  );
}

export default LoadMore;

import { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";

const SearchView = (props) => {

    const [listType, setListTtpe] = useState();
    const listRef = useRef();
    const filterRef = useRef({});
    const selectedOption = useRef();
    const selectedFilter = useRef();
    const isListVisible = useRef(false);
    const data = useSelector(state => state);

    useEffect(() => {
        if (listType) listRef.current.style.left = listType.position.x + "px";
    }, [listType])

    function listItemClickHandler(e) {
        filterRef.current[selectedOption.current] = e.target.textContent;
        selectedFilter.current.textContent = `Filter ${selectedOption.current} - ${e.target.textContent} `;
        if (e.target.textContent == "All") delete filterRef.current[selectedOption.current];
        props.onUpdateSearch(filterRef.current);
        setListTtpe(undefined);
        isListVisible.current = false;
    }

    function onClickHandler(e, type) {
        selectedOption.current = type;
        let element = e.currentTarget;
        selectedFilter.current = element;
        isListVisible.current = true;
        let citiesObj = groupBy(data, type);
        let spaceOption = ["0 - 10", "10 - 100", "0 - 100", "100 - 1000", "0 - 1000", "1000 - 10000"];
        setListTtpe({ type: type, position: { x: element.offsetLeft }, arrOption: type == "space" ? spaceOption : Object.keys(citiesObj) })
    }

    function searchTextChangeHandler(e) {
        filterRef.current["searchText"] = e.currentTarget.textContent;
        props.onUpdateSearch(filterRef.current);
    };

    var groupBy = function (xs, key) {
        return xs.reduce(function (rv, x) {
            (rv[x[key]] = rv[x[key]] || []).push(x);
            return rv;
        }, {});
    };

    return (
        <div className="search-container">
            <div className="search-lable" contentEditable="true" data-text="Search name" onInput={(e) => searchTextChangeHandler(e)} />
            <div className="search-filter" onClick={(e) => onClickHandler(e, "city")}>Filter city - All</div>
            <div className="search-filter" onClick={(e) => onClickHandler(e, "cluster")}>Filter cluster - All</div>
            <div className="search-filter" onClick={(e) => onClickHandler(e, "space")}>Filter space - All</div>
            {isListVisible.current && <div ref={listRef} className="filter-list-container">
                <ul className="filter-list" onClick={(e) => listItemClickHandler(e)}>
                    <li key="all">All</li>
                    {listType.arrOption.map(city => <li key={city}> {city} </li>)}
                </ul>
                <button className="close-list" onClick={(e) => {
                    isListVisible.current = false;
                    setListTtpe(undefined)
                }}>X</button>
            </div>}
        </div>
    )
}

export default SearchView;
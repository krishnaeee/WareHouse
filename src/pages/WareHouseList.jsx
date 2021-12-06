import { useSelector } from 'react-redux';
import '../style/componentstyle.scss';
import InfoRow from '../componemt/InfoRow';
import SearchView from '../componemt/SearchView';
import { useRef, useState } from 'react';
import { Link } from 'react-router-dom'

const WareHouseList = (props) => {

    const linkRef = useRef();
    const data = useSelector(state => state);
    const [arrWareHouseList, setWareHouseList] = useState(data);

    function searchHendler(filterData) {
        if (Object.keys(filterData).length == 0) {
            setWareHouseList(data);
            return;
        }
        let arrFilterList = Object.entries(filterData).reduce((arr, obj) => {
            let result = arr.filter(item => {
                if (obj[0] == "space") {
                    let minVal = obj[1].split("-")[0].trim();
                    let maxVal = obj[1].split("-")[1].trim();
                    let space = item["space_available"];
                    return space >= parseInt(minVal) && space <= maxVal
                } else if (obj[0] == "searchText") {
                    return item["name"].includes(obj[1])
                }
                return item[obj[0]] == obj[1].trim(obj[1].trim);
            })
            return result;
        }, data);
        setWareHouseList(arrFilterList);
    }

    return (
        <div className="warehouse-list">
            <InfoRow class='-header' link={false} data={{ name: "Name", city: "City", type: "Type", "space_available": "Space", "is_live": "Live" }} />
            <SearchView onUpdateSearch={searchHendler} ></SearchView>
            <ul className="list">
                {arrWareHouseList.map(warehouse => <li key={Math.random()} data-id={warehouse.id}><InfoRow data={warehouse} /></li>)}
            </ul>
            <Link ref={linkRef} to={`/adddetail`} />
            <div className="add-btn" onClick={() => { linkRef.current.click() }}>Add</div>
        </div>
    )
}

export default WareHouseList;
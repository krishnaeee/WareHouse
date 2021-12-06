import '../style/componentstyle.scss';
import { useRef, useState } from 'react';
import { useNavigate, useParams } from 'react-router';
import { useSelector } from 'react-redux';
import { addWarehouse, updateWarehouse } from '../Store';
import { useDispatch } from 'react-redux';

const defaultItem = {
    "name": "",
    "code": "W-000011",
    "id": Math.random(),
    "city": "",
    "space_available": "",
    "type": "Leasable Space",
    "cluster": "",
    "is_registered": false,
    "is_live": false
}

const WareHouseDetail = ({ operation }) => {
    const params = useParams();
    const dispatch = useDispatch();
    const data = useSelector(state => state)
    const formRef = useRef();
    const [item, setItem] = useState(defaultItem);
    const [isLive, setLive] = useState(item["is_live"]);
    const [arrCustomPropertis, setCustomProperties] = useState([]);
    const editData = useRef();
    const strbtnTitle = operation == "update" ? "Update" : "Save";
    const navigate = useNavigate()

    useState(() => {
        let selectedObj = params.id ? data.find(item => item.id == params.id) : item;
        setItem(selectedObj);
        setLive(selectedObj["is_live"]);
        editData.current = selectedObj;
    }, [])

    function btnLiveClickHandler(e) {
        setLive((previousVal) => {
            editData.current[e.target.dataset.id] = !previousVal;
            return !previousVal
        });
    }

    function addPropertyHandler(e) {
        let arrProps = [...arrCustomPropertis];
        arrProps.push(e.target.previousSibling.textContent);
        formRef.current.scrollTop = formRef.current.scrollHeight;
        setCustomProperties(arrProps);
    }

    function inputHandler(e) {
        if (e.target.dataset.id == "space_available") {
            e.target.textContent = /^\d*\d*$/.test(e.target.textContent) ? e.target.textContent : "";
        }
        editData.current[e.target.dataset.id] = e.target.textContent;
    }

    function onSubmitHandler() {
        let arrInputElement = Array.from(formRef.current.querySelectorAll("[contentEditable='true']"));
        for (let element of arrInputElement) {
            if (element.textContent.trim() == "") {
                alert("Fields cannot be empty");
                return;
            }
        }
        operation == "update" ? dispatch(updateWarehouse(editData.current)) : dispatch(addWarehouse(editData.current));
        navigate("/");
    }

    return (
        <div className="warehouse-detail">
            <div className="form-container">
                <ul className="form" ref={formRef}>
                    <li>
                        <div className="form-row">
                            <div className="title">Ware House Name</div>
                            <div className="input" data-id="name" spellCheck="false" contentEditable="true" onInput={inputHandler}>{item.name}</div>
                        </div>
                    </li>
                    <li>
                        <div className="form-row">
                            <div className="title">City</div>
                            <div className="input" data-id="city" spellCheck="false" contentEditable="true" onInput={inputHandler}>{item.city}</div>
                        </div>
                    </li>
                    <li>
                        <div className="form-row">
                            <div className="title">Cluster</div>
                            <div className="input" data-id="cluster" spellCheck="false" contentEditable="true" onInput={inputHandler}>{item.cluster}</div>
                        </div>
                    </li>
                    <li>
                        <div className="form-row">
                            <div className="title">Space</div>
                            <div className="input" data-id="space_available" spellCheck="false" contentEditable="true" onInput={inputHandler}>{item["space_available"]}</div>
                        </div>
                    </li>
                    {arrCustomPropertis.map(property => {
                        return (
                            <li>
                                <div className="form-row">
                                    <div className="title">{property}</div>
                                    <div className="input" data-id={property.trim().toLowerCase()} spellCheck="false" contentEditable="true" onInput={inputHandler}></div>
                                </div>
                            </li>
                        )
                    })}
                    <li>
                        <div className="form-row-live">
                            <div className="title">Live</div>
                            <div className={isLive ? "inputOn" : "input"} data-id="is_live" onClick={btnLiveClickHandler}></div>
                        </div>
                    </li>
                </ul>
                <div className="submit-button" onClick={onSubmitHandler}>{strbtnTitle}</div>
                <div className="add-property-container">
                    <div className="property-title">Custom property</div>
                    <div className="property-input" spellCheck="false" contentEditable="true"></div>
                    <div className="property-add" onClick={addPropertyHandler}>Add</div>
                </div>
            </div>
        </div>
    )
}

export default WareHouseDetail;
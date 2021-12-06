import { useRef } from 'react';
import '../style/componentstyle.scss';
import { Link } from 'react-router-dom';

const InfoRow = (props) => {

    const linkRef = useRef();

    const onClickHandler = () => {
        if (props.link) linkRef.current.click();
    }

    return (
        <div className={`row-continer${props.class}`} onClick={onClickHandler}>
            <div className={`row-item${props.class}`}>
                <div className="label">
                    {props.data.name}
                </div>
                <div className="label">
                    {props.data.city}
                </div>
                <div className="label">
                    {props.data.type}
                </div>
                <div className="label">
                    {props.data["space_available"]}
                </div>
                <div className="label">
                    {props.data["is_live"].toString()}
                </div>
            </div>
            <Link ref={linkRef} to={`/warehousedetails/${props.data.id}`} />
        </div>
    )
}

InfoRow.defaultProps = {
    class: "",
    link: true
}

export default InfoRow;
import "../styles/Notification.css";

const Notification = ({notify}) => {

    if(!notify) {
        return null;
    }

    return (
        <div className="notify">
            <h2>{notify}</h2>
        </div>
    );
}

export default Notification;
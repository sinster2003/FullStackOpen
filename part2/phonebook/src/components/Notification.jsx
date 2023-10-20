import "../styles/Notification.css";

const Notification = ({notify, error}) => {

    if(!notify) {
        return null;
    }

    return (
        <div className="notify" style={{
            border: error ? "3px solid red" : "3px solid green", 
            color: error ? "red" : "green"
        }}>
            <h2>{notify}</h2>
        </div>
    );
}

export default Notification;
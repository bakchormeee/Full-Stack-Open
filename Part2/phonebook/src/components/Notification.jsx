const Notification = ({message}) => {
    if(message === null){
        console.log("Notif set to Null")
        return null;
    } 
    console.log("Logging Notif")
    return (
        <div className="notif">
            {message}
        </div>
    )

}

export default Notification
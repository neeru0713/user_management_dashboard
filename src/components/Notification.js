const Notification = ({ message, type, onClose }) => {
    if (!message) return null;
  
    const notificationStyles = {
      success: "bg-green-500",
      error: "bg-red-500",
    };
  
    return (
      <div className={`fixed top-[10%] left-[40%] text-white font-semibold p-2 px-4 rounded shadow-lg ${notificationStyles[type]}`}>
        <div className="flex justify-between items-center">
          <span>{message}</span>
          <button onClick={onClose} className="ml-4 text-xl font-bold">&times;</button>
        </div>
      </div>
    );
  };
export default Notification;

  
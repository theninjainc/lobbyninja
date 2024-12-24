import styles from "./notification.module.css";

// eslint-disable-next-line react/prop-types
const Notifications = ({ isOpenNotifications }) => {
  if (isOpenNotifications) {
    return <div className={styles.notifications}>
        <p>See All Notifications(0) </p>

    </div>;
  }
};

export default Notifications;

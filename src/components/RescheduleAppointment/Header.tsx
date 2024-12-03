import styles from "./Header.module.scss";

export const RescheduleAppointmentHeader = () => {
  return (
    <div className={styles.info}>
      <p className={styles.title}>Did you have an unexpected situation?</p>
      <p>You can change the appointment for when it suits you better</p>
    </div>
  );
};

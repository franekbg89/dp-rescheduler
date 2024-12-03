import { RescheduleAppointmentHeader } from "./Header";
import { RescheduleAppointmentConfirmation } from "./RescheduleConfirmation";
import { Calendar } from "./Calendar/Calendar";

import styles from "./RescheduleAppointment.module.scss";

export const RescheduleAppointment = () => {
  return (
    <div className={styles.container}>
      <RescheduleAppointmentHeader />
      <Calendar />
      <RescheduleAppointmentConfirmation />
    </div>
  );
};

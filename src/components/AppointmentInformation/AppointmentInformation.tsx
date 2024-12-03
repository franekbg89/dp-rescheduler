import classNames from "classnames";
import { MdCalendarMonth } from "react-icons/md";
import { LoadingSpinner } from "../LoadingSpinner";
import { useRescheduleAppointment } from "../../contexts";
import { format } from "date-fns";

import styles from "./AppointmentInformation.module.scss";

export const AppointmentInformation = () => {
  const { isLoading, currentAppointment } = useRescheduleAppointment();

  const { doctorName, appointmentDate } = currentAppointment;
  const formattedAppointmentDate = format(
    new Date(appointmentDate),
    "EEEE, dd MMMM yyyy 'at' HH:mm"
  );

  return (
    <div className={styles.container}>
      <p>
        Confirm your appointment with
        <span className={styles.doctorName}> {doctorName}</span>
      </p>
      <div className={styles.dateContainer}>
        <div className={styles.iconContainer}>
          {isLoading ? (
            <LoadingSpinner size={30} />
          ) : (
            <MdCalendarMonth size={30} className={styles.icon} />
          )}
        </div>
        <p
          className={classNames(styles.date, {
            [styles.lineThrough]: isLoading,
          })}
        >
          On {formattedAppointmentDate}
        </p>
      </div>
    </div>
  );
};

import { format } from "date-fns";

import { useRescheduleAppointment } from "../../contexts";

import styles from "./RescheduleConfirmation.module.scss";

export const RescheduleAppointmentConfirmation = () => {
  const { rescheduleAppointment, isLoading, selectedSlot } =
    useRescheduleAppointment();

  if (!selectedSlot) return null;

  const buttonText = format(selectedSlot.Start, "EEEE, d MMM yyyy 'at' HH:mm");

  const handleConfirmAppointment = () => {
    rescheduleAppointment({
      Start: format(selectedSlot.Start, "yyyy-MM-dd HH:mm:ss"),
      End: format(selectedSlot.End, "yyyy-MM-dd HH:mm:ss"),
      Patient: {
        Name: "Fran",
        SecondName: "Bajo",
        Email: "fran.bajo@example.com",
        Phone: "1234567890",
      },
    });
  };

  return (
    <div className={styles.container}>
      <h4>Reschedule</h4>
      <p>Click the button to confirm</p>
      <button
        onClick={handleConfirmAppointment}
        className={styles.button}
        disabled={isLoading}
      >
        {buttonText}
      </button>
    </div>
  );
};

import { AppointmentManagementProvider } from "../../contexts/appointment-management-context";
import { AppointmentInformation } from "../AppointmentInformation";
import { RescheduleAppointment } from "../RescheduleAppointment";

import styles from "./AppointmentDetails.module.scss";

export const AppointmentDetails = () => {
  return (
    <AppointmentManagementProvider>
      <div className={styles.container}>
        <AppointmentInformation />
        <RescheduleAppointment />
      </div>
    </AppointmentManagementProvider>
  );
};

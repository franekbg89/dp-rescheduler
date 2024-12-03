import { createContext, useContext, ReactNode, useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { BookSlotPayload, Slot } from "../types/slots-service";
import { addDays } from "date-fns";
import { AppointmentsService } from "../services/appointments-service";

const MOCKED_DOCTOR_NAME = "Dr. Simeon Molas";
const INITIAL_APPOINTMENT_DATE = addDays(new Date(), 1);

interface AppointmentManagementContextType {
  selectedSlot: Slot | null;
  setSelectedSlot: (slot: Slot | null) => void;
  isLoading: boolean;
  isError: boolean;
  rescheduleAppointment: (payload: BookSlotPayload) => void;
  currentAppointment: {
    doctorName: string;
    appointmentDate: Date;
  };
}

const AppointmentManagementContext = createContext<
  AppointmentManagementContextType | undefined
>(undefined);

export const AppointmentManagementProvider = ({
  children,
}: {
  children: ReactNode;
}) => {
  const [selectedSlot, setSelectedSlot] = useState<Slot | null>(null);
  const [currentAppointment, setCurrentAppointment] = useState({
    doctorName: MOCKED_DOCTOR_NAME,
    appointmentDate: INITIAL_APPOINTMENT_DATE,
  });

  const queryClient = useQueryClient();

  const { mutate, isPending, isError } = useMutation({
    mutationFn: AppointmentsService.bookSlot,
    onSuccess: () => {
      setSelectedSlot(null);
      setCurrentAppointment({
        doctorName: MOCKED_DOCTOR_NAME,
        appointmentDate: new Date(selectedSlot!.Start),
      });

      queryClient.invalidateQueries({ queryKey: ["weeklySlots"] });
    },
    onError: (error) => {
      console.error("Error rescheduling appointment:", error);
    },
  });

  const value = {
    selectedSlot,
    setSelectedSlot,
    isLoading: isPending,
    isError,
    rescheduleAppointment: mutate,
    currentAppointment,
  };

  return (
    <AppointmentManagementContext.Provider value={value}>
      {children}
    </AppointmentManagementContext.Provider>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useRescheduleAppointment = () => {
  const context = useContext(AppointmentManagementContext);

  if (context === undefined) {
    throw new Error("useReschedule must be used within a RescheduleProvider");
  }
  return context;
};

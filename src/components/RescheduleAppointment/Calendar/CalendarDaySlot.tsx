import { format } from "date-fns";
import classNames from "classnames";
import { Slot } from "../../../types/slots-service";
import { useRescheduleAppointment } from "../../../contexts";

import styles from "./CalendarDaySlot.module.scss";

type CalendarDaySlotProps = {
  slot: Slot;
};

export function CalendarDaySlot({ slot }: CalendarDaySlotProps) {
  const { selectedSlot, setSelectedSlot } = useRescheduleAppointment();

  const isSelected = selectedSlot?.Start.toString() === slot.Start.toString();
  const isAvailable = !slot.Taken;

  const handleSlotClick = (slot: Slot) => {
    if (!isAvailable) return;

    if (isSelected) {
      setSelectedSlot(null);
    } else {
      setSelectedSlot(slot);
    }
  };

  const startTime = format(slot.Start, "HH:mm");

  return (
    <button
      className={classNames(styles.btn, {
        [styles.unavailable]: !isAvailable,
        [styles.selected]: isSelected,
      })}
      onClick={() => handleSlotClick(slot)}
    >
      {startTime}
    </button>
  );
}

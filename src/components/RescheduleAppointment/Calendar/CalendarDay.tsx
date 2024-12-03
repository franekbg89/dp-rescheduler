import { format, isToday, isTomorrow } from "date-fns";
import styles from "./CalendarDay.module.scss";
import { CalendarDaySlot } from "./CalendarDaySlot";
import { Slot } from "../../../types/slots-service";

const INITIAL_SLOTS_TO_SHOW = 5;

type CalendarDayProps = {
  day: Date;
  slots: Slot[];
  showAllSlots?: boolean;
};

export const CalendarDay = ({
  day,
  slots,
  showAllSlots = false,
}: CalendarDayProps) => {
  const formattedDate = format(day, "d MMM");

  const getFormattedDayName = () => {
    const parsedDate = new Date(day);

    if (isToday(parsedDate)) return "Today";
    if (isTomorrow(parsedDate)) return "Tomorrow";

    return format(parsedDate, "EEE");
  };

  const visibleSlots = showAllSlots
    ? slots
    : slots?.slice(0, INITIAL_SLOTS_TO_SHOW);

  return (
    <div className={styles.container}>
      <div className={styles.dayInfo}>
        <p className={styles.dayName}>{getFormattedDayName()}</p>
        <p className={styles.dayMonth}>{formattedDate}</p>
      </div>
      <ul className={styles.slotsList}>
        {visibleSlots?.map((slot) => (
          <CalendarDaySlot key={slot.Start} slot={slot} />
        ))}
      </ul>
    </div>
  );
};

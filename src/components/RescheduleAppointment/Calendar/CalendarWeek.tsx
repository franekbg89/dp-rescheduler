import { WeeklySlots } from "../../types/slots-service";
import { CalendarDay } from "./CalendarDay";
import styles from "./CalendarWeek.module.scss";

type CalendarWeekProps = {
  weekDays: string[];
  weeklySlots: WeeklySlots;
  showAllSlots?: boolean;
};

export const CalendarWeek = ({
  weekDays,
  weeklySlots,
  showAllSlots = false,
}: CalendarWeekProps) => {
  return (
    <div className={styles.container}>
      {weekDays.map((day) => (
        <CalendarDay
          key={day}
          day={new Date(day)}
          slots={weeklySlots[day]}
          showAllSlots={showAllSlots}
        />
      ))}
    </div>
  );
};

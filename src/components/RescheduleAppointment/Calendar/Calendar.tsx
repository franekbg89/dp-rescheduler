import { Carousel } from "../../Carousel/Carousel";
import { useAppointments } from "../../../hooks/use-appointments";
import { CalendarWeek } from "./CalendarWeek";
import styles from "./Calendar.module.scss";
import { useState } from "react";

export function Calendar() {
  const [isExpanded, setIsExpanded] = useState(false);

  const { daySlots, slides, handleGoToNextWeek, handleGoToPreviousWeek } =
    useAppointments();

  return (
    <div>
      <Carousel
        slides={slides}
        renderSlide={(weekDays) => (
          <CalendarWeek
            weekDays={weekDays}
            weeklySlots={daySlots}
            showAllSlots={isExpanded}
          />
        )}
        onClickNext={handleGoToNextWeek}
        onClickPrevious={handleGoToPreviousWeek}
      />
      <button
        className={styles.showMoreBtn}
        onClick={() => setIsExpanded(!isExpanded)}
      >
        {isExpanded ? "Less" : "See more hours"}
      </button>
    </div>
  );
}

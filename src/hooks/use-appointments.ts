import { useQueries, useQueryClient } from "@tanstack/react-query";
import { useCallback, useEffect, useMemo, useState } from "react";
import { getLastMondayFromDate, getNextMonday } from "../utils/date-utils";
import { addDays, format } from "date-fns";
import { AppointmentsService } from "../services/appointments-service";
import { WeeklySlots } from "../types/slots-service";

const MAX_WEEKS = 8;

export const useAppointments = () => {
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const today = new Date();
  const queryClient = useQueryClient();

  const slides = useMemo(() => {
    return Array.from({ length: MAX_WEEKS }, (_, weekIndex) => {
      return Array.from({ length: 7 }, (_, dayIndex) => {
        const date = addDays(today, dayIndex + weekIndex * 7);
        return format(date, "yyyy-MM-dd");
      });
    });
  }, [today]);

  const [currentRenderedWeekIndex, setCurrentRenderedWeekIndex] = useState(0);
  const [lastWeekFetched, setLastWeekFetched] = useState(getNextMonday(today));

  const queries = useQueries({
    queries: slides.slice(0, currentRenderedWeekIndex + 2).map((weekDays) => {
      return {
        queryKey: ["weeklySlots", weekDays[0]],
        queryFn: () =>
          AppointmentsService.getWeeklySlots(
            getLastMondayFromDate(new Date(weekDays[0]))
          ),
        staleTime: 60000,
      };
    }),
  });

  useEffect(() => {
    const shouldFetchNextWeek =
      currentRenderedWeekIndex ===
      slides.findIndex(
        (week) => week[0] === format(lastWeekFetched, "yyyy-MM-dd")
      );

    if (shouldFetchNextWeek) {
      const nextWeekToFetch = getNextMonday(lastWeekFetched);
      setLastWeekFetched(nextWeekToFetch);

      queryClient.prefetchQuery({
        queryKey: ["weeklySlots", format(nextWeekToFetch, "yyyy-MM-dd")],
        queryFn: () => AppointmentsService.getWeeklySlots(nextWeekToFetch),
      });
    }
  }, [currentRenderedWeekIndex, slides, lastWeekFetched, queryClient]);

  const handleGoToNextWeek = useCallback(() => {
    setCurrentRenderedWeekIndex((prev) => prev + 1);
  }, []);

  const handleGoToPreviousWeek = useCallback(() => {
    if (currentRenderedWeekIndex > 0) {
      setCurrentRenderedWeekIndex((prev) => prev - 1);
    }
  }, [currentRenderedWeekIndex]);

  const daySlots = useMemo(() => {
    return queries.reduce((acc, query) => {
      if (query.data) {
        return { ...acc, ...query.data };
      }
      return acc;
    }, {} as WeeklySlots);
  }, [queries]);

  return {
    daySlots: daySlots ?? {},
    slides,
    handleGoToNextWeek,
    handleGoToPreviousWeek,
  };
};

import axios from "axios";
import {
  BookSlotPayload,
  WeeklySlots,
  WeeklySlotsApiResponse,
} from "../types/slots-service";
import { format } from "date-fns";

export class AppointmentsService {
  private static readonly BASE_URL =
    "https://draliatest.azurewebsites.net/api/availability";

  static async getWeeklySlots(weekStartDay: Date) {
    if (!weekStartDay) {
      throw new Error("Week start day is required");
    }

    try {
      const { data } = await axios.get<WeeklySlotsApiResponse>(
        `${AppointmentsService.BASE_URL}/GetWeeklySlots/${format(
          new Date(weekStartDay),
          "yyyyMMdd"
        )}`
      );

      const parsedData = data.reduce((acc, date) => {
        const key = format(new Date(date.Start), "yyyy-MM-dd");
        if (!acc[key]) {
          acc[key] = [];
        }
        acc[key].push(date);
        return acc;
      }, {} as WeeklySlots);

      return parsedData;
    } catch (error) {
      console.error(error);
    }
  }

  static async bookSlot(payload: BookSlotPayload): Promise<void> {
    try {
      await axios.post(`${AppointmentsService.BASE_URL}/BookSlot`, payload);
    } catch (error) {
      console.error("Error booking slot:", error);
    }
  }
}

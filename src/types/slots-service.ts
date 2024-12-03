export type BookSlotPayload = {
  Start: string;
  End: string;
  Comments?: string;
  Patient: {
    Name: string;
    SecondName: string;
    Email: string;
    Phone: string;
  };
};

export interface Slot {
  Start: string;
  End: string;
  Taken?: boolean;
}

export type WeeklySlotsApiResponse = Slot[];

export type WeeklySlots = Record<string, Slot[]>;

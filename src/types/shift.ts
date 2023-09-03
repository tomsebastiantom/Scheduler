export interface Shift {
    id: string;
    userId: string;
    locationId?: string | null;
    startTime: string;
    endTime: string;
    shiftType: string;
    createdBy?: string;
    extras?: { [key: string]: any }; 
  }
  

  
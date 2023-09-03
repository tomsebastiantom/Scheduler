import { Shift } from "src/types/shift";
import api from "./api";
import { ApiRequestConfig } from "./api.types";

const URLs = {
  shiftUrl: "/shifts",
};

export const getShiftsById = (shiftId: string, config?: ApiRequestConfig) => {
  return api.get<Shift>(`${URLs.shiftUrl}/${shiftId}`, config);
};
export const getShiftsByUserId = (
  userId: string,
  startTime: string,
  endTime: string,
  config?: ApiRequestConfig
) => {
  return api.post<Shift[]>(
    `${URLs.shiftUrl}/user/${userId}`,
    { startTime, endTime },
    config
  );
};
export const getShiftsBySiteId = (
  siteId: string,
  startTime: string,
  endTime: string,
  config?: ApiRequestConfig
) => {
  return api.post<Shift[]>(
    `${URLs.shiftUrl}/site/${siteId}`,
    { startTime, endTime },
    config
  );
};
export const deleteShift = (shiftId: string, config?: ApiRequestConfig) => {
  return api.delete<Shift>(`${URLs.shiftUrl}/${shiftId}`, config);
};
export const updateShift = (shift: Shift, config?: ApiRequestConfig) => {
  return api.put<Shift>(`${URLs.shiftUrl}`, shift, config);
};

export const createShift = (shift: Shift, config?: ApiRequestConfig) => {
  return api.post<Shift>(`${URLs.shiftUrl}`, shift, config);
};

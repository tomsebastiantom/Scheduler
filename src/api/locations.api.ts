import { Location, CreatedLocation } from "src/types/location";
import api from "./api";
import { ApiRequestConfig } from "./api.types";

const URLs = {
  locationsUrl: "/location",
};

export type LocationsResponse = Location[];

export const getAllLocations = (config?: ApiRequestConfig) => {
  return api.get<LocationsResponse>(URLs.locationsUrl, config);
};
export const getLocation = (locationId: string, config?: ApiRequestConfig) => {
  return api.get<Location>(`${URLs.locationsUrl}/${locationId}`, config);
};

export const createLocation = (
  location: CreatedLocation,
  config?: ApiRequestConfig
) => {
  return api.post<Location>(URLs.locationsUrl, location, config);
};

export const deleteLocation = (
  locationId: string,
  config?: ApiRequestConfig
) => {
  return api.delete<Location>(`${URLs.locationsUrl}/${locationId}`);
};
export const updateLocation = (
  location: Location,
  locationId?: string,
  config?: ApiRequestConfig
) => {
  return api.put<Location>(`${URLs.locationsUrl}/${locationId}`, location);
};

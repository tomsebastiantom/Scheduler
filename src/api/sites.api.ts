

import { Site, CreatedSite } from "src/types/site";
import api from "./api";
import { ApiRequestConfig } from "./api.types";
import { Checkpoint } from "src/types/checkpoint";

const URLs = {
  sitesUrl: "/sites",
  checkpointUrl: "/checkpoints",
};

export type LoginPayload = {
  username: string;
  password: string;
};

export type LoginResponse = {
  accessToken: string;
  refreshToken: string;
};

export type RegisterPayload = {
  email: string;
  password: string;
};

export type SitesResponse = Site[];
export type CheckpointResponse = Checkpoint[] | "OK";

export const getAllSites = (config?: ApiRequestConfig) => {
  return api.get<SitesResponse>(URLs.sitesUrl, config);
};
export const getSite = (siteId: string, config?: ApiRequestConfig) => {
  return api.get<Site>(`${URLs.sitesUrl}/${siteId}`, config);
};
export const getCheckpoint = (siteId: string, config?: ApiRequestConfig) => {
  return api.get<CheckpointResponse>(`${URLs.checkpointUrl}/${siteId}`, config);
};

export const createSite = (site: CreatedSite, config?: ApiRequestConfig) => {
  return api.post<Site>(URLs.sitesUrl, site, config);
};
export const createCheckpoint = (
  checkpoint: any,
  config?: ApiRequestConfig
) => {
  return api.post<Checkpoint[]>(`${URLs.checkpointUrl}`, checkpoint, config);
};

export const getAllCheckpoints = (
  siteId: string,
  config?: ApiRequestConfig
) => {
  return api.get<CheckpointResponse>(`${URLs.checkpointUrl}/site/${siteId}`);
};
export const getCheckpointById = (
  checkpointId: string,
  config?: ApiRequestConfig
) => {
  return api.get<Checkpoint>(`${URLs.checkpointUrl}/${checkpointId}`);
};
export const updateCheckpoint = (
  checkpoint: any,
  siteId?: string,
  config?: ApiRequestConfig
) => {
  console.log("update", checkpoint);
  return api.put<Checkpoint>(`${URLs.checkpointUrl}/${siteId}`, checkpoint);
};
export const deleteCheckpoint = (
  checkpointId: string,
  config?: ApiRequestConfig
) => {
  return api.delete<Checkpoint>(`${URLs.checkpointUrl}/${checkpointId}`);
};
export const deleteSite = (siteId: string, config?: ApiRequestConfig) => {
  return api.delete<Site>(`${URLs.sitesUrl}/${siteId}`);
};
export const updateSite = (
  site: Site,
  siteId?: string,
  config?: ApiRequestConfig
) => {
  return api.put<Site>(`${URLs.sitesUrl}/${siteId}`, site);
};

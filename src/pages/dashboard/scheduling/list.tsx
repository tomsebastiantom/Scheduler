import type { ChangeEvent, MouseEvent } from "react";
import { useCallback, useEffect, useRef, useState, useMemo } from "react";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

import { Seo } from "src/components/seo";
import { useMounted } from "src/hooks/use-mounted";

import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import useMediaQuery from "@mui/material/useMediaQuery";
import type { Theme } from "@mui/material/styles/createTheme";

import { ScheduleUserListSidebar } from "src/sections/dashboard/scheduling/schedule-user-list";
import { ScheduleListContainer } from "src/sections/dashboard/scheduling/schedule-list-container";
import { ScheduleLocationSelector } from "src/sections/dashboard/scheduling/schedule-location-selector";
import { ScheduleCalender } from "src/sections/dashboard/scheduling/schedule-calender";

import {
  mockGetShiftsByLocationId,
  mockDeleteShift,
  mockDeleteShiftPartial,
  mockCreateShift,
  mockGetAllUsers,
  mockGetAllLocations,
  mockGetShiftsByUserId,
  mockGetExistingShiftsByLocationId,
} from "src/api/data/test.api";
import type { User } from "src/types/user";
import { Location } from "src/types/location";
import { Shift } from "src/types/shift";

interface UsersStoreState {
  users: User[];
  usersCount: number;
}
interface LocationsStoreState {
  locations: Location[];
  locationsCount: number;
}
interface ScheduleStoreState {
  schedule: Shift[];
  scheduleCount: number;
}
type FetchStatus = {
  isLoading: boolean;
  isSuccess: boolean;
  error: any;
};

type SaveStatus = {
  isLoading: boolean;
  isSuccess: boolean;
  error: any;
};

type DeleteStatus = {
  isLoading: boolean;
  isSuccess: boolean;
  error: any;
};

const useLocations = () => {
  const [locationsState, setLocationsState] = useState<LocationsStoreState>({
    locations: [],
    locationsCount: 0,
  });

  const handleLocationsGet = useCallback(async () => {
    try {
      const response = await mockGetAllLocations();
      setLocationsState({
        locations: response,
        locationsCount: response.length,
      });
    } catch (err) {
      console.error(err);
    }
  }, []);

  useEffect(() => {
    handleLocationsGet();
  }, [handleLocationsGet]);

  return locationsState;
};
const useUsers = () => {
  const [usersState, setUsersState] = useState<UsersStoreState>({
    users: [],
    usersCount: 0,
  });

  const handleUsersGet = useCallback(async () => {
    try {
      const response = await mockGetAllUsers();

      setUsersState({
        users: response,
        usersCount: response.length,
      });
    } catch (err) {
      console.error(err);
    }
  }, []);

  useEffect(() => {
    handleUsersGet();
  }, [handleUsersGet]);

  return usersState;
};

const useSchedule = ({
  locationId = null,
  userId = null,
  startDate = null,
  endDate = null,
  locationChanged = false,
}: {
  locationId?: string | null;
  userId?: string | null;
  startDate?: string | null;
  endDate?: string | null;
  locationChanged?: boolean;
}) => {
  const [scheduleState, setScheduleState] = useState<ScheduleStoreState>({
    schedule: [],
    scheduleCount: 0,
  });
  const [fetchStatus, setFetchStatus] = useState<FetchStatus>({
    isLoading: false,
    isSuccess: false,
    error: null,
  });
  const [saveStatus, setSaveStatus] = useState<SaveStatus>({
    isLoading: false,
    isSuccess: false,
    error: null,
  });
  const [deleteStatus, setDeleteStatus] = useState<DeleteStatus>({
    isLoading: false,
    isSuccess: false,
    error: null,
  });

  const fetchSchedule = useCallback(
    async ({
      overrideSiteId = locationId,
      overrideUserId = userId,
      overrideStartDate = startDate,
      overrideEndDate = endDate,
      overrideSiteChanged = locationChanged,
    } = {}) => {
      if (
        (overrideSiteId || overrideUserId) &&
        (overrideSiteChanged || overrideStartDate)
      ) {
        // Use different variable names to avoid conflict with parameters
        const fetchStartDate = overrideStartDate
          ? new Date(overrideStartDate)
          : new Date();
        const fetchEndDate = overrideEndDate
          ? new Date(overrideEndDate)
          : new Date(fetchStartDate);

        if (!overrideEndDate) {
          fetchEndDate.setDate(fetchEndDate.getDate() + 7);
        }
        fetchStartDate.setHours(0, 0, 0, 0);
        fetchEndDate.setHours(23, 59, 59, 999);

        try {
          setFetchStatus({ isLoading: true, isSuccess: false, error: null });
          const response = overrideUserId
            ? await mockGetShiftsByUserId(
                overrideUserId,
                fetchStartDate.toISOString(),
                fetchEndDate.toISOString()
              )
            : await mockGetShiftsByLocationId(
                overrideSiteId!,
                fetchStartDate.toISOString(),
                fetchEndDate.toISOString()
              );
          setScheduleState({
            schedule: response,
            scheduleCount: response.length,
          });
          setFetchStatus({ isLoading: false, isSuccess: true, error: null });
        } catch (err) {
          setFetchStatus({ isLoading: false, isSuccess: false, error: err });
          console.error(err);
        }
      }
    },
    [locationId, userId, startDate, endDate, locationChanged]
  );
  const saveSchedule = useCallback(async (newShift: Shift) => {
    try {
      setSaveStatus({ isLoading: true, isSuccess: false, error: null });
      const response = await mockCreateShift(newShift);
      if (response) {
        // Don't fetch - the UI is already optimistically updated
        setSaveStatus({ isLoading: false, isSuccess: true, error: null });
      }
    } catch (err) {
      console.error("Failed to save shift:", err);
      setSaveStatus({ isLoading: false, isSuccess: false, error: err });
    }
  }, []);
  const deleteSchedule = useCallback(
    async (shiftId: string) => {
      setDeleteStatus({ isLoading: true, isSuccess: false, error: null });
      try {
        await mockDeleteShift(shiftId);
        // Refresh the schedule after successful delete
        await fetchSchedule({
          overrideSiteId: locationId,
        });
        setDeleteStatus({ isLoading: false, isSuccess: true, error: null });
      } catch (err) {
        console.error("Failed to delete shift:", err);
        setDeleteStatus({ isLoading: false, isSuccess: false, error: err });
      }
    },
    [fetchSchedule, locationId]
  );

  useEffect(() => {
    fetchSchedule();
  }, [fetchSchedule]);

  return {
    scheduleState,
    setScheduleState,
    fetchSchedule,
    saveSchedule,
    deleteSchedule,
    status: {
      fetchStatus,
      saveStatus,
      deleteStatus,
    },
  };
};

const Page = () => {
  const rootRef = useRef<HTMLDivElement | null>(null);
  const lgUp = useMediaQuery((theme: Theme) => theme.breakpoints.up("lg"));
  const [openSidebar, setOpenSidebar] = useState<boolean>(lgUp);
  const [selectedLocation, setSelectedLocation] = useState<string | null>(null);

  const [locationChanged, setLocationChanged] = useState(false);

  const locationsState = useLocations();
  const usersState = useUsers();
  const {
    scheduleState,
    fetchSchedule,
    saveSchedule,
    deleteSchedule,
    setScheduleState,
    status,
  } = useSchedule({
    locationId: selectedLocation,
    locationChanged,
  });

  const handleLocationChange = useCallback((locationId: string): void => {
    setSelectedLocation(locationId);
    setLocationChanged(true);
  }, []);

  const handleFiltersClose = useCallback((): void => {
    setOpenSidebar(false);
  }, []);

  return (
    <DndProvider backend={HTML5Backend}>
      <Seo title="Dashboard: Schedule" />
      <Divider />
      <Box
        component="main"
        sx={{
          display: "flex",
          flex: "1 1 auto",
          overflow: "hidden",
          position: "relative",
        }}
      >
        <Box
          ref={rootRef}
          sx={{
            bottom: 0,
            display: "flex",
            left: 0,
            position: "absolute",
            right: 0,
            top: 0,
          }}
        >
          <ScheduleUserListSidebar
            container={rootRef.current}
            onClose={handleFiltersClose}
            users={usersState.users}
          />

          <ScheduleListContainer>
            <Stack spacing={4}>
              <Stack
                alignItems="center"
                direction="row"
                justifyContent="center"
                spacing={3}
              >
                <Box textAlign="center">
                  <Typography align="center" variant="h4">
                    Scheduling
                  </Typography>
                </Box>
              </Stack>
              <Box display="flex" justifyContent="center" alignItems="center">
                <ScheduleLocationSelector
                  onLocationChange={handleLocationChange}
                  locations={locationsState.locations}
                />
              </Box>
              {selectedLocation && (
                <ScheduleCalender
                  users={usersState.users}
                  shifts={scheduleState.schedule}
                  setShifts={setScheduleState}
                  locationId={selectedLocation}
                  fetchSchedule={fetchSchedule}
                  saveSchedule={saveSchedule}
                  deleteSchedule={deleteSchedule}
                  status={status}
                />
              )}
            </Stack>
          </ScheduleListContainer>
        </Box>
      </Box>
    </DndProvider>
  );
};

export default Page;

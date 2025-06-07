import { FC, useState, useEffect, useCallback, useMemo, useRef } from "react";
import PropTypes from "prop-types";
import * as React from "react";

import Box from "@mui/material/Box";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import MenuItem from "@mui/material/MenuItem";
import TableRow from "@mui/material/TableRow";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { TableHead } from "@mui/material";
import TextField from "@mui/material/TextField";
import Card from "@mui/material/Card";
import Button from "@mui/material/Button";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import AddIcon from "@mui/icons-material/Add";
import Modal from "@mui/material/Modal";
import { useDrop } from "react-dnd";
import Select from "@mui/material/Select";
import { User } from "src/types/user";
import { Shift } from "src/types/shift";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import Autocomplete from "@mui/material/Autocomplete";
import CloseIcon from "@mui/icons-material/Close";
import { MobileTimePicker } from "@mui/x-date-pickers";
import { toast } from "react-hot-toast";
import {
  mockDeleteShiftPartial,
  mockGetShiftsByLocationId,
  mockGetExistingShiftsByLocationId,
  mockDeleteShift,
} from "src/api/data/test.api";
import CircularProgress from "@mui/material/CircularProgress";
import Chip from "@mui/material/Chip";

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
type ScheduleStatus = {
  fetchStatus: FetchStatus;
  saveStatus: SaveStatus;
  deleteStatus: DeleteStatus;
};

interface DropTargetCellProps {
  currentShifts: Shift[];
  startTime: string;
  endTime: string | null;
  users: User[];
  onDropUser: (
    user: User,
    startTime: string,
    endTime: string,
    currentShifts: Shift[]
  ) => void;
  onRemoveUser: (
    id: string,
    userId: string,
    startTime: string,
    endTime: string
  ) => void;
  loadingShiftIds: Set<string>;
}

interface IntervalSelectorProps {
  viewInterval: number;
  setViewInterval: (value: number) => void;
}

interface WeekHeaderProps {
  weekHeaders: string[];
  startDay: Date;
  setStartDay: React.Dispatch<React.SetStateAction<Date>>;
  handleModalOpen: () => void;
}

interface ShiftCreationModalProps {
  open: boolean;
  onClose: () => void;
  users: User[];
  onSubmit: (startTime: Date, endTime: Date, selectedUser: string) => void;
  isLoading?: boolean;
}

interface ScheduleStoreState {
  schedule: Shift[];
  scheduleCount: number;
}

interface ScheduleCalenderProps {
  shifts: Shift[];
  users: User[];
  fetchSchedule: (params?: {
    overrideSiteId?: string | null;
    overrideUserId?: string | null;
    overrideStartDate?: string | null;
    overrideEndDate?: string | null;
    overrideSiteChanged?: boolean;
  }) => Promise<void>;
  saveSchedule: (newShift: Shift) => Promise<void>;
  deleteSchedule: (shiftId: string) => Promise<void>;
  status: ScheduleStatus;
  locationId: string | null;
  setShifts: React.Dispatch<React.SetStateAction<ScheduleStoreState>>;
}

const isTimeOverlapping = (
  start1: string,
  end1: string,
  start2: string,
  end2: string
): boolean => {
  const s1 = new Date(start1).getTime();
  const e1 = new Date(end1).getTime();
  const s2 = new Date(start2).getTime();
  const e2 = new Date(end2).getTime();

  return s1 < e2 && e1 > s2;
};

const hasUserConflict = (
  userId: string,
  startTime: string,
  endTime: string,
  existingShifts: Shift[]
): boolean => {
  return existingShifts.some(
    (shift) =>
      shift.userId === userId &&
      isTimeOverlapping(shift.startTime, shift.endTime, startTime, endTime)
  );
};

const formatTimeLabel = (viewInterval: number, hindex: number): string => {
  if (viewInterval > 1) {
    const startTime = hindex * viewInterval;
    const endTime = (hindex + 1) * viewInterval;
    return `${startTime.toString().padStart(2, "0")}:00 - ${endTime
      .toString()
      .padStart(2, "0")}:00`;
  }
  return `${hindex.toString().padStart(2, "0")}:00`;
};

const ShiftCreationModal: React.FC<ShiftCreationModalProps> = ({
  open,
  onClose,
  users,
  onSubmit,
  isLoading = false,
}) => {
  const [selectedUser, setSelectedUser] = useState<string | null>(null);
  const [startTime, setStartTime] = useState<Date | null>(null);
  const [endTime, setEndTime] = useState<Date | null>(null);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const clearState = useCallback(() => {
    setSelectedUser(null);
    setStartTime(null);
    setEndTime(null);
    setErrors({});
  }, []);

  const validateForm = useCallback((): boolean => {
    const newErrors: { [key: string]: string } = {};

    if (!selectedUser) newErrors.user = "Please select a user";
    if (!startTime) newErrors.startTime = "Please select start time";
    if (!endTime) newErrors.endTime = "Please select end time";
    if (startTime && endTime && startTime >= endTime) {
      newErrors.endTime = "End time must be after start time";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }, [selectedUser, startTime, endTime]);

  const handleDurationClick = useCallback(
    (hours: number) => {
      if (startTime) {
        const newEndTime = new Date(startTime);
        newEndTime.setHours(newEndTime.getHours() + hours);
        setEndTime(newEndTime);
        setErrors((prev) => ({ ...prev, endTime: "" }));
      }
    },
    [startTime]
  );

  const handleSubmit = useCallback(() => {
    if (!validateForm()) return;

    if (selectedUser && startTime && endTime) {
      onSubmit(startTime, endTime, selectedUser);
      clearState();
    }
  }, [selectedUser, startTime, endTime, validateForm, onSubmit, clearState]);

  const handleClose = useCallback(() => {
    clearState();
    onClose();
  }, [clearState, onClose]);

  return (
    <Modal open={open} onClose={handleClose}>
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: 400,
          bgcolor: "background.paper",
          borderRadius: 2,
          boxShadow: 24,
          p: 4,
        }}
      >
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            mb: 2,
          }}
        >
          <Typography variant="h6">Create Shift</Typography>
          <IconButton onClick={handleClose} disabled={isLoading}>
            <CloseIcon />
          </IconButton>
        </Box>

        <Stack spacing={2}>
          <Autocomplete
            value={users.find((user) => user.id === selectedUser) || null}
            onChange={(_, newValue) => {
              setSelectedUser(newValue?.id || null);
              setErrors((prev) => ({ ...prev, user: "" }));
            }}
            options={users}
            getOptionLabel={(option) => option.name}
            renderInput={(params) => (
              <TextField
                {...params}
                label="Select User"
                error={!!errors.user}
                helperText={errors.user}
                disabled={isLoading}
              />
            )}
          />

          <MobileTimePicker
            label="Start Time"
            value={startTime}
            onChange={(newValue) => {
              setStartTime(newValue);
              setErrors((prev) => ({ ...prev, startTime: "" }));
            }}
            ampm={false}
            disabled={isLoading}
            slotProps={{
              textField: {
                error: !!errors.startTime,
                helperText: errors.startTime,
              },
            }}
          />

          <Box sx={{ display: "flex", gap: 1, justifyContent: "center" }}>
            <Button
              size="small"
              variant="outlined"
              onClick={() => handleDurationClick(2)}
              disabled={!startTime || isLoading}
            >
              +2h
            </Button>
            <Button
              size="small"
              variant="outlined"
              onClick={() => handleDurationClick(4)}
              disabled={!startTime || isLoading}
            >
              +4h
            </Button>
            <Button
              size="small"
              variant="outlined"
              onClick={() => handleDurationClick(8)}
              disabled={!startTime || isLoading}
            >
              +8h
            </Button>
          </Box>

          <MobileTimePicker
            label="End Time"
            value={endTime}
            onChange={(newValue) => {
              setEndTime(newValue);
              setErrors((prev) => ({ ...prev, endTime: "" }));
            }}
            ampm={false}
            disabled={isLoading}
            slotProps={{
              textField: {
                error: !!errors.endTime,
                helperText: errors.endTime,
              },
            }}
          />

          <Button
            onClick={handleSubmit}
            variant="contained"
            fullWidth
            disabled={isLoading}
            startIcon={isLoading ? <CircularProgress size={20} /> : null}
          >
            {isLoading ? "Creating..." : "Create Shift"}
          </Button>
        </Stack>
      </Box>
    </Modal>
  );
};

const IntervalSelector: FC<IntervalSelectorProps> = ({
  viewInterval,
  setViewInterval,
}) => {
  return (
    <Box sx={{ minWidth: 120 }}>
      <Select
        value={viewInterval}
        onChange={(e) => setViewInterval(Number(e.target.value))}
        size="small"
      >
        <MenuItem value={1}>1-Hour View</MenuItem>
        <MenuItem value={4}>4-Hour View</MenuItem>
        <MenuItem value={8}>8-Hour View</MenuItem>
      </Select>
    </Box>
  );
};

const WeekHeader: FC<WeekHeaderProps> = ({
  weekHeaders,
  setStartDay,
  startDay,
  handleModalOpen,
}) => {
  const [hoverIndex, setHoverIndex] = useState<number | null>(null);

  const navigateWeek = useCallback(
    (direction: "prev" | "next") => {
      const days = direction === "prev" ? -7 : 7;
      setStartDay((prevDay) => {
        const newDate = new Date(prevDay);
        newDate.setDate(newDate.getDate() + days);
        return newDate;
      });
    },
    [setStartDay]
  );

  return (
    <>
      {weekHeaders.map((day, index) => (
        <TableCell
          key={day}
          onMouseEnter={() => setHoverIndex(index)}
          onMouseLeave={() => setHoverIndex(null)}
          sx={{
            textAlign: "center",
            border: "1px solid",
            borderColor: "divider",
            position: "relative",
            minWidth: 120,
            bgcolor: "grey.50",
          }}
        >
          <Stack
            direction="row"
            alignItems="center"
            justifyContent="center"
            spacing={1}
          >
            {index === 0 && (
              <IconButton size="small" onClick={() => navigateWeek("prev")}>
                <ArrowBackIosIcon fontSize="small" />
              </IconButton>
            )}

            <Box sx={{ flex: 1, textAlign: "center" }}>
              <Typography variant="body2" fontWeight="medium">
                {day}
              </Typography>
              {/* {hoverIndex === index && (
                <IconButton
                  size="small"
                  onClick={handleModalOpen}
                  sx={{
                    position: "absolute",
                    top: 8,
                    right: 8,
                    bgcolor: "primary.main",
                    color: "white",
                    boxShadow: 2,
                    "&:hover": {
                      bgcolor: "primary.dark",
                    },
                  }}
                >
                  <AddIcon fontSize="small" />
                </IconButton>
              )} */}
            </Box>

            {index === 6 && (
              <IconButton size="small" onClick={() => navigateWeek("next")}>
                <ArrowForwardIosIcon fontSize="small" />
              </IconButton>
            )}
          </Stack>
        </TableCell>
      ))}
    </>
  );
};

const DropTargetCell: FC<DropTargetCellProps> = ({
  currentShifts,
  startTime,
  endTime,
  users,
  onDropUser,
  onRemoveUser,
  loadingShiftIds,
}) => {
  const [isOver, setIsOver] = useState(false);

  const [, dropRef] = useDrop({
    accept: "USER",
    hover: (item, monitor) => {
      setIsOver(monitor.isOver());
    },
    drop: (item: any) => {
      const userToDrop = item.user;

      let actualEndTime = endTime;
      if (!actualEndTime) {
        const newEndTime = new Date(new Date(startTime).getTime());
        newEndTime.setHours(newEndTime.getHours() + 1);
        actualEndTime = newEndTime.toISOString();
      }

      onDropUser(userToDrop, startTime, actualEndTime, currentShifts);
      setIsOver(false);
    },
    collect: (monitor) => ({
      isOver: monitor.isOver(),
    }),
  });

  const cellSx = useMemo(
    () => ({
      border: "1px solid",
      borderColor: "divider",
      minHeight: 60,
      backgroundColor: isOver ? "action.hover" : "inherit",
      position: "relative" as const,
      p: 1,
    }),
    [isOver]
  );

  return (
    <TableCell ref={dropRef} sx={cellSx}>
      {" "}
      <Stack spacing={1}>
        {currentShifts.map((shift) => {
          const user = users.find((u) => u.id === shift.userId);
          const isShiftLoading = loadingShiftIds.has(shift.id);

          const formatShiftTime = (dateString: string) => {
            return new Date(dateString).toLocaleTimeString("en-US", {
              hour: "2-digit",
              minute: "2-digit",
              hour12: false,
            });
          };

          const shiftTimeRange = `${formatShiftTime(
            shift.startTime
          )} - ${formatShiftTime(shift.endTime)}`;

          return (
            <Box
              key={shift.id}
              sx={{ display: "flex", flexDirection: "column", gap: 0.25 }}
            >
              <Typography
                variant="caption"
                sx={{
                  fontSize: "8px",
                  color: "text.secondary",
                  textAlign: "center",
                  lineHeight: 1,
                }}
              >
                {shiftTimeRange}
              </Typography>

              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  bgcolor: isShiftLoading ? "grey.400" : "primary.main",
                  color: "white",
                  borderRadius: 1.5,
                  px: 1,
                  py: 0.5,
                  opacity: isShiftLoading ? 0.7 : 1,
                  cursor: "pointer",
                  "&:hover": {
                    bgcolor: isShiftLoading ? "grey.500" : "primary.dark",
                  },
                  gap: 0.5,
                  minHeight: "24px",
                }}
                onClick={() => {
                  if (!isShiftLoading) {
                    onRemoveUser(
                      shift.id,
                      shift.userId,
                      startTime,
                      endTime || startTime
                    );
                  }
                }}
              >
                <Typography
                  variant="body2"
                  sx={{
                    fontWeight: "bold",
                    fontSize: "11px",
                    flex: 1,
                    textAlign: "left",
                    lineHeight: 1.2,
                  }}
                >
                  {user?.name || "Unknown User"}
                </Typography>

                {/* Delete button or loading indicator */}
                {isShiftLoading ? (
                  <CircularProgress size={12} sx={{ color: "inherit" }} />
                ) : (
                  <DeleteIcon sx={{ fontSize: 14, opacity: 0.8 }} />
                )}
              </Box>
            </Box>
          );
        })}
      </Stack>
    </TableCell>
  );
};

export const ScheduleCalender: FC<ScheduleCalenderProps> = (props) => {
  const {
    shifts,
    locationId,
    users,
    setShifts,
    fetchSchedule,
    saveSchedule,
    deleteSchedule,
    status,
    ...other
  } = props;

  const [modalOpen, setModalOpen] = useState(false);
  const [startDate, setStartDate] = useState(() => {
    const today = new Date();
    const dayOfWeek = today.getDay();
    const startOfWeek = new Date(today);
    startOfWeek.setDate(today.getDate() - dayOfWeek);
    return startOfWeek;
  });
  const [viewInterval, setViewInterval] = useState<number>(8);
  const [loadingShiftIds, setLoadingShiftIds] = useState<Set<string>>(
    new Set()
  );
  const [isCreatingShift, setIsCreatingShift] = useState(false);
  const lastFetchedRef = useRef<string | null>(null);
  const skipNextFetchRef = useRef<boolean>(false);

  const endDate = useMemo(() => {
    const end = new Date(startDate);
    end.setDate(startDate.getDate() + 6);
    end.setHours(23, 59, 59, 999);
    return end;
  }, [startDate]);

  const weekHeaders = useMemo(() => {
    const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    return Array.from({ length: 7 }, (_, index) => {
      const date = new Date(startDate);
      date.setDate(startDate.getDate() + index);
      const monthShortName = date.toLocaleString("default", { month: "short" });
      const dayName = days[date.getDay()];
      return `${dayName} ${monthShortName}-${date.getDate()}`;
    });
  }, [startDate]);

  const handleDropUser = useCallback(
    async (
      user: User,
      startTime: string,
      endTime: string,
      currentShifts: Shift[]
    ) => {
      if (!locationId) {
        toast.error("Please select a location first");
        return;
      }

      if (hasUserConflict(user.id, startTime, endTime, shifts)) {
        toast.error(`${user.name} already has a shift during this time period`);
        return;
      }
      const startDate = new Date(startTime);
      const endDate = new Date(endTime);
      const startHour = startDate.getHours();
      const duration = Math.round(
        (endDate.getTime() - startDate.getTime()) / (1000 * 60 * 60)
      );
      const deterministicId = `manual-${locationId}-${user.id}-${
        startDate.toISOString().split("T")[0]
      }-${startHour}-${duration}`;

      const newShift: Shift = {
        id: deterministicId,
        userId: user.id,
        startTime,
        endTime,
        shiftType: "Regular",
        locationId,
      };
      setLoadingShiftIds((prev) => new Set(prev).add(newShift.id));
      try {
        skipNextFetchRef.current = true;

        const newShifts = [...shifts, newShift];
        setShifts({ schedule: newShifts, scheduleCount: newShifts.length });

        await saveSchedule(newShift);

        toast.success(`${user.name} scheduled successfully`);
      } catch (error) {
        skipNextFetchRef.current = false;
        setShifts({ schedule: shifts, scheduleCount: shifts.length });
        toast.error(
          `Failed to schedule ${user.name}: ${
            error instanceof Error ? error.message : "Unknown error"
          }`
        );
      } finally {
        setLoadingShiftIds((prev) => {
          const newSet = new Set(prev);
          newSet.delete(newShift.id);
          return newSet;
        });
      }
    },
    [shifts, locationId, setShifts, saveSchedule]
  );
  const handleRemoveUser = useCallback(
    async (
      id: string,
      userId: string,
      deleteStartTime: string,
      deleteEndTime: string
    ) => {
      setLoadingShiftIds((prev) => new Set(prev).add(id));

      try {
        skipNextFetchRef.current = true;

        const shiftToDelete = shifts.find((s) => s.id === id);

        if (!shiftToDelete) {
          toast.error("Shift not found");
          return;
        }

        const isSegment = id.includes("-segment-");
        const user = users.find((u) => u.id === userId);
        const userName = user?.name || "Unknown User";

        const formatTime = (dateString: string) => {
          return new Date(dateString).toLocaleTimeString("en-US", {
            hour: "2-digit",
            minute: "2-digit",
            hour12: false,
          });
        };

        // Check if we're deleting the entire shift or just a portion
        const shiftStart = new Date(shiftToDelete.startTime);
        const shiftEnd = new Date(shiftToDelete.endTime);
        const deleteStart = new Date(deleteStartTime);
        const deleteEnd = new Date(deleteEndTime);

        // Check if the deletion covers the entire shift
        const isDeletingEntireShift =
          deleteStart <= shiftStart && deleteEnd >= shiftEnd;

        if (isDeletingEntireShift) {
          // Delete the entire shift
          const newShifts = shifts.filter((s) => s.id !== id);
          setShifts({ schedule: newShifts, scheduleCount: newShifts.length });

          await mockDeleteShift(id);

          const deletedTimeRange = `${formatTime(
            shiftToDelete.startTime
          )} - ${formatTime(shiftToDelete.endTime)}`;
          const deletionMessage = isSegment
            ? `${userName}'s shift segment deleted`
            : `${userName}'s shift deleted`;

          toast.success(
            <div
              style={{ display: "flex", flexDirection: "column", gap: "4px" }}
            >
              <span>{deletionMessage}</span>
              <div
                style={{ display: "flex", alignItems: "center", gap: "4px" }}
              >
                <span style={{ fontSize: "12px" }}>Time removed:</span>
                <span
                  style={{
                    backgroundColor: "#ef4444",
                    color: "white",
                    padding: "2px 8px",
                    borderRadius: "12px",
                    fontSize: "12px",
                    fontWeight: "500",
                  }}
                >
                  {deletedTimeRange}
                </span>
              </div>
            </div>
          );
        } else {
          // Partial deletion - use the clicked time interval
          const actualDeleteStartTime = Math.max(
            deleteStart.getTime(),
            shiftStart.getTime()
          );
          const actualDeleteEndTime = Math.min(
            deleteEnd.getTime(),
            shiftEnd.getTime()
          );

          const deletionResult = await mockDeleteShiftPartial(
            id,
            new Date(actualDeleteStartTime).toISOString(),
            new Date(actualDeleteEndTime).toISOString()
          );

          const newShifts = shifts.filter((s) => s.id !== id);

          if (deletionResult.newShifts && deletionResult.newShifts.length > 0) {
            newShifts.push(...deletionResult.newShifts);
          }
          setShifts({
            schedule: newShifts,
            scheduleCount: newShifts.length,
          });

          const deletedInterval = `${formatTime(
            deletionResult.deletedInterval.start
          )} - ${formatTime(deletionResult.deletedInterval.end)}`;

          toast.success(
            <div
              style={{ display: "flex", flexDirection: "column", gap: "4px" }}
            >
              <span>{userName}'s shift updated</span>
              <div
                style={{ display: "flex", alignItems: "center", gap: "4px" }}
              >
                <span style={{ fontSize: "12px" }}>Time removed:</span>
                <span
                  style={{
                    backgroundColor: "#ef4444",
                    color: "white",
                    padding: "2px 8px",
                    borderRadius: "12px",
                    fontSize: "12px",
                    fontWeight: "500",
                  }}
                >
                  {deletedInterval}
                </span>
              </div>
            </div>
          );
        }
      } catch (error) {
        skipNextFetchRef.current = false;
        setShifts({ schedule: shifts, scheduleCount: shifts.length });

        toast.error(
          `Failed to remove shift: ${
            error instanceof Error ? error.message : "Unknown error"
          }`
        );
      } finally {
        setLoadingShiftIds((prev) => {
          const newSet = new Set(prev);
          newSet.delete(id);
          return newSet;
        });
      }
    },
    [shifts, setShifts, users]
  );

  const handleModalSubmit = useCallback(
    async (startTime: Date, endTime: Date, selectedUserId: string) => {
      if (!locationId) {
        toast.error("Please select a location first");
        return;
      }

      const user = users.find((u) => u.id === selectedUserId);
      if (!user) {
        toast.error("Selected user not found");
        return;
      }

      setIsCreatingShift(true);
      try {
        await handleDropUser(
          user,
          startTime.toISOString(),
          endTime.toISOString(),
          []
        );
        setModalOpen(false);
      } catch (error) {
        console.error("Failed to create shift:", error);
      } finally {
        setIsCreatingShift(false);
      }
    },
    [locationId, users, handleDropUser]
  );
  const fetchScheduleRef = useRef(fetchSchedule);
  fetchScheduleRef.current = fetchSchedule;
  useEffect(() => {
    if (locationId) {
      const fetchKey = `${locationId}-${startDate.toISOString()}-${endDate.toISOString()}`;

      if (skipNextFetchRef.current) {
        skipNextFetchRef.current = false;
        lastFetchedRef.current = fetchKey;
        return;
      }

      if (lastFetchedRef.current !== fetchKey) {
        lastFetchedRef.current = fetchKey;
        fetchScheduleRef.current({
          overrideSiteId: locationId,
          overrideStartDate: startDate.toISOString(),
          overrideEndDate: endDate.toISOString(),
          overrideSiteChanged: true,
        });
      }
    }
  }, [startDate, endDate, locationId]);

  useEffect(() => {
    if (!locationId) {
      setShifts({ schedule: [], scheduleCount: 0 });
    }
  }, [locationId, setShifts]);

  const getShiftsForTimeSlot = useCallback(
    (timeSlotStart: Date, timeSlotEnd: Date): Shift[] => {
      return shifts.filter((shift) =>
        isTimeOverlapping(
          shift.startTime,
          shift.endTime,
          timeSlotStart.toISOString(),
          timeSlotEnd.toISOString()
        )
      );
    },
    [shifts]
  );

  if (!locationId) {
    return (
      <Card sx={{ p: 4, textAlign: "center" }}>
        <Typography variant="h6" color="text.secondary">
          Please select a location to view the schedule
        </Typography>
      </Card>
    );
  }

  return (
    <Card>
      <Box sx={{ p: 2, borderBottom: 1, borderColor: "divider" }}>
        <Stack
          direction="row"
          justifyContent="space-between"
          alignItems="center"
        >
          <Typography variant="h6">
            Schedule - Week of {startDate.toLocaleDateString()}
          </Typography>
          <IntervalSelector
            viewInterval={viewInterval}
            setViewInterval={setViewInterval}
          />
        </Stack>
      </Box>

      <Box sx={{ overflow: "auto" }}>
        <Table stickyHeader>
          <TableHead>
            <TableRow>
              <TableCell
                sx={{
                  minWidth: 100,
                  bgcolor: "background.paper",
                  border: "1px solid",
                  borderColor: "divider",
                }}
              >
                <Typography variant="subtitle2" fontWeight="bold">
                  Time
                </Typography>
              </TableCell>
              <WeekHeader
                weekHeaders={weekHeaders}
                startDay={startDate}
                setStartDay={setStartDate}
                handleModalOpen={() => setModalOpen(true)}
              />
            </TableRow>
          </TableHead>

          <TableBody>
            {Array.from(
              { length: Math.ceil(24 / viewInterval) },
              (_, hindex) => {
                const timeLabel = formatTimeLabel(viewInterval, hindex);

                return (
                  <TableRow key={hindex}>
                    <TableCell
                      sx={{
                        bgcolor: "grey.50",
                        border: "1px solid",
                        borderColor: "divider",
                        fontWeight: "medium",
                      }}
                    >
                      <Typography variant="body2" fontWeight="medium">
                        {timeLabel}
                      </Typography>
                    </TableCell>

                    {weekHeaders.map((_, dayIndex) => {
                      const cellDate = new Date(startDate);
                      cellDate.setDate(startDate.getDate() + dayIndex);
                      cellDate.setHours(hindex * viewInterval, 0, 0, 0);

                      const cellEndDate = new Date(cellDate);
                      cellEndDate.setHours(
                        cellEndDate.getHours() + viewInterval
                      );

                      const cellShifts = getShiftsForTimeSlot(
                        cellDate,
                        cellEndDate
                      );
                      const cellId = `${hindex}-${dayIndex}`;

                      return (
                        <DropTargetCell
                          key={cellId}
                          startTime={cellDate.toISOString()}
                          endTime={cellEndDate.toISOString()}
                          users={users}
                          currentShifts={cellShifts}
                          onDropUser={handleDropUser}
                          onRemoveUser={handleRemoveUser}
                          loadingShiftIds={loadingShiftIds}
                        />
                      );
                    })}
                  </TableRow>
                );
              }
            )}
          </TableBody>
        </Table>
      </Box>

      <ShiftCreationModal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        users={users}
        onSubmit={handleModalSubmit}
        isLoading={isCreatingShift}
      />
    </Card>
  );
};

DropTargetCell.propTypes = {
  // @ts-ignore
  shift: PropTypes.object,
  // @ts-ignore
  date: PropTypes.string,
};
ScheduleCalender.propTypes = {
  // @ts-ignore
  fetchSchedule: PropTypes.func.isRequired,
  saveSchedule: PropTypes.func.isRequired,
  deleteSchedule: PropTypes.func.isRequired,
  shifts: PropTypes.array.isRequired,
  users: PropTypes.array.isRequired,
  // @ts-ignore
  status: PropTypes.object.isRequired,
};
ShiftCreationModal.propTypes = {
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  users: PropTypes.array.isRequired,
  onSubmit: PropTypes.func.isRequired,
};

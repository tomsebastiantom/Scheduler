import { FC, useState, useEffect } from "react";
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
import ListItem from "@mui/material/ListItem";
import List from "@mui/material/List";
import Avatar from "@mui/material/Avatar";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Select from "@mui/material/Select";
import ListItemText from "@mui/material/ListItemText";
import { User } from "src/types/user";
import { Shift } from "src/types/shift";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import Autocomplete from "@mui/material/Autocomplete";
import CloseIcon from "@mui/icons-material/Close";
import { MobileTimePicker } from "@mui/x-date-pickers";
import { toast } from "react-hot-toast";
import { v4 as uuid } from "uuid";

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
const ShiftCreationModal: React.FC<ShiftCreationModalProps> = ({
  open,
  onClose,
  users,
  onSubmit,
}) => {
  const [selectedUser, setSelectedUser] = useState<string | null>(null);
  const [startTime, setStartTime] = useState<Date | null>(null);
  const [endTime, setEndTime] = useState<Date | null>(null);

  const clearState = () => {
    setSelectedUser(null);
    setStartTime(null);
    setEndTime(null);
  };

  const handleDurationClick = (hours: number) => {
    if (startTime) {
      const newEndTime = new Date(startTime);
      newEndTime.setHours(newEndTime.getHours() + hours);
      setEndTime(newEndTime);
    }
  };

  const handleSubmit = () => {
    if (selectedUser !== null && startTime !== null && endTime !== null) {
      onSubmit(startTime, endTime, selectedUser);
      clearState();
      onClose();
    } else {
      toast.error("Please fill out all fields before submitting.");
    }
  };

  return (
    <Modal
      open={open}
      onClose={() => {
        clearState();
        onClose();
      }}
    >
      <Box
        sx={{
          position: "relative",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: 400,
          bgcolor: "background.paper",
          border: "2px solid #000",
          boxShadow: 24,
          p: 4,
        }}
      >
        <IconButton
          sx={{
            position: "absolute",
            top: -27,
            right: -15,
            backgroundColor: "#FFF",
          }}
          onClick={() => {
            clearState();
            onClose();
          }}
        >
          <CloseIcon />
        </IconButton>
        <MobileTimePicker
          label="Start Time"
          value={startTime}
          onChange={(newValue) => {
            setStartTime(newValue);
          }}
          ampm={false}
        />
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-around",
            marginTop: 2,
          }}
        >
          <Button onClick={() => handleDurationClick(2)}>2 Hour</Button>
          <Button onClick={() => handleDurationClick(4)}>4 Hours</Button>
          <Button onClick={() => handleDurationClick(8)}>8 Hours</Button>
          {/* Add more buttons as needed */}
        </Box>
        <MobileTimePicker
          label="End Time"
          value={endTime}
          onChange={(newValue) => {
            setEndTime(newValue);
          }}
          ampm={false}
        />
        <Autocomplete
          value={users.find((user) => user.id === selectedUser) || null}
          onChange={(_, newValue) => setSelectedUser(newValue?.id || null)}
          options={users}
          getOptionLabel={(option) => option.name}
          renderInput={(params) => (
            <TextField {...params} label="User" fullWidth />
          )}
        />
        <Button onClick={handleSubmit} fullWidth>
          Submit
        </Button>
      </Box>
    </Modal>
  );
};
const IntervalSelector: FC<IntervalSelectorProps> = ({
  viewInterval,
  setViewInterval,
}) => {
  return (
    <Select
      value={viewInterval}
      onChange={(e) => setViewInterval(Number(e.target.value))}
    >
      <MenuItem value={1}>1-Hour Interval</MenuItem>
      <MenuItem value={8}>8-Hour Interval</MenuItem>
    </Select>
  );
};
const WeekHeader: FC<WeekHeaderProps> = ({
  weekHeaders,
  setStartDay,
  startDay,
  handleModalOpen,
}) => {
  const [hoverIndex, setHoverIndex] = useState<number | null>(null);

  return (
    <>
      {weekHeaders.map((day, index) => (
        <TableCell
          key={day}
          onMouseEnter={() => setHoverIndex(index)}
          onMouseLeave={() => setHoverIndex(null)}
          sx={{
            textAlign: "center",
            width: index === 0 || index === 6 ? "15%" : "10%",
            border: "3px solid grey",
          }}
        >
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
            }}
          >
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
              }}
            >
              {index === 0 && (
                <Button
                  onClick={() =>
                    setStartDay(
                      (prevDay) =>
                        new Date(prevDay.setDate(prevDay.getDate() - 1))
                    )
                  }
                >
                  <ArrowBackIosIcon />
                </Button>
              )}
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                {day}
                {hoverIndex === index && (
                  <IconButton onClick={handleModalOpen}>
                    <AddIcon />
                  </IconButton>
                )}
              </Box>
              {index === 6 && (
                <Button
                  onClick={() =>
                    setStartDay(
                      (prevDay) =>
                        new Date(prevDay.setDate(prevDay.getDate() + 1))
                    )
                  }
                >
                  <ArrowForwardIosIcon />
                </Button>
              )}
            </Box>
          </Box>
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
}) => {
  const [, dropRef] = useDrop({
    accept: "USER",
    drop: (item: any) => {
      const userToDrop = item.user;

      if (!endTime) {
        const newEndTime = new Date(new Date(startTime).getTime());
        newEndTime.setHours(newEndTime.getHours() + 1);
        endTime = newEndTime.toISOString();
      }

      onDropUser(userToDrop, startTime, endTime!, currentShifts);
    },
  });

  return (
    <TableCell
      ref={dropRef}
      key={startTime}
      align="center"
      sx={{
        border: "3px solid grey",
        // backgroundColor: shifts ? "red" : "inherit",
      }}
    >
      {currentShifts &&
        currentShifts.map((s) => (
          <ListItem key={`${s.id}`}>
            <ListItemText
              primary={
                users.find((user) => user.id === s.userId)?.name || s.userId
              }
              sx={{ fontSize: "0.8rem" }}
            />
            <IconButton
              onClick={() => {
                onRemoveUser(s.id, s.userId, s.startTime, s.endTime);
              }}
              size="small"
            >
              <DeleteIcon />
            </IconButton>
          </ListItem>
        ))}
    </TableCell>
  );
};

export const ScheduleCalender: FC<ScheduleCalenderProps> = (props) => {
  const [modalOpen, setModalOpen] = useState(false);
  const [showPlusIcon, setShowPlusIcon] = useState<number | null>(null);
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

  const [shiftsState, setShiftsState] = useState<Shift[]>(shifts);
  const [endDate, setEndDate] = useState(new Date());
  const [startDate, setStartDate] = useState(new Date());
  const [viewInterval, setViewInterval] = useState<number>(8);

  const handleDropUser = async (
    user: User,
    startTime: string,
    endTime: string,
    currentShifts: Shift[]
  ) => {
    const newShift: Shift = {
      id: uuid(),
      userId: user.id,
      startTime: startTime,
      endTime: endTime,
      shiftType: "Regular",
      locationId: locationId,
    };


    if (currentShifts.length >= 1) {
      const existingShift = currentShifts.find(
        (s) =>
          s.userId === user.id &&
          s.startTime === startTime &&
          new Date(s.endTime).getTime() <= new Date(endTime).getTime()
      );

      if (existingShift) {
        return;
      }
    }
    const newShifts = [...shifts, newShift];

    setShifts({ schedule: newShifts, scheduleCount: newShifts.length });
    
    await saveSchedule(newShift);

    if (status.saveStatus.isSuccess) {
      console.log("Schedule Sucessfully Saved");
    } else {
      setShifts({ schedule: shifts, scheduleCount: shifts.length });
    }
  };

  const handleRemoveUser = async (
    id: string,
    userId: string,
    startTime: string,
    endTime: string
  ) => {
    const previousShifts = [...shifts];

    let shiftModified = false;
    let shiftToDelete: Shift | null = null;

    const currentStartTimestamp = new Date(startTime).getTime();
    const currentEndTimestamp = new Date(endTime).getTime();

    const newShifts = shifts.filter((s) => {
      if (s.id === id) {
        const shiftStartTimestamp = new Date(s.startTime).getTime();
        const shiftEndTimestamp = new Date(s.endTime).getTime();

        if (
          shiftStartTimestamp === currentStartTimestamp &&
          shiftEndTimestamp === currentEndTimestamp
        ) {
          shiftToDelete = s;
          return false;
        } else if (
          shiftStartTimestamp < currentEndTimestamp &&
          shiftEndTimestamp > currentStartTimestamp
        ) {
          if (shiftStartTimestamp < currentStartTimestamp) {
            s.endTime = new Date(currentStartTimestamp).toISOString();
          } else if (shiftEndTimestamp > currentEndTimestamp) {
            s.startTime = new Date(currentEndTimestamp).toISOString();
          }
          shiftModified = true;
        }
      }
      return true;
    });

    if (!shiftModified && !shiftToDelete) return;
    console.log("newShifts after delete", newShifts);
    setShifts({ schedule: newShifts, scheduleCount: newShifts.length });

    if (shiftToDelete) {
      // @ts-ignore
      await deleteSchedule(shiftToDelete.id!);
      if (!status.deleteStatus.isSuccess) {
        setShifts({
          schedule: previousShifts,
          scheduleCount: previousShifts.length,
        });
      }
    } else if (shiftModified) {
      // If a shift was modified, you might want to update it in the backend (if needed)
      // Example:
      // const result = await updateSchedule(updatedShift);
      // if (!result.isSuccess) {
      //   setShifts(previousShifts); // Revert if update failed
      // }
    }
  };

  const handleModalOpen = () => {
    setModalOpen(true);
  };
  const handleModalClose = () => {
    setModalOpen(false);
  };
  const getShifts = (startDate: string, endDate: string) => {
    fetchSchedule({
      overrideStartDate: startDate,
      overrideEndDate: endDate,
    });
  };

  const createShift = (n: any) => {
    return {
      success: true,
    };
  };
  const handleSubmit = (
    startTime: Date,
    endTime: Date,
    selectedUser: string
  ) => {
    const newShift = {
      endTime: `${startTime}`,
      startTime: `${endTime}`,
      locationId: "string",
      userId: selectedUser,
      shiftType: "string",
      createdBy: "string",
    };

   
    toast.success("Shift created successfully.");
   
  };
  useEffect(() => {
    getShifts(startDate.toISOString(), endDate.toISOString());
  }, [startDate, endDate]);

  const getWeekHeaders = (startingDate: Date) => {
    const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    return new Array(7).fill(null).map((_, index) => {
      const date = new Date(startingDate);
      date.setDate(startingDate.getDate() + index);
      const monthShortName = date.toLocaleString("default", { month: "short" });
      const dayName = days[date.getDay()];
      return `${dayName} ${monthShortName}-${date.getDate()}`;
    });
  };

  const weekHeaders = getWeekHeaders(startDate);

  return (
    <Card>
      <Stack direction="row" justifyContent="center" alignItems="center">
        <IntervalSelector
          viewInterval={viewInterval}
          setViewInterval={setViewInterval}
        />
      </Stack>
      <Card
        sx={{
          border: "3px solid grey",
        }}
      >
        <Table>
          <TableHead>
            <TableRow>
              <TableCell
                sx={{
                  width: "10%",
                  border: "3px solid grey",
                  borderRadius: "100",
                }}
              >
                Time
              </TableCell>
              <WeekHeader
                weekHeaders={weekHeaders}
                startDay={startDate}
                setStartDay={setStartDate}
                handleModalOpen={handleModalOpen}
              />
            </TableRow>
          </TableHead>

          <TableBody>
            {new Array(Math.ceil(24 / viewInterval))
              .fill(null)
              .map((_, hindex) => {
                const startTime =
                  hindex * viewInterval - 1 < 0 ? 0 : hindex * viewInterval - 1;
                const endTime = (hindex + 1) * viewInterval - 1;

                const timeLabel =
                  viewInterval > 1
                    ? `${startTime}:00 - ${endTime}:00`
                    : `${hindex}:00`;

                return (
                  <TableRow
                    key={hindex}
                    sx={{ border: "3px solid grey", height: "80px" }}
                  >
                    <TableCell
                      sx={{
                        backgroundColor: "rgba(0, 0, 0, 0.1)",
                        border: "3px solid grey",
                      }}
                    >
                      {timeLabel}
                    </TableCell>
                    {weekHeaders.map((_, index) => {
                      const currentHour = new Date(startDate);
                      currentHour.setHours(hindex * Number(viewInterval));
                      currentHour.setDate(currentHour.getDate() + index);
                      const currentShiftStartTime: Date = new Date(
                        currentHour.getTime()
                      );

                      currentShiftStartTime.setHours(startTime, 0, 0, 0);

                      const currentShiftEndTime: Date = new Date(
                        currentHour.getTime()
                      );
                      currentShiftEndTime.setHours(endTime, 0, 0, 0);

                      const currentShifts = shifts.filter(
                        (shift) =>
                          new Date(shift.startTime).getTime() <=
                            new Date(
                              currentShiftStartTime.toISOString()
                            ).getTime() &&
                          new Date(shift.endTime).getTime() >=
                            new Date(
                              currentShiftEndTime.toISOString()
                            ).getTime()
                      );

                    

                      return (
                        <DropTargetCell
                          startTime={currentShiftStartTime.toISOString()}
                          endTime={
                            viewInterval > 1
                              ? currentShiftEndTime.toISOString()
                              : null
                          }
                          users={users}
                          key={`${hindex}-${index}`}
                          currentShifts={currentShifts}
                          onDropUser={handleDropUser}
                          onRemoveUser={handleRemoveUser}
                        />
                      );
                    })}
                  </TableRow>
                );
              })}
          </TableBody>
        </Table>
      </Card>
      <ShiftCreationModal
        open={modalOpen}
        onClose={handleModalClose}
        users={users}
        onSubmit={handleSubmit}
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

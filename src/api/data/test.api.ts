import { authData } from "./auth";
import { LoginPayload, LoginResponse } from "../auth.api";
import { ApiRequestConfig } from "../api.types";
import { v4 as uuidv4 } from "uuid";
import { User, UpdatedUser, NewUser } from "src/types/user";
import { users } from "./users";
import { Shift } from "src/types/shift";
import { locations } from "./locations";
import { Location, CreatedLocation } from "src/types/location";

export const mockLogin = (
  { username, password }: LoginPayload,
  config?: ApiRequestConfig
): Promise<LoginResponse> => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (username === authData.username && password === authData.password) {
        resolve({
          accessToken: authData.accessToken,
          refreshToken: authData.refreshToken,
        });
      } else {
        reject(new Error("Invalid credentials"));
      }
    }, 10);
  });
};

export const mockLogout = (config?: ApiRequestConfig): Promise<void> => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve();
    }, 10);
  });
};

export const mockGetAllUsers = (config?: ApiRequestConfig): Promise<User[]> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(users);
    }, 10);
  });
};

export const mockGetUser = (
  userId: string,
  config?: ApiRequestConfig
): Promise<User> => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const user = users.find((u) => u.id === userId);
      if (user) {
        resolve(user);
      } else {
        reject(new Error("User not found"));
      }
    }, 10);
  });
};

export const mockCreateUser = (
  newUser: NewUser,
  config?: ApiRequestConfig
): Promise<NewUser> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const user: User = {
        id: uuidv4(),
        ...newUser,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };
      users.push(user);
      resolve(user);
    }, 10);
  });
};

export const mockUpdateUser = (
  updatedUser: UpdatedUser,
  config?: ApiRequestConfig
): Promise<User> => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const user = users.find((u) => u.id === updatedUser.userId);
      if (user) {
        Object.assign(user, updatedUser);
        user.updatedAt = new Date().toISOString();
        resolve(user);
      } else {
        reject(new Error("User not found"));
      }
    }, 10);
  });
};

export const mockDeleteUser = (
  userId: string,
  config?: ApiRequestConfig
): Promise<void> => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const index = users.findIndex((u) => u.id === userId);
      if (index !== -1) {
        users.splice(index, 1);
        resolve();
      } else {
        reject(new Error("User not found"));
      }
    }, 10);
  });
};

const shifts: Shift[] = [];

const userIds = [
  "1a2b3c4d",
  "2b3c4d5e",
  "3c4d5e6f",
  "4d5e6f7g",
  "5e6f7g8h",
  "6f7g8h9i",
  "7g8h9i10",
  "8h9i10j1",
  "9i10j1k2",
  "10j1k2l3",
  "11k2l3m4",
  "12l3m4n5",
  "13m4n5o6",
  "14n5o6p7",
  "15o6p7q8",
];

const locationIds = [
  "1a2b3c4d5678",
  "2b3c4d5e6789",
  "3c4d5e6f7890",
  "4d5e6f7g8901",
  "5e6f7g8h9i",
  "6f7g8h9i10",
  "7g8h9i10j",
  "8h9i10j11",
  "9i10j11k1",
  "10j11k12l",
  "11k12l13m",
  "12l13m14n",
  "13m14n15o",
  "14n15o16p",
  "15o6p7q8",
];

const generatedShiftsCache: Map<string, boolean> = new Map();

const shuffleArray = <T>(array: T[]): T[] => {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
};

const getRandomUsers = (locationId: string, count: number): string[] => {
  const seed = locationId
    .split("")
    .reduce((acc, char) => acc + char.charCodeAt(0), 0);

  const shuffledUsers = [...userIds].sort((a, b) => {
    const aHash = (seed + a.charCodeAt(0)) % 1000;
    const bHash = (seed + b.charCodeAt(0)) % 1000;
    return aHash - bHash;
  });

  return shuffledUsers.slice(0, count);
};

const getRandomShiftTimes = (
  locationId: string,
  dayIndex: number
): { start: number; duration: number } => {
  const seed =
    locationId.split("").reduce((acc, char) => acc + char.charCodeAt(0), 0) +
    dayIndex;

  const shiftPatterns = [
    { start: 6, duration: 8 },
    { start: 14, duration: 8 },
    { start: 22, duration: 8 },
    { start: 6, duration: 16 },
    { start: 18, duration: 16 },
    { start: 0, duration: 24 },
    { start: 8, duration: 24 },
  ];

  const selectedPattern = shiftPatterns[seed % shiftPatterns.length];
  return { start: selectedPattern.start, duration: selectedPattern.duration };
};

const generateShiftsForLocation = (
  locationId: string,
  startDate: Date,
  endDate: Date
): Shift[] => {
  const cacheKey = `${locationId}-${startDate.toISOString()}-${endDate.toISOString()}`;
  if (generatedShiftsCache.has(cacheKey)) {
    return shifts.filter(
      (shift) =>
        shift.locationId === locationId &&
        new Date(shift.startTime) >= startDate &&
        new Date(shift.endTime) <= endDate &&
        shift.id &&
        shift.id.startsWith(locationId)
    );
  }

  const newShifts: Shift[] = [];
  const oneDay = 24 * 60 * 60 * 1000;
  const dayDifference = Math.ceil(
    (endDate.getTime() - startDate.getTime()) / oneDay
  );

  const locationSeed = locationId
    .split("")
    .reduce((acc, char) => acc + char.charCodeAt(0), 0);
  const numberOfUsers = 3 + (locationSeed % 6); // 3-8 users
  const selectedUsers = getRandomUsers(locationId, numberOfUsers);

  for (let dayIndex = 0; dayIndex <= dayDifference; dayIndex++) {
    const currentDate = new Date(startDate.getTime() + dayIndex * oneDay);

    const isWeekend = currentDate.getDay() === 0 || currentDate.getDay() === 6;
    if (isWeekend && locationSeed % 3 === 0) {
      continue;
    }

    const usersPerDay =
      1 + ((locationSeed + dayIndex) % Math.min(4, selectedUsers.length));
    const dayUsers = selectedUsers.slice(0, usersPerDay);

    dayUsers.forEach((userId, userIndex) => {
      const { start, duration } = getRandomShiftTimes(
        locationId,
        dayIndex + userIndex
      );

      const shiftStartTime = new Date(currentDate);
      shiftStartTime.setHours(start, 0, 0, 0);

      const shiftEndTime = new Date(shiftStartTime);
      shiftEndTime.setHours(shiftStartTime.getHours() + duration);

      if (shiftStartTime >= startDate && shiftEndTime <= endDate) {
        const hasConflict = shifts.some(
          (existingShift) =>
            existingShift.userId === userId &&
            existingShift.locationId === locationId &&
            new Date(existingShift.startTime) < shiftEndTime &&
            new Date(existingShift.endTime) > shiftStartTime
        );

        if (!hasConflict) {
          const deterministicId = `${locationId}-${userId}-${dayIndex}-${userIndex}-${start}-${duration}`;

          const newShift: Shift = {
            id: deterministicId,
            userId,
            locationId,
            startTime: shiftStartTime.toISOString(),
            endTime: shiftEndTime.toISOString(),
            shiftType: "Normal",
          };

          newShifts.push(newShift);
        }
      }
    });
  }

  shifts.push(...newShifts);

  generatedShiftsCache.set(cacheKey, true);

  return newShifts;
};

export const mockGetShiftsByLocationId = (
  locationId: string,
  startTime: string,
  endTime: string,
  config?: any
): Promise<Shift[]> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const start = new Date(startTime);
      const end = new Date(endTime);

      const manualShifts = shifts.filter(
        (shift) =>
          shift.locationId === locationId &&
          new Date(shift.startTime) >= start &&
          new Date(shift.endTime) <= end &&
          shift.id &&
          !shift.id.startsWith(locationId)
      );

      const generatedShifts = generateShiftsForLocation(locationId, start, end);

      const allShifts = [...generatedShifts, ...manualShifts];

      resolve(allShifts);
    }, 10);
  });
};

export const mockGetExistingShiftsByLocationId = (
  locationId: string,
  startTime: string,
  endTime: string,
  config?: any
): Promise<Shift[]> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const start = new Date(startTime);
      const end = new Date(endTime);

      // Only return existing shifts, don't generate new ones
      const existingShifts = shifts.filter(
        (shift) =>
          shift.locationId === locationId &&
          new Date(shift.startTime) >= start &&
          new Date(shift.endTime) <= end
      );

      resolve(existingShifts);
    }, 10);
  });
};

export const mockGetShiftsById = (
  shiftId: string,
  config?: ApiRequestConfig
): Promise<Shift> => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const shift = shifts.find((s) => s.id === shiftId);
      if (shift) {
        resolve(shift);
      } else {
        reject(new Error("Shift not found"));
      }
    }, 10);
  });
};

export const mockGetShiftsByUserId = (
  userId: string,
  startTime: string,
  endTime: string,
  config?: ApiRequestConfig
): Promise<Shift[]> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const start = new Date(startTime);
      const end = new Date(endTime);

      const filteredShifts = shifts.filter(
        (s) =>
          s.userId === userId &&
          new Date(s.startTime) >= start &&
          new Date(s.endTime) <= end
      );

      resolve(filteredShifts);
    }, 10);
  });
};

export const mockDeleteShift = (
  shiftId: string,
  config?: ApiRequestConfig
): Promise<void> => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const index = shifts.findIndex((s) => s.id === shiftId);
      if (index !== -1) {
        shifts.splice(index, 1);
        resolve();
      } else {
        reject(new Error("Shift not found"));
      }
    }, 10);
  });
};

// New function for partial shift deletion based on time interval
export const mockDeleteShiftPartial = (
  shiftId: string,
  deleteStartTime: string,
  deleteEndTime: string,
  config?: ApiRequestConfig
): Promise<{
  deletedInterval: { start: string; end: string };
  resultingShifts: number;
  isFullDeletion: boolean;
  newShifts: Shift[];
}> => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const shiftIndex = shifts.findIndex((s) => s.id === shiftId);
      if (shiftIndex === -1) {
        reject(new Error("Shift not found"));
        return;
      }

      const originalShift = shifts[shiftIndex];
      const deleteStart = new Date(deleteStartTime);
      const deleteEnd = new Date(deleteEndTime);
      const shiftStart = new Date(originalShift.startTime);
      const shiftEnd = new Date(originalShift.endTime);

      if (deleteStart <= shiftStart && deleteEnd >= shiftEnd) {
        shifts.splice(shiftIndex, 1);
        resolve({
          deletedInterval: { start: deleteStartTime, end: deleteEndTime },
          resultingShifts: 0,
          isFullDeletion: true,
          newShifts: [],
        });
      } else {
        const newShifts: Shift[] = [];
        if (deleteStart > shiftStart) {
          newShifts.push({
            ...originalShift,
            id: `${originalShift.id}-segment-1`,
            endTime: deleteStart.toISOString(),
          });
        }

        // Keep the part after deletion (if any)
        if (deleteEnd < shiftEnd) {
          newShifts.push({
            ...originalShift,
            id: `${originalShift.id}-segment-2`,
            startTime: deleteEnd.toISOString(),
          });
        }

        // Replace original shift with new segments
        shifts.splice(shiftIndex, 1, ...newShifts);

        resolve({
          deletedInterval: { start: deleteStartTime, end: deleteEndTime },
          resultingShifts: newShifts.length,
          isFullDeletion: false,
          newShifts: newShifts,
        });
      }
    }, 10);
  });
};

export const mockUpdateShift = (
  updatedShift: Shift,
  config?: ApiRequestConfig
): Promise<Shift> => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const shift = shifts.find((s) => s.id === updatedShift.id);
      if (shift) {
        Object.assign(shift, updatedShift);
        resolve(shift);
      } else {
        reject(new Error("Shift not found"));
      }
    }, 10);
  });
};

export const mockCreateShift = (
  newShift: Shift,
  config?: ApiRequestConfig
): Promise<Shift> => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      try {
        const shiftWithId = {
          ...newShift,
          id: newShift.id || uuidv4(),
        };

        shifts.push(shiftWithId);
        resolve(shiftWithId);
      } catch (error) {
        reject(new Error("Failed to create shift"));
      }
    }, 10);
  });
};

export const mockGetAllLocations = (
  config?: ApiRequestConfig
): Promise<Location[]> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(locations);
    }, 10);
  });
};

export const mockGetLocation = (
  locationId: string,
  config?: ApiRequestConfig
): Promise<Location> => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const location = locations.find((l) => l.id === locationId);
      if (location) {
        resolve(location);
      } else {
        reject(new Error("Location not found"));
      }
    }, 10);
  });
};

export const mockCreateLocation = (
  location: CreatedLocation,
  config?: ApiRequestConfig
): Promise<Location> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const newLocation = { id: `${Date.now()}`, ...location };
      locations.push(newLocation);
      resolve(newLocation);
    }, 10);
  });
};

export const mockDeleteLocation = (
  locationId: string,
  config?: ApiRequestConfig
): Promise<void> => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const index = locations.findIndex((l) => l.id === locationId);
      if (index > -1) {
        locations.splice(index, 1);
        resolve();
      } else {
        reject(new Error("Location not found"));
      }
    }, 10);
  });
};

export const mockUpdateLocation = (
  location: Location,
  locationId?: string,
  config?: ApiRequestConfig
): Promise<Location> => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const index = locations.findIndex((l) => l.id === locationId);
      if (index > -1) {
        locations[index] = { ...locations[index], ...location };
        resolve(locations[index]);
      } else {
        reject(new Error("Location not found"));
      }
    }, 10);
  });
};

export const clearMockData = (): void => {
  shifts.length = 0;
  generatedShiftsCache.clear();
};

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
  // Create location-specific randomness
  const seed =
    locationId.split("").reduce((acc, char) => acc + char.charCodeAt(0), 0) +
    dayIndex;

  const possibleStarts = [6, 7, 8, 9, 10, 14, 15, 16, 18, 22];
  const possibleDurations = [4, 6, 8, 10, 12];

  const startHour = possibleStarts[seed % possibleStarts.length];
  const duration = possibleDurations[(seed + 1) % possibleDurations.length];

  return { start: startHour, duration };
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
        new Date(shift.endTime) <= endDate
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

      const hasConflict = shifts.some(
        (existingShift) =>
          existingShift.userId === userId &&
          new Date(existingShift.startTime) < shiftEndTime &&
          new Date(existingShift.endTime) > shiftStartTime
      );

      if (!hasConflict) {
        const newShift: Shift = {
          id: `${locationId}-${userId}-${dayIndex}-${userIndex}-${Date.now()}`,
          userId,
          locationId,
          startTime: shiftStartTime.toISOString(),
          endTime: shiftEndTime.toISOString(),
          shiftType: "Normal",
        };

        newShifts.push(newShift);
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

      const existingShifts = shifts.filter(
        (shift) =>
          shift.locationId === locationId &&
          new Date(shift.startTime) >= start &&
          new Date(shift.endTime) <= end
      );

      if (existingShifts.length > 0) {
        resolve(existingShifts);
        return;
      }

      const generatedShifts = generateShiftsForLocation(locationId, start, end);

      resolve(generatedShifts);
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
        const deletedShift = shifts[index];
        shifts.splice(index, 1);

        const locationId = deletedShift.locationId ?? "";
        const keysToDelete = Array.from(generatedShiftsCache.keys()).filter(
          (key) => key.startsWith(locationId)
        );
        keysToDelete.forEach((key) => generatedShiftsCache.delete(key));

        resolve();
      } else {
        reject(new Error("Shift not found"));
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
  return new Promise((resolve) => {
    setTimeout(() => {
      const shiftWithId = {
        ...newShift,
        id: newShift.id || uuidv4(),
      };

      shifts.push(shiftWithId);
      resolve(shiftWithId);
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

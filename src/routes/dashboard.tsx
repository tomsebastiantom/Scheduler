import { lazy, Suspense } from "react";
import type { RouteObject } from "react-router";
import { Outlet } from "react-router-dom";

import { Layout as DashboardLayout } from "src/layouts/dashboard";


const LocationsListPage = lazy(
  () => import("src/pages/dashboard/locations/list")
);

const LocationsEditPage = lazy(
  () => import("src/pages/dashboard/locations/edit")
);
const LocationsAddPage = lazy(
  () => import("src/pages/dashboard/locations/add")
);

const UsersListPage = lazy(() => import("src/pages/dashboard/users/list"));

const SchedulingPage = lazy(
  () => import("src/pages/dashboard/scheduling/list")
);

export const dashboardRoutes: RouteObject[] = [
  {
    path: "dashboard",
    element: (
      <DashboardLayout>
        <Suspense>
          <Outlet />
        </Suspense>
      </DashboardLayout>
    ),
    children: [
      {
        index: true,
        element: <LocationsListPage />,
      },

      {
        path: "locations",
        children: [
          {
            index: true,
            element: <LocationsListPage />,
          },

          {
            path: ":locationId/edit",
            element: <LocationsEditPage />,
          },
          {
            path: "add",
            element: <LocationsAddPage />,
          },
        ],
      },

      {
        path: "users",
        children: [
          {
            index: true,
            element: <UsersListPage />,
          },
        ],
      },

      {
        path: "scheduling",
        children: [
          {
            index: true,
            element: <SchedulingPage />,
          },
        ],
      },
    ],
  },
];

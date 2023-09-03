import { lazy } from "react";
import type { RouteObject } from "react-router";
import { Outlet } from "react-router-dom";

import { Layout as MarketingLayout } from "src/layouts/marketing";

import { authRoutes } from "./auth";
//

import { dashboardRoutes } from "./dashboard";
import { IssuerGuard } from "src/guards/issuer-guard";
import { GuestGuard } from "src/guards/guest-guard";
import { Layout as AuthLayout } from "src/layouts/auth/modern-layout";
import { Issuer } from "src/utils/auth";

const Error401Page = lazy(() => import("src/pages/401"));
const Error404Page = lazy(() => import("src/pages/404"));
const Error500Page = lazy(() => import("src/pages/500"));

const HomePage = lazy(() => import("src/pages/index"));
const ContactPage = lazy(() => import("src/pages/contact"));


const JwtLoginPage = lazy(() => import("src/pages/auth/jwt/login"));
const JwtRegisterPage = lazy(() => import("src/pages/auth/jwt/register"));

export const routes: RouteObject[] = [
  {
    element: (
      <MarketingLayout>
        <Outlet />
      </MarketingLayout>
    ),
    children: [
      {
        index: true,
        element: <HomePage />,
      },
      
    ],
  },

  ...dashboardRoutes,
  {
    path: "login",
    element: (
      <IssuerGuard issuer={Issuer.JWT}>
        <GuestGuard>
          <AuthLayout>
            <JwtLoginPage />
          </AuthLayout>
        </GuestGuard>
      </IssuerGuard>
    ),
  },
  ...authRoutes,


  {
    path: "contact",
    element: <ContactPage />,
  },
  {
    path: "401",
    element: <Error401Page />,
  },
  {
    path: "404",
    element: <Error404Page />,
  },
  {
    path: "500",
    element: <Error500Page />,
  },
  {
    path: "*",
    element: <Error404Page />,
  },
];

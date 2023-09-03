import type { ReactNode } from "react";
import { useMemo } from "react";
import { useTranslation } from "react-i18next";

import SvgIcon from "@mui/material/SvgIcon";

import UsersIcon from "src/icons/users";
import ReceiptCheckIcon from "src/icons/receipt-check";
import { tokens } from "src/locales/tokens";
import { paths } from "src/paths";

export interface Item {
  disabled?: boolean;
  external?: boolean;
  icon?: ReactNode;
  items?: Item[];
  label?: ReactNode;
  path?: string;
  title: string;
}

export interface Section {
  items: Item[];
  subheader?: string;
}

export const useSections = () => {
  const { t } = useTranslation();

  return useMemo(() => {
    return [
      {
        items: [
          {
            title: t(tokens.nav.users),
            path: paths.dashboard.users.index,
            icon: (
              <SvgIcon fontSize="small">
                <UsersIcon />
              </SvgIcon>
            ),
          },
          {
            title: t(tokens.nav.locations),
            path: paths.dashboard.locations.index,
            icon: (
              <SvgIcon fontSize="small">
                <ReceiptCheckIcon />
              </SvgIcon>
            ),
          },

          {
            title: t(tokens.nav.scheduling),
            path: paths.dashboard.scheduling.index,
            icon: (
              <SvgIcon fontSize="small">
                <ReceiptCheckIcon />
              </SvgIcon>
            ),
          },
        ],
      },
    ];
  }, [t]);
};

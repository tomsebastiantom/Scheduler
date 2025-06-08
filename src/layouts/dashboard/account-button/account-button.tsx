import type { FC } from "react";
import User01Icon from "@untitled-ui/icons-react/build/esm/User01";
import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
import ButtonBase from "@mui/material/ButtonBase";
import SvgIcon from "@mui/material/SvgIcon";
import Badge from "@mui/material/Badge";
import { styled } from "@mui/material/styles";

import { usePopover } from "src/hooks/use-popover";
import { getInitials } from "src/utils/get-initials";

import { AccountPopover } from "./account-popover";

const StyledBadge = styled(Badge)(({ theme }) => ({
  "& .MuiBadge-badge": {
    backgroundColor: "#44b700",
    color: "#44b700",
    boxShadow: `0 0 0 2px ${theme.palette.background.paper}`,
    "&::after": {
      position: "absolute",
      top: 0,
      left: 0,
      width: "100%",
      height: "100%",
      borderRadius: "50%",
      animation: "ripple 1.2s infinite ease-in-out",
      border: "1px solid currentColor",
      content: '""',
    },
  },
  "@keyframes ripple": {
    "0%": {
      transform: "scale(.8)",
      opacity: 1,
    },
    "100%": {
      transform: "scale(2.4)",
      opacity: 0,
    },
  },
}));

export const AccountButton: FC = () => {
  const user = {
    avatar: "", // Use empty string to fallback to initials
    name: "John Doe",
    isOnline: true,
  };
  const popover = usePopover<HTMLButtonElement>();

  return (
    <>
      <Box
        component={ButtonBase}
        onClick={popover.handleOpen}
        ref={popover.anchorRef}
        sx={{
          alignItems: "center",
          display: "flex",
          borderWidth: 2,
          borderStyle: "solid",
          borderColor: "transparent",
          height: 44,
          width: 44,
          borderRadius: "50%",
          padding: "2px",
          background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
          transition: "all 0.2s ease-in-out",
          "&:hover": {
            transform: "scale(1.05)",
            boxShadow: "0 8px 25px rgba(102, 126, 234, 0.3)",
          },
        }}
      >
        <StyledBadge
          overlap="circular"
          anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
          variant={user.isOnline ? "dot" : "standard"}
        >
          <Avatar
            sx={{
              height: 36,
              width: 36,
              fontSize: "1rem",
              fontWeight: 600,
              background: "linear-gradient(135deg, #3B82F6 0%, #1D4ED8 100%)",
              border: "2px solid white",
              boxShadow: "0 2px 8px rgba(59, 130, 246, 0.3)",
            }}
            src={user.avatar}
          >
            {getInitials(user.name)}
          </Avatar>
        </StyledBadge>
      </Box>
      <AccountPopover
        anchorEl={popover.anchorRef.current}
        onClose={popover.handleClose}
        open={popover.open}
      />
    </>
  );
};

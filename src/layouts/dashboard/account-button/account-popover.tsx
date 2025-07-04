import type { FC } from "react";
import { useCallback } from "react";
import PropTypes from "prop-types";
import toast from "react-hot-toast";
import User01Icon from "@untitled-ui/icons-react/build/esm/User01";
import PlusIcon from "@untitled-ui/icons-react/build/esm/Plus";
import Mail01Icon from "@untitled-ui/icons-react/build/esm/Mail01";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Divider from "@mui/material/Divider";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Popover from "@mui/material/Popover";
import SvgIcon from "@mui/material/SvgIcon";
import Typography from "@mui/material/Typography";

import { RouterLink } from "src/components/router-link";
import { useAuth } from "src/hooks/use-auth";
import { useMockedUser } from "src/hooks/use-mocked-user";
import { useRouter } from "src/hooks/use-router";
import { paths } from "src/paths";
import { Issuer } from "src/utils/auth";

interface AccountPopoverProps {
  anchorEl: null | Element;
  onClose?: () => void;
  open?: boolean;
}

export const AccountPopover: FC<AccountPopoverProps> = (props) => {
  const { anchorEl, onClose, open, ...other } = props;
  const router = useRouter();
  const auth = useAuth();
  const user = useMockedUser();

  const handleLogout = useCallback(async (): Promise<void> => {
    try {
      onClose?.();

      switch (auth.issuer) {
        case Issuer.JWT: {
          await auth.signOut();
          break;
        }

        default: {
          console.warn("Using an unknown Issuer, naay");
        }
      }

      router.push(paths.index);
    } catch (err) {
      console.error(err);
      toast.error("Oops It didnot work out!");
    }
  }, [auth, router, onClose]);

  return (
    <Popover
      anchorEl={anchorEl}
      anchorOrigin={{
        horizontal: "center",
        vertical: "bottom",
      }}
      disableScrollLock
      onClose={onClose}
      open={!!open}
      PaperProps={{ sx: { width: 200 } }}
      {...other}
    >
      <Box sx={{ p: 2 }}>
        <Typography align="center" variant="body1">
          Welcome
        </Typography>
      </Box>
      <Divider />
      <Box sx={{ p: 1 }}>
        {" "}
        <ListItemButton
          component={RouterLink}
          href={paths.dashboard.users.index}
          onClick={onClose}
          sx={{
            borderRadius: 1,
            px: 1,
            py: 0.5,
          }}
        >
          <ListItemIcon>
            <SvgIcon fontSize="small">
              <User01Icon />
            </SvgIcon>
          </ListItemIcon>
          <ListItemText
            primary={<Typography variant="body1">Users</Typography>}
          />
        </ListItemButton>{" "}
        <ListItemButton
          component={RouterLink}
          href={paths.dashboard.index}
          onClick={onClose}
          sx={{
            borderRadius: 1,
            px: 1,
            py: 0.5,
          }}
        >
          <ListItemIcon>
            <SvgIcon fontSize="small">
              <PlusIcon />
            </SvgIcon>
          </ListItemIcon>
          <ListItemText
            primary={<Typography variant="body1">Locations</Typography>}
          />
        </ListItemButton>{" "}
        <ListItemButton
          component={RouterLink}
          href={paths.dashboard.scheduling.index}
          onClick={onClose}
          sx={{
            borderRadius: 1,
            px: 1,
            py: 0.5,
          }}
        >
          <ListItemIcon>
            <SvgIcon fontSize="small">
              <Mail01Icon />
            </SvgIcon>
          </ListItemIcon>
          <ListItemText
            primary={<Typography variant="body1">Scheduling</Typography>}
          />
        </ListItemButton>
      </Box>
      <Divider sx={{ my: "0 !important" }} />
      <Box
        sx={{
          display: "flex",
          p: 1,
          justifyContent: "center",
        }}
      >
        <Button color="inherit" onClick={handleLogout} size="small">
          Logout
        </Button>
      </Box>
    </Popover>
  );
};

AccountPopover.propTypes = {
  anchorEl: PropTypes.any,
  onClose: PropTypes.func,
  open: PropTypes.bool,
};

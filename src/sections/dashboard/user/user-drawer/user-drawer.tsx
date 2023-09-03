import type { FC } from "react";
import { useCallback, useState } from "react";
import PropTypes from "prop-types";
import XIcon from "@untitled-ui/icons-react/build/esm/X";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import Stack from "@mui/material/Stack";
import SvgIcon from "@mui/material/SvgIcon";
import Typography from "@mui/material/Typography";
import useMediaQuery from "@mui/material/useMediaQuery";
import type { Theme } from "@mui/material/styles/createTheme";

import { UserDetails } from "./user-details";
import { UserEdit } from "./user-edit";
import type { User } from "src/types/user";


interface UserDrawerProps {
  container?: HTMLDivElement | null;
  open?: boolean;
  onClose: () => void;
  addUser: boolean;
  user?: User;
}

export const UserDrawer: FC<UserDrawerProps> = (props) => {
  const { container, onClose, open, user,addUser } = props;
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const lgUp = useMediaQuery((theme: Theme) => theme.breakpoints.up("lg"));

  const handleEditOpen = useCallback(() => {
    setIsEditing(true);
  }, []);

  const handleEditCancel = useCallback(() => {
    setIsEditing(false);
    onClose();
  }, []);

  let content: JSX.Element | null = null;
console.log(addUser);
  if (user) {
    content = (
      <div>
        <Stack
          alignItems="center"
          direction="row"
          justifyContent="space-between"
          sx={{
            px: 3,
            py: 2,
          }}
        >
          <Typography color="inherit" variant="h6">
            {user.name}
          </Typography>
          <IconButton color="inherit" onClick={onClose}>
            <SvgIcon>
              <XIcon />
            </SvgIcon>
          </IconButton>
        </Stack>
        <Box
          sx={{
            px: 3,
            py: 4,
          }}
        >
          {!isEditing ? (
            <UserDetails
              onApprove={onClose}
              onEdit={handleEditOpen}
              onReject={onClose}
              user={user}
            />
          ) : (
            <UserEdit
              onCancel={handleEditCancel}
              onSave={handleEditCancel}
              user={user}
            />
          )}
        </Box>
      </div>
    );
  } else {
    const emptyUser = {
      name: "",
      address: "",
      email: "",
      phone: "",
      role: "",
      status: "",
      username: "",
      id:"",
      password:"",
      createdAt: "",
      updatedAt: "",
      
    };
    content = (
      <div>
        <Stack
          alignItems="center"
          direction="row"
          justifyContent="space-between"
          sx={{
            px: 3,
            py: 2,
          }}
        >
          <Typography color="inherit" variant="h6">
            {emptyUser.name}
          </Typography>
          <IconButton color="inherit" onClick={onClose}>
            <SvgIcon>
              <XIcon />
            </SvgIcon>
          </IconButton>
        </Stack>
        <Box
          sx={{
            px: 3,
            py: 4,
          }}
        >
          <UserEdit
            onCancel={handleEditCancel}
            onSave={handleEditCancel}
            user={emptyUser}
          />
        </Box>
      </div>
    );
  }

  if (lgUp) {
    return (
      <Drawer
        anchor="right"
        open={open}
        PaperProps={{
          sx: {
            position: "relative",
            width: 500,
          },
        }}
        SlideProps={{ container }}
        variant="persistent"
      >
        {content}
      </Drawer>
    );
  }

  return (
    <Drawer
      anchor="left"
      hideBackdrop
      ModalProps={{
        container,
        sx: {
          pointerEvents: "none",
          position: "absolute",
        },
      }}
      onClose={onClose}
      open={open}
      PaperProps={{
        sx: {
          maxWidth: "100%",
          width: 420,
          pointerEvents: "auto",
          position: "absolute",
        },
      }}
      SlideProps={{ container }}
      variant="temporary"
    >
      {content}
    </Drawer>
  );
};

UserDrawer.propTypes = {
  container: PropTypes.any,
  onClose: PropTypes.func.isRequired,
  open: PropTypes.bool,
  addUser: PropTypes.bool.isRequired,
  // @ts-ignore
  user: PropTypes.object,
};

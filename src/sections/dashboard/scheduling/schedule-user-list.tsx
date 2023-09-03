import {
  ChangeEvent,
  FC,
  useCallback,
  useRef,
  useState,
  useMemo,
  useEffect,
} from "react";
import PropTypes from "prop-types";
import SearchMdIcon from "@untitled-ui/icons-react/build/esm/SearchMd";
import XIcon from "@untitled-ui/icons-react/build/esm/X";
import Box from "@mui/material/Box";

import Drawer from "@mui/material/Drawer";

import IconButton from "@mui/material/IconButton";
import InputAdornment from "@mui/material/InputAdornment";
import OutlinedInput from "@mui/material/OutlinedInput";
import Stack from "@mui/material/Stack";
import SvgIcon from "@mui/material/SvgIcon";

import Typography from "@mui/material/Typography";
import useMediaQuery from "@mui/material/useMediaQuery";
import type { Theme } from "@mui/material/styles/createTheme";
import { useDrag } from "react-dnd";

import ListItem from "@mui/material/ListItem";
import List from "@mui/material/List";
import Avatar from "@mui/material/Avatar";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import ListItemText from "@mui/material/ListItemText";
import { Scrollbar } from "src/components/scrollbar";
import { User } from "src/types/user";

interface ScheduleUserListSidebarProps {
  container?: HTMLDivElement | null;
  onClose?: () => void;
  users: User[];
}
interface DraggableUserProps {
  user: User;
}

const DraggableUser: FC<DraggableUserProps> = ({ user }) => {
  const [, ref] = useDrag({
    type: "USER",
    item: { user },
  });

  return (
    <ListItem ref={ref} key={user.id}>
      <ListItemAvatar>
        <Avatar>{user.name.charAt(0)} </Avatar>
      </ListItemAvatar>
      <ListItemText primary={user.name} />
    </ListItem>
  );
};
DraggableUser.propTypes = {
  // @ts-ignore
  user: PropTypes.object.isRequired,
};
export const ScheduleUserListSidebar: FC<ScheduleUserListSidebarProps> = (
  props
) => {
  const { container, users, onClose, ...other } = props;
  const containerRef = useRef<HTMLDivElement | null>(null);

  const handleKeyDown = (event: KeyboardEvent): void => {
    if (
      queryRef.current &&
      document.activeElement !== queryRef.current &&
      event.key.length === 1
    ) {
      queryRef.current.focus();
      setSearchQuery((prevQuery) => prevQuery + event.key);
      event.preventDefault();
    }
  };
  const queryRef = useRef<HTMLInputElement | null>(null);
  const lgUp = useMediaQuery((theme: Theme) => theme.breakpoints.up("lg"));
  const [searchQuery, setSearchQuery] = useState<string>("");
  const handleSearchChange = (event: ChangeEvent<HTMLInputElement>): void => {
    setSearchQuery(event.target.value);
  };
  const filteredUsers = useMemo(() => {
    return users.filter((user) =>
      user.name.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [users, searchQuery]);

  useEffect(() => {
    containerRef.current?.addEventListener("keydown", handleKeyDown);

    return () => {
      containerRef.current?.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  const content = (
    <div ref={containerRef}>
      <Stack
        alignItems="center"
        justifyContent="space-between"
        direction="row"
        sx={{ p: 3 }}
      >
        <Typography variant="h5">Users</Typography>
        {!lgUp && (
          <IconButton onClick={onClose}>
            <SvgIcon>
              <XIcon />
            </SvgIcon>
          </IconButton>
        )}
      </Stack>
      <Stack spacing={3} sx={{ p: 3 }}>
        <form>
          <OutlinedInput
            defaultValue=""
            fullWidth
            onChange={handleSearchChange}
            inputProps={{ ref: queryRef }}
            placeholder="Name"
            startAdornment={
              <InputAdornment position="start">
                <SvgIcon>
                  <SearchMdIcon />
                </SvgIcon>
              </InputAdornment>
            }
          />
        </form>

        <div>
          <Box
            sx={{
              backgroundColor: (theme) =>
                theme.palette.mode === "dark" ? "neutral.800" : "neutral.50",
              borderColor: "divider",
              borderRadius: 1,
              borderStyle: "solid",
              borderWidth: 1,
            }}
          >
            <Scrollbar>
              <List>
                {filteredUsers.length > 0 ? (
                  filteredUsers.map((user, index) => {
                    return <DraggableUser user={user} key={index} />;
                  })
                ) : (
                  <ListItem>
                    <ListItemText primary="No user found" />
                  </ListItem>
                )}
              </List>
            </Scrollbar>
          </Box>
        </div>
      </Stack>
    </div>
  );

  if (lgUp) {
    return (
      <Scrollbar>
        <Drawer
          anchor="left"
          open={true}
          PaperProps={{
            elevation: 16,
            sx: {
              border: "none",
              borderRadius: 2.5,
              overflow: "hidden",
              position: "relative",
              width: 380,
            },
          }}
          SlideProps={{ container }}
          variant="persistent"
          sx={{ p: 3 }}
          {...other}
        >
          {content}
        </Drawer>
      </Scrollbar>
    );
  }

  return (
    <Scrollbar>
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
        PaperProps={{
          sx: {
            maxWidth: "100%",
            width: 380,
            pointerEvents: "auto",
            position: "absolute",
          },
        }}
        SlideProps={{ container }}
        variant="temporary"
        {...other}
      >
        {content}
      </Drawer>
    </Scrollbar>
  );
};

ScheduleUserListSidebar.propTypes = {
  container: PropTypes.any,
  // @ts-ignore
  onClose: PropTypes.func,
  users: PropTypes.array.isRequired,
};

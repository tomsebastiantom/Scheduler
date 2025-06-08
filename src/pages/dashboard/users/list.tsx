import type { ChangeEvent, MouseEvent } from "react";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import PlusIcon from "@untitled-ui/icons-react/build/esm/Plus";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Divider from "@mui/material/Divider";
import Stack from "@mui/material/Stack";
import SvgIcon from "@mui/material/SvgIcon";
import Typography from "@mui/material/Typography";

import { Seo } from "src/components/seo";
import { useDialog } from "src/hooks/use-dialog";
import { useMounted } from "src/hooks/use-mounted";

import { UserDrawer } from "src/sections/dashboard/user/user-drawer/";
import { UserListContainer } from "src/sections/dashboard/user/user-list-container";

import { UserListTable } from "src/sections/dashboard/user/user-list-table";
import type { User } from "src/types/user";
import { getAllUsers } from "src/api/users.api";
import { mockGetAllUsers } from "src/api/data/test.api";

interface Filters {
  query?: string;
  status?: string;
}

type SortDir = "asc" | "desc";

interface UsersSearchState {
  page: number;
  rowsPerPage: number;
}

const useUsersSearch = (users: User[], usersCount: number) => {
  const [state, setState] = useState<UsersSearchState>({
    page: 0,
    rowsPerPage: 5,
  });

  const handlePageChange = useCallback(
    (event: MouseEvent<HTMLButtonElement> | null, page: number): void => {
      setState((prevState) => ({
        ...prevState,
        page: page,
      }));
    },
    []
  );

  const handleRowsPerPageChange = useCallback(
    (event: ChangeEvent<HTMLInputElement>): void => {
      setState((prevState) => ({
        ...prevState,
        rowsPerPage: parseInt(event.target.value, 10),
        page: 0, // Reset to first page when changing rows per page
      }));
    },
    []
  );
  const paginatedUsers = useMemo(() => {
    const start = state.page * state.rowsPerPage;
    const end = start + state.rowsPerPage;
    return users.slice(start, end);
  }, [state.page, state.rowsPerPage, users]);

  return {
    handlePageChange,
    handleRowsPerPageChange,
    usersCount,
    paginatedUsers,
    state,
  };
};

interface UsersStoreState {
  users: User[];
  usersCount: number;
  loading: boolean;
}

const useUsersStore = () => {
  const isMounted = useMounted();
  const [state, setState] = useState<UsersStoreState>({
    users: [],
    usersCount: 0,
    loading: true,
  });

  const handleUsersGet = async () => {
    try {
      setState((prev) => ({ ...prev, loading: true }));
      const response = await mockGetAllUsers();
      console.log(response);
      if (isMounted()) {
        setState({
          users: response,
          usersCount: response.length,
          loading: false,
        });
      }
    } catch (err) {
      console.error(err);
      if (isMounted()) {
        setState((prev) => ({ ...prev, loading: false }));
      }
    }
  };

  useEffect(
    () => {
      handleUsersGet();
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [isMounted]
  );

  return {
    ...state,
  };
};

const useCurrentUser = (users: User[], userId?: string): User | undefined => {
  return useMemo((): User | undefined => {
    if (!userId) {
      return undefined;
    }

    return users.find((user) => user.id === userId);
  }, [users, userId]);
};

const Page = () => {
  const rootRef = useRef<HTMLDivElement | null>(null);
  const usersStore = useUsersStore();
  const usersSearch = useUsersSearch(usersStore.users, usersStore.usersCount);
  const dialog = useDialog<string>();
  const currentUser = useCurrentUser(usersStore.users, dialog.data);
  const [addUser, setAddUser] = useState<boolean>(false);

  const handleUserOpen = useCallback(
    (userId?: string): void => {
      // console.log(dialog.open);
      if (dialog.open && (dialog.data === userId || !userId)) {
        dialog.handleClose();
        return;
      }
      if (userId) dialog.handleOpen(userId);
      else dialog.handleOpen("");
    },
    [dialog]
  );
  const handleUserAdd = useCallback((): void => {
    setAddUser(true);
    dialog.handleOpen("");
  }, [dialog]);
  return (
    <>
      <Seo title="Dashboard: Users List" />
      <Divider />
      <Box
        component="main"
        ref={rootRef}
        sx={{
          display: "flex",
          flex: "1 1 auto",
          overflow: "hidden",
          position: "relative",
        }}
      >
        <Box
          ref={rootRef}
          sx={{
            bottom: 0,
            display: "flex",
            left: 0,
            position: "absolute",
            right: 0,
            top: 0,
          }}
        >
          <UserListContainer open={dialog.open}>
            <Box sx={{ p: 3 }}>
              <Stack
                alignItems="flex-start"
                direction="row"
                justifyContent="space-between"
                spacing={4}
              >
                <div>
                  <Typography variant="h4">Users</Typography>
                </div>
                <div>
                  <Button
                    startIcon={
                      <SvgIcon>
                        <PlusIcon />
                      </SvgIcon>
                    }
                    onClick={() => handleUserAdd()}
                    variant="contained"
                  >
                    Add
                  </Button>
                </div>
              </Stack>
            </Box>
            <Divider />{" "}
            <UserListTable
              count={usersStore.usersCount}
              items={usersSearch.paginatedUsers}
              onPageChange={usersSearch.handlePageChange}
              onRowsPerPageChange={usersSearch.handleRowsPerPageChange}
              onSelect={handleUserOpen}
              page={usersSearch.state.page}
              rowsPerPage={usersSearch.state.rowsPerPage}
              loading={usersStore.loading}
            />
          </UserListContainer>
          <UserDrawer
            container={rootRef.current}
            onClose={dialog.handleClose}
            open={dialog.open}
            addUser={addUser}
            user={currentUser}
          />
        </Box>
      </Box>
    </>
  );
};

export default Page;

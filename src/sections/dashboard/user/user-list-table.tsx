import type { ChangeEvent, FC, MouseEvent } from "react";
import PropTypes from "prop-types";
import { format } from "date-fns";
import numeral from "numeral";
import Box from "@mui/material/Box";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import Typography from "@mui/material/Typography";
import Badge from "@mui/material/Badge";
import Skeleton from "@mui/material/Skeleton";
import { styled } from "@mui/material/styles";

import type { SeverityPillColor } from "src/components/severity-pill";
import { SeverityPill } from "src/components/severity-pill";

import Link from "@mui/material/Link";
import { RouterLink } from "src/components/router-link";
import { paths } from "src/paths";
import Avatar from "@mui/material/Avatar";
import { getInitials } from "src/utils/get-initials";
import { User } from "src/types/user";

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

interface UserListTableProps {
  count?: number;
  items?: User[];
  onPageChange?: (
    event: MouseEvent<HTMLButtonElement> | null,
    newPage: number
  ) => void;
  onRowsPerPageChange?: (event: ChangeEvent<HTMLInputElement>) => void;
  onSelect?: (orderId: string) => void;
  page?: number;
  rowsPerPage?: number;
  loading?: boolean;
}

export const UserListTable: FC<UserListTableProps> = (props) => {
  const {
    count = 0,
    items = [],
    onPageChange = () => {},
    onRowsPerPageChange,
    onSelect,
    page = 0,
    rowsPerPage = 0,
    loading = false,
  } = props;

  // Loading skeleton component
  const renderSkeleton = () =>
    Array.from({ length: rowsPerPage }).map((_, index) => (
      <TableRow key={index}>
        <TableCell>
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <Skeleton variant="circular" width={48} height={48} />
            <Box sx={{ ml: 3 }}>
              <Skeleton variant="text" width={120} height={20} />
              <Skeleton variant="text" width={80} height={16} />
            </Box>
          </Box>
        </TableCell>
        <TableCell align="right">
          <Skeleton
            variant="rectangular"
            width={60}
            height={24}
            sx={{ borderRadius: 1 }}
          />
        </TableCell>
      </TableRow>
    ));

  return (
    <div>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>
              <Typography variant="subtitle2" sx={{ fontWeight: 600 }}>
                User
              </Typography>
            </TableCell>
            <TableCell align="right">
              <Typography variant="subtitle2" sx={{ fontWeight: 600 }}>
                Role
              </Typography>
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {loading ? (
            renderSkeleton()
          ) : items.length > 0 ? (
            items.map((user) => (
              <TableRow
                hover
                key={user.id}
                onClick={() => onSelect?.(user.id)}
                sx={{
                  cursor: "pointer",
                  transition: "all 0.2s ease-in-out",
                  "&:hover": {
                    backgroundColor: "action.hover",
                  },
                }}
              >
                <TableCell
                  sx={{
                    alignItems: "center",
                    display: "flex",
                    py: 2,
                  }}
                >
                  <Box
                    sx={{
                      position: "relative",
                      padding: "2px",
                      borderRadius: "50%",
                      background:
                        "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                      transition: "all 0.2s ease-in-out",
                      "&:hover": {
                        transform: "scale(1.05)",
                      },
                    }}
                  >
                    <StyledBadge
                      overlap="circular"
                      anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
                      variant="dot"
                    >
                      <Avatar
                        src={user.avatar}
                        sx={{
                          height: 48,
                          width: 48,
                          fontSize: "1.1rem",
                          fontWeight: 600,
                          background:
                            "linear-gradient(135deg, #3B82F6 0%, #1D4ED8 100%)",
                          border: "2px solid white",
                          color: "white",
                        }}
                      >
                        {getInitials(user.name)}
                      </Avatar>
                    </StyledBadge>
                  </Box>
                  <Box sx={{ ml: 3 }}>
                    <Typography
                      variant="subtitle2"
                      sx={{
                        fontWeight: 600,
                        color: "text.primary",
                        mb: 0.5,
                      }}
                    >
                      {user.name}
                    </Typography>
                    <Typography
                      color="text.secondary"
                      variant="body2"
                      sx={{ fontSize: "0.875rem" }}
                    >
                      @{user.username}
                    </Typography>
                  </Box>
                </TableCell>
                <TableCell align="right">
                  <SeverityPill color={user.isAdminUser ? "success" : "info"}>
                    {user.isAdminUser ? "Admin" : "User"}
                  </SeverityPill>
                </TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={2}>
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    py: 8,
                  }}
                >
                  <Typography variant="body1" color="text.secondary">
                    No users found
                  </Typography>
                </Box>
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
      <TablePagination
        component="div"
        count={count}
        onPageChange={onPageChange}
        onRowsPerPageChange={onRowsPerPageChange}
        page={page}
        rowsPerPage={rowsPerPage}
        rowsPerPageOptions={[5, 10, 25]}
        showFirstButton
        showLastButton
        sx={{
          borderTop: 1,
          borderColor: "divider",
          px: 2,
        }}
      />
    </div>
  );
};

UserListTable.propTypes = {
  count: PropTypes.number,
  items: PropTypes.array,
  onPageChange: PropTypes.func,
  onRowsPerPageChange: PropTypes.func,
  onSelect: PropTypes.func,
  page: PropTypes.number,
  rowsPerPage: PropTypes.number,
  loading: PropTypes.bool,
};

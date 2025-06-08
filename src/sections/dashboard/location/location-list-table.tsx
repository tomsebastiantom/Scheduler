import type { ChangeEvent, FC, MouseEvent } from "react";
import PropTypes from "prop-types";
import ArrowRightIcon from "@untitled-ui/icons-react/build/esm/ArrowRight";
import Edit02Icon from "@untitled-ui/icons-react/build/esm/Edit02";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Checkbox from "@mui/material/Checkbox";
import IconButton from "@mui/material/IconButton";
import Link from "@mui/material/Link";
import Stack from "@mui/material/Stack";
import SvgIcon from "@mui/material/SvgIcon";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import Typography from "@mui/material/Typography";
import Avatar from "@mui/material/Avatar";
import Chip from "@mui/material/Chip";
import Skeleton from "@mui/material/Skeleton";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import BusinessIcon from "@mui/icons-material/Business";

import { RouterLink } from "src/components/router-link";
import { Scrollbar } from "src/components/scrollbar";
import { getInitials } from "src/utils/get-initials";

import type { Location } from "src/types/location";

interface LocationListTableProps {
  count?: number;
  items?: Location[];
  onDeselectAll?: () => void;
  onDeselectOne?: (locationId: string) => void;
  onPageChange?: (
    event: MouseEvent<HTMLButtonElement> | null,
    newPage: number
  ) => void;
  onRowsPerPageChange?: (event: ChangeEvent<HTMLInputElement>) => void;
  onSelectAll?: () => void;
  onSelectOne?: (locationId: string) => void;
  page?: number;
  rowsPerPage?: number;
  selected?: string[];
  loading?: boolean;
}

export const LocationListTable: FC<LocationListTableProps> = (props) => {
  const {
    count = 0,
    items = [],
    onDeselectAll,
    onDeselectOne,
    onPageChange = () => {},
    onRowsPerPageChange,
    onSelectAll,
    onSelectOne,
    page = 0,
    rowsPerPage = 0,
    selected = [],
    loading = false,
  } = props;
  const selectedSome = selected.length > 0 && selected.length < items.length;
  const selectedAll = items.length > 0 && selected.length === items.length;
  const enableBulkActions = selected.length > 0;

  // Loading skeleton component
  const renderSkeleton = () =>
    Array.from({ length: rowsPerPage }).map((_, index) => (
      <TableRow key={index}>
        <TableCell padding="checkbox">
          <Skeleton variant="rectangular" width={18} height={18} />
        </TableCell>
        <TableCell>
          <Stack alignItems="center" direction="row" spacing={2}>
            <Skeleton variant="circular" width={48} height={48} />
            <Box>
              <Skeleton variant="text" width={150} height={20} />
              <Skeleton
                variant="rectangular"
                width={80}
                height={20}
                sx={{ mt: 0.5, borderRadius: 1 }}
              />
            </Box>
          </Stack>
        </TableCell>
        <TableCell>
          <Skeleton variant="text" width={200} height={20} />
        </TableCell>
        <TableCell align="right">
          <Stack direction="row" spacing={1}>
            <Skeleton variant="circular" width={32} height={32} />
            <Skeleton variant="circular" width={32} height={32} />
          </Stack>
        </TableCell>
      </TableRow>
    ));

  return (
    <Box sx={{ position: "relative" }}>
      {enableBulkActions && (
        <Stack
          direction="row"
          spacing={2}
          sx={{
            alignItems: "center",
            backgroundColor: (theme) =>
              theme.palette.mode === "dark" ? "neutral.800" : "neutral.50",
            display: enableBulkActions ? "flex" : "none",
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            px: 2,
            py: 0.5,
            zIndex: 10,
          }}
        >
          <Checkbox
            checked={selectedAll}
            indeterminate={selectedSome}
            onChange={(event) => {
              if (event.target.checked) {
                onSelectAll?.();
              } else {
                onDeselectAll?.();
              }
            }}
          />
          <Button color="inherit" size="small">
            Delete
          </Button>
        </Stack>
      )}
      <Scrollbar>
        <Table sx={{ minWidth: 700 }}>
          <TableHead>
            <TableRow>
              <TableCell padding="checkbox">
                <Checkbox
                  checked={selectedAll}
                  indeterminate={selectedSome}
                  onChange={(event) => {
                    if (event.target.checked) {
                      onSelectAll?.();
                    } else {
                      onDeselectAll?.();
                    }
                  }}
                />
              </TableCell>
              <TableCell>Name</TableCell>
              <TableCell>Address</TableCell>
              <TableCell align="right">Actions</TableCell>
            </TableRow>
          </TableHead>{" "}
          <TableBody>
            {loading ? (
              renderSkeleton()
            ) : items.length === 0 ? (
              <TableRow>
                <TableCell colSpan={4}>
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      py: 8,
                    }}
                  >
                    <Typography variant="body1" color="text.secondary">
                      No locations found
                    </Typography>
                  </Box>
                </TableCell>
              </TableRow>
            ) : (
              items.map((location: Location) => {
                const isSelected = selected.includes(location.id);
                const locationAddress = `${location.address.city}, ${location.address.state}, ${location.address.postalCode}`;

                return (
                  <TableRow
                    hover
                    key={location.id}
                    selected={isSelected}
                    sx={{
                      transition: "all 0.2s ease-in-out",
                      "&:hover": {
                        backgroundColor: "action.hover",
                      },
                    }}
                  >
                    <TableCell padding="checkbox">
                      <Checkbox
                        checked={isSelected}
                        onChange={(
                          event: ChangeEvent<HTMLInputElement>
                        ): void => {
                          if (event.target.checked) {
                            onSelectOne?.(location.id);
                          } else {
                            onDeselectOne?.(location.id);
                          }
                        }}
                        value={isSelected}
                      />
                    </TableCell>{" "}
                    <TableCell>
                      <Stack alignItems="center" direction="row" spacing={2}>
                        {" "}
                        <Box
                          sx={{
                            position: "relative",
                            padding: "2px",
                            borderRadius: "50%",
                            background:
                              "linear-gradient(135deg, #22C55E 0%, #16A34A 100%)",
                            transition: "all 0.2s ease-in-out",
                            "&:hover": {
                              transform: "scale(1.05)",
                            },
                          }}
                        >
                          <Avatar
                            sx={{
                              height: 48,
                              width: 48,
                              fontSize: "1.1rem",
                              fontWeight: 600,
                              background:
                                "linear-gradient(135deg, #059669 0%, #047857 100%)",
                              border: "2px solid white",
                              color: "white",
                            }}
                          >
                            <BusinessIcon sx={{ fontSize: 24 }} />
                          </Avatar>
                        </Box>
                        <div>
                          <Link
                            color="inherit"
                            component={RouterLink}
                            // href={paths.dashboard.locations.details(location.id)}
                            variant="subtitle2"
                            sx={{
                              fontWeight: 600,
                              fontSize: "1rem",
                              textDecoration: "none",
                              "&:hover": {
                                color: "primary.main",
                              },
                            }}
                          >
                            {location.locationName}
                          </Link>
                          <Stack
                            direction="row"
                            spacing={1}
                            alignItems="center"
                            sx={{ mt: 0.5 }}
                          >
                            <Chip
                              label={location.companyName}
                              size="small"
                              variant="outlined"
                              sx={{
                                height: 24,
                                fontSize: "0.75rem",
                                fontWeight: 500,
                                backgroundColor: "rgba(59, 130, 246, 0.1)",
                                borderColor: "primary.main",
                                color: "primary.main",
                              }}
                            />
                          </Stack>
                        </div>
                      </Stack>
                    </TableCell>
                    <TableCell>
                      <Stack direction="row" spacing={1} alignItems="center">
                        <LocationOnIcon
                          sx={{
                            fontSize: 18,
                            color: "text.secondary",
                            mr: 0.5,
                          }}
                        />
                        <Typography variant="body2" color="text.primary">
                          {locationAddress}
                        </Typography>
                      </Stack>
                    </TableCell>
                    <TableCell align="right">
                      <IconButton color="primary" edge="end" size="small">
                        <SvgIcon fontSize="small">
                          <Edit02Icon />
                        </SvgIcon>
                      </IconButton>
                      <IconButton color="primary" edge="end" size="small">
                        <SvgIcon fontSize="small">
                          <ArrowRightIcon />
                        </SvgIcon>
                      </IconButton>
                    </TableCell>{" "}
                  </TableRow>
                );
              })
            )}
          </TableBody>
        </Table>
      </Scrollbar>
      <TablePagination
        component="div"
        count={count}
        onPageChange={onPageChange}
        onRowsPerPageChange={onRowsPerPageChange}
        page={page}
        rowsPerPage={rowsPerPage}
        rowsPerPageOptions={[5, 10, 25]}
      />
    </Box>
  );
};

LocationListTable.propTypes = {
  count: PropTypes.number,
  items: PropTypes.array,
  onDeselectAll: PropTypes.func,
  onDeselectOne: PropTypes.func,
  onPageChange: PropTypes.func,
  onRowsPerPageChange: PropTypes.func,
  onSelectAll: PropTypes.func,
  onSelectOne: PropTypes.func,
  page: PropTypes.number,
  rowsPerPage: PropTypes.number,
  selected: PropTypes.array,
  loading: PropTypes.bool,
};

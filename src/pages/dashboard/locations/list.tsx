import type { ChangeEvent, MouseEvent } from "react";
import { useCallback, useEffect, useMemo, useState } from "react";
import Download01Icon from "@untitled-ui/icons-react/build/esm/Download01";
import PlusIcon from "@untitled-ui/icons-react/build/esm/Plus";
import Upload01Icon from "@untitled-ui/icons-react/build/esm/Upload01";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import Container from "@mui/material/Container";
import Stack from "@mui/material/Stack";
import SvgIcon from "@mui/material/SvgIcon";
import Typography from "@mui/material/Typography";

import { Seo } from "src/components/seo";
import { useMounted } from "src/hooks/use-mounted";

import { useSelection } from "src/hooks/use-selection";

import { LocationListTable } from "src/sections/dashboard/location/location-list-table";
import type { Location } from "src/types/location";
import Link from "@mui/material/Link";
import { RouterLink } from "src/components/router-link";
import { paths } from "src/paths";
import Drawer from "@mui/material/Drawer";
import { mockGetAllLocations } from "src/api/data/test.api";
interface LocationsSearchState {
  page: number;
  rowsPerPage: number;
}

interface LocationsStoreState {
  locations: any;
  locationsCount: number;
}

const useLocationsStore = () => {
  const isMounted = useMounted();
  const [state, setState] = useState<LocationsStoreState>({
    locations: [],
    locationsCount: 0,
  });

  const fetchLocations = async () => {
    try {
      const response = await mockGetAllLocations();
      if (isMounted()) {
        setState({
          locations: response,
          locationsCount: response.length,
        });
      }
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchLocations();
  }, [isMounted]);

  return {
    ...state,
  };
};

const useLocationsSearch = (locations: Location[], locationsCount: number) => {
  const [state, setState] = useState<LocationsSearchState>({
    page: 0,
    rowsPerPage: 5,
  });

  const handlePageChange = useCallback(
    (event: MouseEvent<HTMLButtonElement> | null, page: number): void => {
      setState((prevState) => ({
        ...prevState,
        page,
      }));
    },
    []
  );

  const handleRowsPerPageChange = useCallback(
    (event: ChangeEvent<HTMLInputElement>): void => {
      setState((prevState) => ({
        ...prevState,
        rowsPerPage: parseInt(event.target.value, 10),
      }));
    },
    []
  );

  const paginatedLocations = useMemo(() => {
    const start = state.page * state.rowsPerPage;
    const end = start + state.rowsPerPage;
    return locations.slice(start, end);
  }, [state.page, state.rowsPerPage, locations]);

  return {
    handlePageChange,
    handleRowsPerPageChange,
    locationsCount,
    paginatedLocations,
    state,
  };
};

const useLocationsIds = (locations: Location[] = []) => {
  return useMemo(() => {
    return locations.map((location) => location.id);
  }, [locations]);
};

const Page = () => {
  const locationsStore = useLocationsStore();
  const locationsSearch = useLocationsSearch(locationsStore.locations, locationsStore.locationsCount);
  const locationIds = useLocationsIds(locationsSearch.paginatedLocations);
  const locationSelection = useSelection<string>(locationIds);



  return (
    <>
      <Seo title="Dashboard: Locations List" />
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          py: 8,
        }}
      >
        <Container maxWidth="xl">
          <Stack spacing={4}>
            <Stack direction="row" justifyContent="space-between" spacing={4}>
              <Stack spacing={1}>
                <Typography variant="h4">Locations</Typography>
              </Stack>
              <Stack alignItems="center" direction="row" spacing={3}>
                <Link
                  color="inherit"
                  component={RouterLink}
                  href={paths.dashboard.locations.add}
                  variant="subtitle2"
                >
                  <Button
                    startIcon={
                      <SvgIcon>
                        <PlusIcon />
                      </SvgIcon>
                    }
                    variant="contained"
                  >
                    Add
                  </Button>
                </Link>
              </Stack>
            </Stack>
            <Card>
              <LocationListTable
                count={locationsStore.locationsCount}
                items={locationsSearch.paginatedLocations}
                onDeselectAll={locationSelection.handleDeselectAll}
                onDeselectOne={locationSelection.handleDeselectOne}
                onPageChange={locationsSearch.handlePageChange}
                onRowsPerPageChange={locationsSearch.handleRowsPerPageChange}
                onSelectAll={locationSelection.handleSelectAll}
                onSelectOne={locationSelection.handleSelectOne}
                page={locationsSearch.state.page}
                rowsPerPage={locationsSearch.state.rowsPerPage}
                selected={locationSelection.selected}
              />
            </Card>
          </Stack>
        </Container>
      </Box>
    </>
  );
};

export default Page;

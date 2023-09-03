import {
  ChangeEvent,
  FC,
  FormEvent,
  useCallback,
  useRef,
  useState,
  useEffect,
} from "react";
import PropTypes from "prop-types";

import Box from "@mui/material/Box";

import useMediaQuery from "@mui/material/useMediaQuery";
import type { Theme } from "@mui/material/styles/createTheme";


import * as React from "react";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import { Location } from "src/types/location";

interface ScheduleLocationSelectorProps {
  onLocationChange?: (locationId: string) => void;
  locations: Location[];
}

export const ScheduleLocationSelector: FC<ScheduleLocationSelectorProps> = (props) => {
  const { locations, onLocationChange, ...other } = props;

  const queryRef = useRef<HTMLInputElement | null>(null);
  const lgUp = useMediaQuery((theme: Theme) => theme.breakpoints.up("lg"));
  const [locationChanged, setLocationChanged] = useState<boolean>(false);
  const [open, setOpen] = useState(false);
  const [options, setOptions] = React.useState<Location[] | []>(locations);

  useEffect(() => {
    if (!open) {
      setOptions([]);
    }
  }, [open]);

  const handleLocationChange = (
    event: React.SyntheticEvent<Element, Event>,
    value: Location | null,
    reason: any,
    details?: any | undefined
  ) => {
    if (value) {
      setLocationChanged(true);
      onLocationChange?.(value.id.toString());
    }
  };

  return (
    <Autocomplete
      id="site-selector"
      sx={{ width: 300 }}
      options={locations}
      autoHighlight
      getOptionLabel={(location) => location.locationName}
      onChange={handleLocationChange}
      renderOption={(props, location) => (
        <Box
          component="li"
          sx={{ "& > img": { mr: 2, flexShrink: 0 } }}
          {...props}
        >
          <img
            loading="lazy"
            width="20"
            //   src={`https://flagcdn.com/w20/${option.code.toLowerCase()}.png`}
            //   srcSet={`https://flagcdn.com/w40/${option.code.toLowerCase()}.png 2x`}
            alt=""
          />
          {location.locationName}
        </Box>
      )}
      renderInput={(params) => (
        <TextField
          {...params}
          label="Choose a site"
          inputProps={{
            ...params.inputProps,
            autoComplete: "new-password",
          }}
        />
      )}
    />
  );
};

ScheduleLocationSelector.propTypes = {
  // @ts-ignore
  onLocationChange: PropTypes.func,
  locations: PropTypes.array.isRequired,
};

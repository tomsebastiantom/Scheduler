import type { FC } from 'react';
import PropTypes from 'prop-types';
import { format } from 'date-fns';
import numeral from 'numeral';
import Edit02Icon from '@untitled-ui/icons-react/build/esm/Edit02';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import SvgIcon from '@mui/material/SvgIcon';
import Typography from '@mui/material/Typography';
import useMediaQuery from '@mui/material/useMediaQuery';
import type { Theme } from '@mui/material/styles/createTheme';

import { PropertyList } from 'src/components/property-list';
import { PropertyListItem } from 'src/components/property-list-item';
import type { SeverityPillColor } from 'src/components/severity-pill';
import { SeverityPill } from 'src/components/severity-pill';
import { Scrollbar } from 'src/components/scrollbar';
import type { User } from 'src/types/user';


interface UserDetailsProps {
  onApprove?: () => void;
  onEdit?: () => void;
  onReject?: () => void;
  user: User;
}



export const UserDetails: FC<UserDetailsProps> = (props) => {
  const { 
    // onApprove, 
    onEdit, 
    // onReject,
     user } = props;
     console.log(user);
  const lgUp = useMediaQuery((theme: Theme) => theme.breakpoints.up('lg'));

  const align = lgUp ? 'horizontal' : 'vertical';


  return (
    <Stack spacing={6}>
      <Stack spacing={3}>
        <Stack
          alignItems="center"
          direction="row"
          justifyContent="space-between"
          spacing={3}
        >
          <Typography variant="h6">
            User Details
          </Typography>
          <Button
            color="inherit"
            onClick={onEdit}
            size="small"
            startIcon={(
              <SvgIcon>
                <Edit02Icon />
              </SvgIcon>
            )}
          >
            Edit
          </Button>
        </Stack>
        <PropertyList>
          <PropertyListItem
            align={align}
            disableGutters
            divider
            label="Name"
            value={user.name}
          />
             <PropertyListItem
            align={align}
            disableGutters
            divider
            label="Username"
            value={user.username}
          />
          <PropertyListItem
            align={align}
            disableGutters
            divider
            label="Email"
            value={user.email}
          />
          <PropertyListItem
            align={align}
            disableGutters
            divider
            label="Phone"
          >
            <Typography
              color="text.secondary"
              variant="body2"
            >
              {user.phone}
            </Typography>
  
         
            
          </PropertyListItem>
          <PropertyListItem
            align={align}
            disableGutters
            divider
            label="Address"
          >
            <Typography
              color="text.secondary"
              variant="body2"
            >
              {/* {user.address.city} */}
            </Typography>
  
            <Typography
              color="text.secondary"
              variant="body2"
            >
              {user.address.state},{user.address.country}
            </Typography>
            <Typography
              color="text.secondary"
              variant="body2"
            >
              {user.address.postalCode}
            </Typography>
          </PropertyListItem>
          <PropertyListItem
            align={align}
            disableGutters
            divider
            label="Creation Date"
            value={new Date(user.createdAt).toLocaleString('en-US', {weekday: 'short', year: 'numeric', month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: false})}
          />
        
          <PropertyListItem
            align={align}
            disableGutters
            divider
            label=""
          >
            <SeverityPill 
           color={'primary'}
            >
              {user.isAdminUser ? 'Admin' : 'User'}
            </SeverityPill>
          </PropertyListItem>
        </PropertyList>
       
      </Stack>
     
    </Stack>
  );
};

UserDetails.propTypes = {
  onApprove: PropTypes.func,
  onEdit: PropTypes.func,
  onReject: PropTypes.func,
  // @ts-ignore
  user: PropTypes.object
};

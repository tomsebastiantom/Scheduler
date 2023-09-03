import type { FC } from 'react';
import PropTypes from 'prop-types';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardHeader from '@mui/material/CardHeader';

import { PropertyList } from 'src/components/property-list';
import { PropertyListItem } from 'src/components/property-list-item';

interface SiteBasicDetailsProps {
  siteName: string;
  address: string;
  companyName: string;
  createdAt: string;
  updatedAt: string;
  contacts: string;
  instructions: string;
}



// export interface ContactDTO {
//   contactName: string;
//   contactPhone?: string;
//   contactEmail: string;
//   contactRole: string;
// }
// export interface InstructionDTO {
//   instructionType: string;
//   instructionDescription: string;
//   instructionCreationTimestamp: string;
// }

// export interface AddressDTO {
//   city: string;
//   state: string;
//   country?: string;
//   postalCode: string;
// }


export const SiteBasicDetails: FC<SiteBasicDetailsProps> = (props) => {
  const { siteName, address, companyName,  createdAt, updatedAt, contacts, instructions, ...other } = props;

  return (
    <Card {...other}>
      <CardHeader title="Site Details" />
      <PropertyList>
        <PropertyListItem
          divider
          label="Site Name"
          value={siteName}
        />
        <PropertyListItem
          divider
          label="Company Name"
          value={companyName}
        />
        <PropertyListItem
          divider
          label="Address"
          value={address}
        />
        <PropertyListItem
          divider
          label="Created At"
          value={createdAt}
        />
        <PropertyListItem
          divider
          label="Updated At"
          value={updatedAt}
        />
        <PropertyListItem
          divider
          label="Contacts"
          value={contacts}
        />
      </PropertyList>
      <CardActions>
        {/* <Button
          color="inherit"
          size="small"
        >
          Reset Password
        </Button> */}
      </CardActions>
    </Card>
  );
};

SiteBasicDetails.propTypes = {
  instructions: PropTypes.string.isRequired,
  siteName: PropTypes.string.isRequired,
  companyName: PropTypes.string.isRequired,
  address: PropTypes.string.isRequired,
  createdAt: PropTypes.string.isRequired,
  updatedAt: PropTypes.string.isRequired,
  contacts: PropTypes.string.isRequired
};

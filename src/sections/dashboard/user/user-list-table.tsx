import type { ChangeEvent, FC, MouseEvent } from 'react';
import PropTypes from 'prop-types';
import { format } from 'date-fns';
import numeral from 'numeral';
import Box from '@mui/material/Box';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import Typography from '@mui/material/Typography';

import type { SeverityPillColor } from 'src/components/severity-pill';
import { SeverityPill } from 'src/components/severity-pill';

import Link from "@mui/material/Link";
import { RouterLink } from 'src/components/router-link';
import { paths } from 'src/paths';
import Avatar from '@mui/material/Avatar';
import { getInitials } from 'src/utils/get-initials';
import {User} from 'src/types/user';




interface UserListTableProps {
  count?: number;
  items?: User[];
  onPageChange?: (event: MouseEvent<HTMLButtonElement> | null, newPage: number) => void;
  onRowsPerPageChange?: (event: ChangeEvent<HTMLInputElement>) => void;
  onSelect?: (orderId: string) => void;
  page?: number;
  rowsPerPage?: number;
}

export const UserListTable: FC<UserListTableProps> = (props) => {
  const {
    count = 0,
    items = [],
    onPageChange = () => {},
    onRowsPerPageChange,
    onSelect,
    page = 0,
    rowsPerPage = 0
  } = props;

  return (
    <div>
      <Table>
        <TableBody>
          {items.map((user) => {
       
            return (
              <TableRow
                hover
                key={user.id}
                onClick={() => onSelect?.(user.id)}
                sx={{ cursor: 'pointer' }}
              >
                <TableCell
                  sx={{
                    alignItems: 'center',
                    display: 'flex'
                  }}
                >
                  <Box
                    sx={{
                      backgroundColor: (theme) => theme.palette.mode === 'dark'
                        ? 'neutral.800'
                        : 'neutral.200',
                      borderRadius: 100,
                      maxWidth: 'fit-content',
                      ml: 1,
                      p: 1
                    }}
                  >
              
                      
                      <Avatar
                    src={"site.companyName"}
                  
                  >
                    {getInitials(user.name)}
                  </Avatar>
                      

                   



                  </Box>
                  <Box sx={{ ml: 2 }}>
                    <Typography variant="subtitle2">
                      {user.name}
                    </Typography>
                    <Typography
                      color="text.secondary"
                      variant="body2"
                    >
                     
                      {user.username}
                    </Typography>
                  </Box>
                </TableCell>
                <TableCell align="right">
                  <SeverityPill color='primary'>
                  {user.isAdminUser ? 'Admin' : 'User'}
                  </SeverityPill>
                </TableCell>
              </TableRow>
            );
          })}
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
  rowsPerPage: PropTypes.number
};

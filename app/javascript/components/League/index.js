// app/javascript/components/Library/index.js
import React, { useState } from 'react';
import { useQuery } from 'react-apollo';
import gql from 'graphql-tag';
import CreateLeague from '../AddLeague';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Input from '@material-ui/core/Input';
import Button from '@material-ui/core/Button';

const LeagueQuery = gql`
    query League($lon: String!, $lat: String!, $radius: Int!, $budget: Int!) {
      withinRange(
        lon: $lon,
        lat: $lat,
        radius: $radius,
        budget: $budget
      ) {
        id
        name
        lonlat
        price
      }
    }
`;

let initialVars = {
  lat: '0',
  lon: '0',
  radius: 100000000,
  budget: 100000000,
}

const Leagues = () => {
  const [sort, setSort] = useState(initialVars);
  const { loading, error, data, sortLeague } = useQuery(LeagueQuery, {
    variables: sort
  });
  return (
    <TableContainer
      style={{ margin: 'auto', width: '60%', paddingTop: '15px' }}
      component={Paper}
    >
      <SortLeague 
        buttonText="Sort Leagues"
        loading={loading}
        sortLeague={({ lat, lon, radius, budget }) => setSort({ lat, lon, radius, budget })}
      />
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell>League</TableCell>
            <TableCell align="right">Location</TableCell>
            <TableCell align="right">Price</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {loading ? (
            <TableRow key="empty">
              <TableCell component="th" scope="row">
                There are currently no leagues available.
              </TableCell>
            </TableRow>
          ) : (
            data.withinRange.map(({ id, name, lonlat, price }) => (
              <TableRow key={id}>
                <TableCell component="th" scope="row">
                  {name}
                </TableCell>
                <TableCell align="right">
                  {lonlat.match(/\([^\)]+\)/g)[0].replace(' ', ', ')}
                </TableCell>
                <TableCell align="right">${price}</TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
      <CreateLeague />
    </TableContainer>
  )
}

export default Leagues;

function SortLeague({
  initialLat = '',
  initialLon = '',
  initialRadius = '',
  initialBudget = '',
  sortLeague,
  buttonText,
  loading,
}) {
  const [lon, setLon] = useState(initialLon);
  const [lat, setLat] = useState(initialLat);
  const [radius, setRadius] = useState(initialRadius);
  const [budget, setBudget] = useState(initialBudget);

  return (
    <div style={{ margin: '20px 0 15px 50px' }}>
      <Input
        type="text"
        style={{ margin: '5px' }}
        placeholder="Longitude"
        value={lon}
        onChange={(e) => setLon(e.currentTarget.value)}
      />
      <Input
        type="text"
        style={{ margin: '5px' }}
        placeholder="Latitude"
        value={lat}
        onChange={(e) => setLat(e.currentTarget.value)}
      />
      <Input
        type="number"
        style={{ margin: '5px' }}
        placeholder="radius"
        value={radius}
        onChange={(e) => setRadius(Number(e.currentTarget.value))}
      />
      <Input
        id="budget"
        type="number"
        style={{ margin: '5px' }}
        placeholder="budget"
        value={budget}
        onChange={(e) => setBudget(Number(e.currentTarget.value))}
      />
      {!loading && (
        <Button
          variant="outlined"
          color="primary"
          onClick={() => sortLeague({ lon, lat, radius, budget })}
        >
          {buttonText}
        </Button>
      )}
    </div>
  );
};

import React, { useState } from 'react';
import Input from '@material-ui/core/Input';
import Button from '@material-ui/core/Button';
import gql from 'graphql-tag';
import { Mutation } from 'react-apollo';

const AddLeagueMutation = gql`
  mutation($name: String!, $lonlat: String!, $price: Int!) {
    createLeague(name: $name, lonlat: $lonlat, price: $price) {
      id
      name
      lonlat
      price
    }
  }
`;

const CreateLeague = () => (
  <Mutation mutation={AddLeagueMutation}>
    {(addLeague, { loading }) => (
      <AddLeague
        buttonText="Add League"
        loading={loading}
        onProcessForm={({ name, lonlat, price }) =>
          addLeague({
            variables: {
              name,
              lonlat,
              price,
            },
          })
        }
      />
    )}
  </Mutation>
);

export default CreateLeague;

const AddLeague = ({
  initialName = '',
  initialLat = '',
  initialLon = '',
  initialPrice = '',
  onProcessForm,
  buttonText,
  loading,
}) => {
  const [name, setName] = useState(initialName);
  const [lat, setLat] = useState(initialLat);
  const [lon, setLon] = useState(initialLon);
  const [price, setPrice] = useState(initialPrice);
  return (
    <div style={{ margin: '20px 0 15px 50px' }}>
      <Input
        type="text"
        style={{ margin: '5px' }}
        placeholder="League Name"
        value={name}
        onChange={(e) => setName(e.currentTarget.value)}
      />
      <Input
        type="text"
        style={{ margin: '5px' }}
        placeholder="Latitude"
        value={lat}
        onChange={(e) => setLat(e.currentTarget.value)}
      />
      <Input
        type="text"
        style={{ margin: '5px' }}
        placeholder="Longitude"
        value={lon}
        onChange={(e) => setLon(e.currentTarget.value)}
      />
      <Input
        type="number"
        style={{ margin: '5px' }}
        placeholder="price"
        value={price}
        onChange={(e) => setPrice(e.currentTarget.value)}
      />
      {!loading && (
        <Button
          variant="outlined"
          color="primary"
          onClick={() =>
            onProcessForm({
              name,
              lonlat: `POINT (${lat} ${lon})`,
              price: Number(price),
            })
          }
        >
          {buttonText}
        </Button>
      )}
    </div>
  );
};

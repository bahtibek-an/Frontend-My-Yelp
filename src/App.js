import { withAuthenticator } from "@aws-amplify/ui-react";
import { API } from 'aws-amplify';
import { useEffect, useState } from 'react';
import './App.css';
import { createRestaurant, deleteRestaurant } from './graphql/mutations';
import { listRestaurants } from './graphql/queries';

const initialFormState = { name: '', description: '', location: '' }

function App({ signOut,user }) {
  const [Restaurants, setRestaurants] = useState([]);
  const [formData, setFormData] = useState(initialFormState);

  useEffect(() => {
    fetchRestaurants();
  }, []);

  async function fetchRestaurants() {
    const apiData = await API.graphql({ query: listRestaurants });
    setRestaurants(apiData.data.listRestaurants.items);
  }

  async function CreateRestaurant() {
    if (!formData.name || !formData.description) return;
    await API.graphql({ query: createRestaurant, variables: { input: formData } });
    setRestaurants([ ...Restaurants, formData ]);
    setFormData(initialFormState);
  }

  async function DeleteRestaurant({ id }) {
    const newRestaurantsArray = Restaurants.filter(Restaurant => Restaurant.id !== id);
    setRestaurants(newRestaurantsArray);
    await API.graphql({ query: deleteRestaurant, variables: { input: { id } }});
  }

  return (
    <div className="App text-bg-secondary text-info">
      <div className="row">
        <h1 className="text-primary col-9">My Restaurants App</h1>
        <div>
          <button onClick={signOut} className="btn btn-warning text-light col-3">Sign Out</button>
        </div>
      </div>
      <h3>{user.userName}</h3>

      <table className="table table-primary table-striped table-striped-white text-success">
        <thead>
          <tr>
            <th scope="col">Name</th>
            <th scope="col">Description</th>
            <th scope="col">Location</th>
            <th scope="col">#</th>
          </tr>
        </thead>
        <tbody>
          {
            Restaurants.map(Restaurant => (
              <tr key={Restaurant.id || Restaurant.name}>
                <th scope="col">{Restaurant.name}</th>
                <td>{Restaurant.description}</td>
                <td>{Restaurant.location}</td>
                <td><button className="btn btn-danger" onClick={() => DeleteRestaurant(Restaurant)}>Delete</button></td>
              </tr>
            ))
          }
        </tbody>
      </table>

      <div className="container text-center">
        <div className="row">
          <div className="col input-group flex-nowrap">
            <span className="input-group-text" id="addon-wrapping">#</span>
            <input
              type="text" 
              className="form-control" 
              aria-label="Username" 
              aria-describedby="addon-wrapping" 
              onChange={e => setFormData({ ...formData, 'name': e.target.value})}
              placeholder="Restaurant name"
              value={formData.name}
            />
          </div>
          <div className="col input-group flex-nowrap">
            <span className="input-group-text" id="addon-wrapping">@</span>
            <input
              type="text" 
              className="form-control" 
              aria-label="Username" 
              aria-describedby="addon-wrapping" 
              onChange={e => setFormData({ ...formData, 'description': e.target.value})}
              placeholder="Restaurant description"
              value={formData.description}
            />
          </div>
          <div className="col input-group flex-nowrap">
            <span className="input-group-text" id="addon-wrapping">$</span>
            <input
              type="text" 
              className="form-control" 
              aria-label="Username" 
              aria-describedby="addon-wrapping" 
              onChange={e => setFormData({ ...formData, 'location': e.target.value})}
              placeholder="Restaurant location"
              value={formData.location}
            />
          </div>
        </div>
      </div>
      <button onClick={CreateRestaurant} className="btn btn-info text-light m-3">Create Restaurant</button>

    </div>
  );
}

export default withAuthenticator(App);
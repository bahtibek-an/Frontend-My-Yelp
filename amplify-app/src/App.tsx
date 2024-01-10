import {Amplify, API, graphqlOperation } from 'aws-amplify';
import { Authenticator } from '@aws-amplify/ui-react';
import React, { useEffect, useReducer } from 'react';
import { Button, Col, Container, Form, Row, Table, Nav, Navbar } from 'react-bootstrap';

import "@aws-amplify/ui-react/styles.css"

import './App.css';
import awsConfig from './aws-exports';
import { createRestaurant } from './graphql/mutations';
import { listRestaurants } from './graphql/queries';
import { onCreateRestaurant } from './graphql/subscriptions';

Amplify.configure(awsConfig);

type Restaurant = {
  name: string;
  description: string;
  city: string;
};

type AppState = {
  restaurants: Restaurant[];
  formData: Restaurant;
};

type Action =
  | {
      type: 'QUERY';
      payload: Restaurant[];
    }
  | {
      type: 'SUBSCRIPTION';
      payload: Restaurant;
    }
  | {
      type: 'SET_FORM_DATA';
      payload: { [field: string]: string };
    };

type SubscriptionEvent<D> = {
  value: {
    data: D;
  };
};

const initialState: AppState = {
  restaurants: [],
  formData: {
    name: '',
    city: '',
    description: '',
  },
};
const reducer = (state: AppState, action: Action) => {
  switch (action.type) {
    case 'QUERY':
      return { ...state, restaurants: action.payload };
    case 'SUBSCRIPTION':
      return { ...state, restaurants: [...state.restaurants, action.payload] };
    case 'SET_FORM_DATA':
      return { ...state, formData: { ...state.formData, ...action.payload } };
    default:
      return state;
  }
};

const App: React.FC = () => {
  const createNewRestaurant = async (e: React.SyntheticEvent) => {
    e.stopPropagation();
    const { name, description, city } = state.formData;
    const restaurant = {
      name,
      description,
      city,
    };
    await API.graphql(graphqlOperation(createRestaurant, { input: restaurant }));
  };

  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    getRestaurantList();

    type Unsubscribe = {
      unsubscribe: () => void
    }

    type Subscriber = {
      subscribe: (observer: object) => Unsubscribe
    };

    const subscription = (API.graphql(graphqlOperation(onCreateRestaurant)) as Subscriber).subscribe({
      next: (eventData: SubscriptionEvent<{ onCreateRestaurant: Restaurant }>) => {
        const payload = eventData.value.data.onCreateRestaurant;
        dispatch({ type: 'SUBSCRIPTION', payload });
      },
    });
    

    return () => subscription.unsubscribe();
  }, []);

  type Items = {
    items: Restaurant[]
  }

  type ListRestaurants = {
    listRestaurants: Items
  }

  const getRestaurantList = async () => {
    const restaurants = (await API.graphql(graphqlOperation(listRestaurants))) as { data: ListRestaurants; errors: any[] };
    dispatch({
      type: 'QUERY',
      payload: restaurants.data.listRestaurants.items
    });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    dispatch({
      type: 'SET_FORM_DATA',
      payload: { [e.target.name]: e.target.value },
    });

  return (
    <Authenticator>
      {({ signOut, user }) => (
        <div className="App">
          <Navbar bg="dark" variant="dark">
              <Container>
                  <Navbar.Brand>My Yelp</Navbar.Brand>
                  <Nav>
                      <Button onClick={signOut}>Sign Out</Button>
                  </Nav>
              </Container>
          </Navbar>
          <Container style={{marginTop: "20px"}}>
            <Row>
              <Col md={4}>
                <Form>
                  <Form.Group controlId="formDataName" >
                    <Form.Control style={{width: "70%"}} onChange={handleChange} type="text" name="name" placeholder="Name" />
                  </Form.Group>
                  <Form.Group controlId="formDataDescription" className="mt-3">
                    <Form.Control style={{width: "70%", marginTop: "20px"}} onChange={handleChange} type="text" name="description" placeholder="Description" />
                  </Form.Group>
                  <Form.Group controlId="formDataCity" className="mt-3">
                    <Form.Control style={{width: "70%", marginTop: "20px"}} onChange={handleChange} type="text" name="city" placeholder="City" />
                  </Form.Group>
                  <div className="mt-3">
                    <Button onClick={createNewRestaurant} variant="primary" style={{marginTop: "20px"}}>
                        Add New Restaurant
                    </Button>
                  </div>
                </Form>
              </Col>
            </Row>

            {state.restaurants.length ? (
              <Row className="my-3">
                <Col>
                  <Table striped bordered hover>
                    <thead>
                      <tr>
                        <th>#</th>
                        <th>Name</th>
                        <th>Description</th>
                        <th>City</th>
                      </tr>
                    </thead>
                    <tbody>
                      {state.restaurants.map((restaurant, index) => (
                        <tr key={`restaurant-${index}`}>
                          <td>{index + 1}</td>
                          <td>{restaurant.name}</td>
                          <td>{restaurant.description}</td>
                          <td>{restaurant.city}</td>
                        </tr>
                      ))}
                    </tbody>
                  </Table>
                </Col>
              </Row>
            ) : null}
          </Container>
        </div>
      )}
    </Authenticator>
  );
};

export default (App);

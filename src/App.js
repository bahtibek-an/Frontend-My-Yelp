
import {Amplify} from 'aws-amplify';
import { generateClient } from 'aws-amplify/api'
import { withAuthenticator } from '@aws-amplify/ui-react';
import { Button, Col, Container, Form, Row, Table } from 'react-bootstrap';
import { Authenticator } from '@aws-amplify/ui-react';
import '@aws-amplify/ui-react/styles.css';
import awsExports from './aws-exports';
import { createTodo } from './graphql/mutations';
import { listTodos } from './graphql/queries';
import { useState, useEffect } from 'react';
Amplify.configure(awsExports);


function App() {

  const [city, setCity] = useState("")
  const [description, setDescription] = useState("")
  const [name, setName] = useState("")
  const [data, setData] = useState()

  const client = generateClient();
  
  useEffect(()=>{
    getRestaurants()
  }, [])



  const getRestaurants = async() => {
    const result = await client.graphql({ query: listTodos });
    setData(result.data.listTodos.items);
  }

  const handlesubmit = async(e) => {
    e.preventDefault()
    
    try{
      await client.graphql({
        query: createTodo,
        variables: {
          input: {
            name: name,
            description: description,
            city: city
          }
        }
      });
    }catch(e){
      console.log(e)
    }  
    getRestaurants()
  }


  console.log(data && data)


  return (
    <Authenticator>
      {({ signOut, user }) => (
        <main>
          <h1>Hello {user.username}</h1>

          <button onClick={signOut}>Sign out</button>

          <br/>
          <br/>

          <Container>
        <Row className="mt-3">
          <Col md={4}>
            <Form>
              <Form.Group controlId="formDataName">
                <Form.Control onChange={(e)=>setName(e.target.value)} type="text" name="name" placeholder="Name" />
              </Form.Group>
              <Form.Group controlId="formDataDescription">
                <Form.Control onChange={(e)=>setDescription(e.target.value)} type="text" name="description" placeholder="Description" />
              </Form.Group>
              <Form.Group controlId="formDataCity">
                <Form.Control onChange={(e)=>setCity(e.target.value)} type="text" name="city" placeholder="City" />
              </Form.Group>
              <Button onClick={handlesubmit} className="float-left">
                Add New Restaurant
              </Button>
            </Form>
          </Col>
        </Row>

        {data && data.length !== 0 ? 
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
                  {data.map((restaurant, index) => (
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
         : null}
        </Container>

          
        </main>
      )}
    </Authenticator>
  );
}


export default withAuthenticator(App)

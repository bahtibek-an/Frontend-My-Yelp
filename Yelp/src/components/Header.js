import Navbar from 'react-bootstrap/Navbar';
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';
import "../styles/header.css";

export default function YelpNavbar({signOut}){
    return (
        <Navbar collapseOnSelect expand="lg" bg="info" variant="dark">
            <Container >
            <Navbar.Brand bg="col-sm-1" fixed="bottom">Restaurant</Navbar.Brand>
            <Navbar.Toggle />
            <Navbar.Collapse className="justify-content-end">
                <Navbar.Text>
                <Button className="signout" onClick={signOut}>Sign out</Button>
                </Navbar.Text>
            </Navbar.Collapse>
            </Container>
        </Navbar>
    )
}
import React,{useContext, useEffect, useState} from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import CardDeck from 'react-bootstrap/CardDeck';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import axios from 'axios';
import './Home.css';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import { useHistory } from 'react-router-dom';


function Home() {
    const history = useHistory();
    const [data, setData] = useState([])
    const [mod, setmod] = useState(false);
    const [localId, setlocalId] = useState('');
    const myId = localStorage.getItem("myUserId");
    const token = localStorage.getItem("user");
    useEffect(() => {
        axios.get(`http://localhost:5000/api/v1/users/${myId}`)
        .then(res => {
            console.log(res.data)
            setData(res.data)
        })
        .catch(err => {
            console.log(err);
        })
    }, [mydelete])
    console.log('userid',myId)

    function mymodal(id){
        setmod(true);
        setlocalId(id);
    }

    function mydelete(id) {   
        console.log('clicked', id);
        axios.delete(`http://localhost:5000/api/v1/users/${id}`)
        .then(res => {
            console.log(res)
            setmod(false)
        })
        .catch(err => {
            console.log(err);
        })
    }

    function myLogout(){
        localStorage.removeItem("user");
        localStorage.removeItem("myUserId");
        history.push("/");
    }
    

    return (
        <Container fluid>
           <Row>
               <Col></Col>
               <Col md='auto'><h2>Bizz2Credit-App</h2></Col>
        
               <Col><Col  md={{ span: 3, offset: 3 }}><Button onClick={() => myLogout()}
                variant="light">Logout</Button></Col></Col>
           </Row>
           <Row style={{marginTop:'40px'}}>
               <Col></Col>
               <Col >
               <Form>
               <Form.Group >
                    <Form.Control type="text" className="text-center" placeholder="List of Users" readOnly/>
                </Form.Group>
                </Form>
               </Col>
               <Col><Button onClick={() => history.push('/newuser')} variant="primary">Create New User</Button></Col>
           </Row>

           <Row style={{marginTop:'50px'}}>
            <Col></Col>
            <Col md='auto'>
            {mod === true ? 
            <div>
                 <Modal.Dialog>
            <Modal.Header >
                <Modal.Title>Confirmation!</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <p>Confirm delete?</p>
            </Modal.Body>
            <Modal.Footer>
                <Button onClick={() => setmod(false)} variant="secondary">No</Button>
                <Button onClick={() => mydelete(localId)} variant="primary">Yes</Button>
            </Modal.Footer>
            </Modal.Dialog>
            </div>
            :
            <div class="grid-container">    
        {
            data.map(res => {
                return (
            <div class="grid-item">
            <Card style={{ width: '18rem' }}>
                <Card.Body>
                    <Card.Title>Name</Card.Title>
                    <Card.Subtitle className="mb-2 text-muted">{res.name}</Card.Subtitle>
                    <Card.Title>Email</Card.Title>
                    <Card.Subtitle className="mb-2 text-muted">{res.email}</Card.Subtitle>
                    <Card.Title>Phone Number</Card.Title>
                    <Card.Subtitle className="mb-2 text-muted">{res.phone_number}</Card.Subtitle>
                    {/* <Card.Text>
                    Some quick example text to build on the card title and make up the bulk of
                    the card's content.
                    </Card.Text> */}
                   <Button onClick={() => history.push({
                       pathname: '/myedit',
                       state: res._id
                   })} variant="primary">Edit</Button>{' '}
                   <Button onClick={() => mymodal(res._id)} variant="danger">Delete</Button> 
                </Card.Body>
            </Card>
            </div>
                )
            })
        }        
    </div>
            
            }
            </Col>
            <Col></Col>
           </Row>
        </Container>
    )
}

export default Home

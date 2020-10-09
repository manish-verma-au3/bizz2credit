import React from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import {Link} from "react-router-dom";
import {useForm} from 'react-hook-form';
import axios from 'axios';
import { useHistory } from 'react-router-dom';


function MyEdit(props) {
    const history = useHistory();
    const {register, handleSubmit, errors} = useForm(); 
    console.log("pro",props.location.state);

    const onSubmit = (data) => {
        console.log(data);
            axios.put(`http://localhost:5000/api/v1/users/${props.location.state}`, data)
            .then(res => {
                console.log(res)
                alert(res.data);
                history.push('/home')
            })
            .catch(err => {
                console.log(err);
            })
    }
    return (
        <Container fluid>
           <Row>
               <Col></Col>
               <Col md='auto'><h3>Edit-Form</h3></Col>
               <Col></Col>
           </Row>
           <hr/>
           <Row style={{marginTop:'70px'}}>
               <Col></Col>
               <Col>
               <Form  onSubmit={handleSubmit(onSubmit)}>
               <Form.Group controlId="formBasicEmail">
                    <Form.Label>Name</Form.Label>
                    <Form.Control type="text" name='name' placeholder="Enter name" 
                     ref={register({required:true})} />
                </Form.Group>
                {errors.name && <h6 style={{color:'red'}}>please enter name!</h6>}
                <Form.Group controlId="formBasicEmail">
                    <Form.Label>Email address</Form.Label>
                    <Form.Control type="email" name='email' placeholder="Enter email" 
                    ref={register({required:true})}/>
                    <Form.Text className="text-muted">
                    We'll never share your email with anyone else.
                    </Form.Text>
                </Form.Group>
                {errors.email && <h6 style={{color:'red'}}>please enter Email!</h6>}
                <Form.Group controlId="formBasicEmail">
                    <Form.Label>Phone Number</Form.Label>
                    <Form.Control type="text" name='phone_number' placeholder="Enter mobile number" 
                     ref={register({required:true, minLength:10, maxLength:10})}/>
                </Form.Group>
                {errors.phone_number && <h6 style={{color:'red'}}>please enter valid 10 digit number!</h6>}
                <Button variant="primary" type="submit">
                    Update
                </Button>
                </Form>
               </Col>
               <Col></Col>
           </Row>
       </Container>
    )
}

export default MyEdit

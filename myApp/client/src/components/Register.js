import React,{useState} from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import {Link} from "react-router-dom";
import {useForm} from 'react-hook-form';
import axios from 'axios';
import Spinner from 'react-bootstrap/Spinner';
import { useHistory } from 'react-router-dom';

function Register() {
    const history = useHistory();
    const {register, handleSubmit, errors} = useForm(); 
    const [myLoading, setmyLoading] = useState(false);

    const onSubmit = (data) => {
        setmyLoading(true);
        console.log(data);
            axios.post("http://localhost:5000/register", data)
            .then(res => {
                console.log(res)
                setmyLoading(false);
                alert(res.data);
                history.push('/')
            })
            .catch(err => {
                console.log(err);
            })
    }

    return (
        <Container fluid>
           <Row>
               <Col></Col>
               <Col md='auto'><h2>Signup</h2></Col>
               <Col></Col>
           </Row>
           <Row style={{marginTop:'70px'}}>
               <Col></Col>
               <Col>
              {myLoading ?
               <div>
               <Row style={{marginTop:'50px'}}>
                   <Col xs={5}></Col>
                   <Col xs={2}>
                   <Spinner animation="border" role="status">
                         <span className="sr-only">Loading...</span>
                    </Spinner>
                   </Col>
                   <Col xs={5}></Col>
               </Row>   
         </div> 
                :
                <div>
                 <Form  onSubmit={handleSubmit(onSubmit)}>
               <Form.Group controlId="formBasicEmail">
                    <Form.Label>Name</Form.Label>
                    <Form.Control type="text" name='name' placeholder="Enter name" 
                     ref={register({required:true, minLength:3, maxLength:20})} />
                </Form.Group>
                {errors.name && <h6 style={{color:'red'}}>Name is min 3 characters & max 20</h6>}
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
                <Form.Group controlId="formBasicPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control type="password" name='password' placeholder="Password" 
                     ref={register({required:true, minLength:8, maxLength:20})}/>
                </Form.Group>
                {errors.password && <h6 style={{color:'red'}}>password is min 8 characters & max 20</h6>}
                <Button variant="primary" type="submit">
                    Register
                </Button>
                &nbsp;&nbsp;
                <Link to="/">
                    <Button variant="primary">
                        back to login
                    </Button>
                </Link>
                </Form>
                </div>}
               </Col>
               <Col></Col>
           </Row>
       </Container>
    )
}

export default Register

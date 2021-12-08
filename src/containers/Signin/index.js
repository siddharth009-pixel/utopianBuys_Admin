import React,{useEffect, useState} from "react";
import { Container, Form, Button, Row, Col } from "react-bootstrap";
import Layout from "../../components/Layout";
import { useDispatch, useSelector } from "react-redux";
import { isUserLoggedIn, login } from "../../actions/auth.action";
import { Redirect } from "react-router";
import { Link } from "react-router-dom";
import Header from "../../components/Header";
import { Input } from "../../UI/Input";


export default function Signin() {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error,setError]=useState('')  
  const auth=useSelector(state=>state.auth)

  const dispatch = useDispatch();

  if(auth.authenticate){
    // return afterLoggedIn()
    return  <Redirect to='/' />
  }
 
  const userLogin = (e) => {
    console.log('signup container')
    e.preventDefault();

    const user = {
      email,
      password
    };

    dispatch(login(user));
  };


return(
    <div>
      <Layout>
        <Container>
          <Row style={{ marginTop: "50px" }}>
            <Col md={{ span: 6, offset: 3 }}>
              <form>
                <Input type="email"                    
                    placeholder="Enter email"
                    value={email}
                    onChange={(e)=>{setEmail(e.target.value)}}>
                </Input>
                <Input type="password"                    
                    placeholder="Enter password"
                    value={password}
                    onChange={(e)=>{setPassword(e.target.value)}}>
                </Input>
                <button type="submit" className="btn btn-primary" onClick={userLogin}>
                  Submit
                </button>
              </form>
            </Col>
          </Row>
        </Container>
      </Layout>
    </div>
  );
}

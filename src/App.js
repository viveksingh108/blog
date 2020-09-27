import React from 'react';
import Blog from "./components/blog";
import Post from "./components/Post";
import 'bootstrap/dist/css/bootstrap.min.css';
import { Col, Container, Row } from "react-bootstrap";
import { BrowserRouter as Router } from "react-router-dom";
import PostDetails from "./components/PostDetails";
import { Route, Switch, NavLink } from 'react-router-dom';


function App() {
    return (
        <div className="App" >
            <Router>
                <Container fluid>
                    <Row className="justify-content-md-center">
                        <Col>
                    
                             <Switch>
                                <Route exact path="/posts/:id" component={Post} />
                                <Route exact path="/post/:pid" component={PostDetails} />
                                <Route exact path="/" component={Blog} />
                            </Switch>
                        </Col> 
                    </Row>
                </Container>
            </Router> 
            
        </div>
    );
}

export default App;

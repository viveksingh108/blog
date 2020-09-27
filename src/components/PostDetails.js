import React, {Component} from 'react'
import axios from 'axios';
import {Col, Container, Row, Button, Alert, Toast} from "react-bootstrap";
import Comments from './comments';
import { Redirect } from 'react-router-dom';


export default class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            users: [],
            redirect: false
        }
        this.deletePost = this.deletePost.bind(this);
    }

    componentDidMount() {
        console.log(this.props.location.state);
        axios.get(`https://jsonplaceholder.typicode.com/posts/${this.props.match.params.pid}`)
            .then(res => {
                const users = res.data;
                this.setState({ users,redirect:false });
            })
        
    }

    deletePost(){
        axios.delete(`https://jsonplaceholder.typicode.com/posts/${this.props.match.params.pid}`)
        .then(res => {
            this.setState(state => ({
                redirect: !state.redirect
              }));
        })
    }
    
    render() {
        const { users,redirect } = this.state;
        console.log(users.title);
        if (redirect) return <Redirect 
        to={{
            pathname : '/posts/'+ this.props.location.state.userId,
        }}/>
       

        return(
            <Container>
            
                    <Row>
                        <Col>
                            <h2> Post Details </h2>
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <h5> {users.title} </h5>
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                           <p>{users.body}</p>
                        </Col>
                    </Row>
                    <Row>
                        <Col><Comments/></Col>
                        <Col> <Button onClick={this.deletePost}>Delete</Button></Col>
                    </Row>
            </Container>

        )
    
        
    }

}
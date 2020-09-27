import React, {Component} from 'react';
import axios from 'axios';
import {Col, Container, Row, ListGroupItem,Button,ListGroup} from "react-bootstrap";

class Comments extends Component {
    constructor(props) {
        super(props);
        this.state = {
            users: [],
            clicked : false
        }
        this.handleClick = this.handleClick.bind(this);
    }

    componentDidMount() {
        axios.get(`https://jsonplaceholder.typicode.com/comments?postId=1`)
            .then(res => {
                const users = res.data;
                this.setState({ users  });
            })
        
    }

    handleClick() {
        this.setState(state => ({
          clicked: !state.clicked
        }));
      }

    renderList = () => {
        console.log(this.state.users);
        return this.state.users.map(user => {
            return (
                <ListGroupItem key={user.id}>
                    <p> name  : {user.name}</p>
                    <p> email :{user.email}</p>
                    <p>comment: {user.body}</p>
                </ListGroupItem>
            )
        })
    }

    render() {
        if(this.state.clicked){
            return (
                <Container className="my-auto">
                    <Row >
                        <Col>
                        <Button onClick={this.handleClick}>show comments</Button>
                       <ListGroup>
                       {this.renderList()}
                     </ListGroup>
                        </Col>
                    </Row>
               </Container>
                )
        }
        else{
            return( 
                <Container>
                <Row>
                    <Col>
                    <Button onClick={this.handleClick}>show comments</Button>
                    </Col>
                </Row>
           </Container>
            )
        }
        }
}

export default Comments;
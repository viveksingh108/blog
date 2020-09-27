import React, { Component } from 'react';
import { Link, Route, Switch } from "react-router-dom";
import Post from './Post';
import { BrowserRouter as Router } from "react-router-dom";
import { Table } from 'react-bootstrap';

class Blog extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            users: [],
            isLoading: false,
            isError: false
        }
    };

    async componentDidMount() {
        this.setState({ isLoading: true })
        const response = await fetch('https://jsonplaceholder.typicode.com/users')
        if (response.ok) {
            const users = await response.json()
            this.setState({ users, isLoading: false })
        } else {
            this.setState({ isError: true, isLoading: false })
        }
    }

    renderTableRows = () => {
        return this.state.users.map(user => {
            return (
                <tr key={user.id}>
                    <td>{user.name}</td>
                    <td>{user.company.name}</td>
                    <td>
                    <Link to={'/posts/' + user.id}>post</Link>
                    </td>
                </tr>
            )
        })
    }

    render() {
        const { users, isLoading, isError } = this.state;
        const tstyle = {
            marginTop : "20%",
            width : "50%",
            margin :"0 auto"
          };


        if (isLoading) {
            return <div>Loading...</div>
        }

        if (isError) {
            return <div>Error</div>
        }

        return(
                <Table striped bordered hover style={tstyle}>
                    <thead>
                    <tr>
                        <th className="flex"> Name::: </th>
                        <th className="flex"> Company </th>
                        <th className="flex"> Posts </th>
                    </tr>
                    </thead>
                    <tbody>
                    {this.renderTableRows()}
                    </tbody>
                </Table>

            )

    }

}

export default Blog;
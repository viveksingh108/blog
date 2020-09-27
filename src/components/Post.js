import React, {Component} from 'react'
import axios from 'axios'
import ReactPaginate from 'react-paginate';
import '../App.css'
import { Link, Route, Switch } from "react-router-dom";
import { ListGroup, ListGroupItem } from 'react-bootstrap';

export default class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            offset: 0,
            data: [],
            perPage: 5,
            currentPage: 0
        };
        this.handlePageClick = this.handlePageClick.bind(this);
    }
    receivedData() {
        axios
            .get(`https://jsonplaceholder.typicode.com/posts?userId=${this.props.match.params.id}`)
            .then(res => {

                const data = res.data;
                const slice = data.slice(this.state.offset, this.state.offset + this.state.perPage)
                const postData = slice.map(pd => <React.Fragment>
                  <ListGroupItem key={pd.id}>
                  <Link to={{
                   pathname: '/post/' + pd.id,
                      state: { userId: this.props.match.params.id }
                              }}>{pd.title}</Link>
                  </ListGroupItem>
                </React.Fragment>)

                this.setState({
                    pageCount: Math.ceil(data.length / this.state.perPage),
                    postData
                })
            });
    }
    handlePageClick = (e) => {
        const selectedPage = e.selected;
        const offset = selectedPage * this.state.perPage;

        this.setState({
            currentPage: selectedPage,
            offset: offset
        }, () => {
            this.receivedData()
        });

    };

        componentDidMount() {
            this.receivedData()
        }
    
    render() {
        return (
            <div>
                <ListGroup>
                {this.state.postData}
                </ListGroup>
            
                <ReactPaginate
                    previousLabel={"prev"}
                    nextLabel={"next"}
                    breakLabel={"..."}
                    breakClassName={"break-me"}
                    pageCount={this.state.pageCount}
                    marginPagesDisplayed={2}
                    pageRangeDisplayed={5}
                    onPageChange={this.handlePageClick}
                    containerClassName={"pagination"}
                    subContainerClassName={"pages pagination"}
                    activeClassName={"active"}/>
            </div>

        )
    }
}
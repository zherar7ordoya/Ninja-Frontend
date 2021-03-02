import "./styles.css";

import React, { Component } from "react";
import { graphql, compose } from "react-apollo";
import { 
  getAuthorsQuery, 
  addBookMutation,
  getBooksQuery
 } from "../queries/queries";

class AddBook extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      genre: "",
      authorId: "",
    };
  }
  displayAuthors() {
    var data = this.props.getAuthorsQuery;

    if (data.loading) {
      return <option disabled>Loading authors</option>;
    } else {
      return data.authors.map((author) => {
        return (
          <option key={author.id} value={author.id}>
            {author.name}
          </option>
        );
      });
    }
  }
  submitForm(e) {
    e.preventDefault();
    this.props.addBookMutation({
      variables: {
        name: this.state.name,
        genre: this.state.genre,
        authorId: this.state.authorId
      },
      refetchQueries: [{
        query: getBooksQuery
      }]
    })
  }
  render() {
    return (
      <form id="add-book" onSubmit={this.submitForm.bind(this)}>
        <hr />
        <div className="field">
          <label>
            <span>Book name:</span>
            <input
              type="text"
              onChange={(e) => this.setState({ name: e.target.value })}
            />
          </label>
        </div>
        <div className="field">
          <label>
            <span>Genre:</span>
            <input
              type="text"
              onChange={(e) => this.setState({ genre: e.target.value })}
            />
          </label>
        </div>
        <div className="field">
          <label>
            <span>Author:</span>
            <select
              onChange={(e) => this.setState({ authorId: e.target.value })}
            >
              <option>Select author</option>
              {this.displayAuthors()}
            </select>
          </label>
        </div>

        <label>
          <span>
            <button>+</button>
          </span>
        </label>
      </form>
    );
  }
}

export default compose(
  graphql(getAuthorsQuery, {name: "getAuthorsQuery"}),
  graphql(addBookMutation, {name: "addBookMutation"})
)(AddBook);




import React, { Component } from 'react';
import BookDetails from './BookDetails' 
class GBookForm extends Component {
  constructor(props){
    super(props)
    this.state = {
      title : '',
      author : '',
      ISBN : '',
      category : ''
    }
    this.handleChange = (evt) => {
      this.setState({
        [evt.target.name] : evt.target.value
      })
    }
  }
  render() {
    return (
      <div>
        <form>
            <label htmlFor="title">Title</label>
            <input type="text" id="title" name="title" onChange={this.handleChange} />
            <label htmlFor="author">Author</label>
            <input type="text" id="author" name="author" onChange={this.handleChange} />
            <label htmlFor="ISBN">ISBN</label>
            <input type="text" id="ISBN" name="ISBN" onChange={this.handleChange} /> 
            <label htmlFor="category">Category</label>
            <input type="text" id="category" name="category" onChange={this.handleChange} />
            <input type="button" value="add" onClick={
              () => this.props.onAdd({
                title : this.state.title,
                author : this.state.author,
                ISBN : this.state.ISBN,
                category : this.state.category
              })
            }/>
        </form>
      </div>
    )
  }
}

export default GBookForm

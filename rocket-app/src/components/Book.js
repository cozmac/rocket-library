import React, { Component } from 'react';
import GBookList from './GBookList'

class Book extends Component {
  constructor(props){
    super(props)
    this.state = {
      isEditing : false,
      title : this.props.item.title,
      author : this.props.item.author,
      ISBN : this.props.item.ISBN,
      category : this.props.item.category
    }
    this.handleChange = (evt) => {
      this.setState({
        [evt.target.name] : evt.target.value
      })
    }
  }
  render() {
    let {item} = this.props
    if (this.state.isEditing){
      return (
        <div>
          The title is:  
          <input type="text" id="title" name="title" onChange={this.handleChange} value={this.state.title} />
          , author is:
          <input type="text" id="author" name="author" onChange={this.handleChange} value={this.state.autor} />
          . The ISBN is: 
           <input type="text" id="ISBN" name="ISBN" onChange={this.handleChange} value={this.state.ISBN} />
          and the category is: 
          <input type="text" id="category" name="category" onChange={this.handleChange} value={this.state.category} />
          <input type="button" value="cancel" onClick={() => this.setState({isEditing : false})} />
          <input type="button" value="save" onClick={() => {
              this.props.onSave(item.id, {
                title : this.state.title,
                author : this.state.author,
                ISBN : this.state.ISBN,
                category : this.state.category
              })
              this.setState({isEditing : false})
            }
          } />
        </div>
      )
    }
    else{
      return (
        <div>
          Title is: {item.title} and author: {item.author}. ISBN is: {item.ISBN} and the category is: {item.category}.
          <input class="addList" type="button" value="delete" onClick={() => this.props.onDelete(item.id)} />
          <input class="addList" type="button" value="edit" onClick={() => this.setState({isEditing : true})} />
          <input class="addList" type="button" value="show users" onClick={() => this.props.onSelect(item.id)} />
        </div>
      )
    }
  }
}

export default Book
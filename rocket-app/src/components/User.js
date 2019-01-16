import React, { Component } from 'react';
import GBookList from './GBookList'

class User extends Component {
  constructor(props){
    super(props)
    this.state = {
      isEditing : false,
      name : this.props.item.name,
      email : this.props.item.email
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
          Email: 
          <input type="text" id="email" name="email" onChange={this.handleChange} value={this.state.email} /> 
          Name: 
          <input type="text" id="name" name="name" onChange={this.handleChange} value={this.state.name} />
          <input type="button" value="cancel" onClick={() => this.setState({isEditing : false})} />
          <input type="button" value="save" onClick={() => {
              this.props.onSave(item.id, {
                name : this.state.name,
                email : this.state.email
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
          Email: {item.email} Name: {item.name}
          <input type="button" value="delete" onClick={() => this.props.onDelete(item.id)} />
          <input type="button" value="edit" onClick={() => this.setState({isEditing : true})} />
        </div>
      )
    }
  }
}


export default User
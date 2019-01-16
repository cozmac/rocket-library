import React, { Component } from 'react';

class UserForm extends Component {
  constructor(props){
    super(props)
    this.state = {
      name : '',
      email : ''
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
            <label htmlFor="name">Name</label>
            <input type="text" id="name" name="name" onChange={this.handleChange} />
            <label htmlFor="email">Email</label>
            <input type="text" id="email" name="email" onChange={this.handleChange} />
            <input type="button" value="add" onClick={
              () => this.props.onAdd({
                name : this.state.name,
                email : this.state.email
              })
            }/>
        </form>
      </div>
    )
  }
}

export default UserForm
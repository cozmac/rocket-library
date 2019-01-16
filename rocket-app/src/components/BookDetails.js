import React, { Component } from 'react';
import UserStore from '../stores/UserStore'
import User from './User'
import UserForm from './UserForm'


class BookDetails extends Component {
 constructor(props){
    super(props)
    this.state = {
      users : []
    }
    this.store = new UserStore()
    this.add = (user) => {
      this.store.addOne(this.props.item.id, user)
    }
    this.save = (id, user) => {
      this.store.saveOne(this.props.item.id, id, user)
    }
    this.delete = (id) => {
      this.store.deleteOne(this.props.item.id, id)
    }
  }
    componentDidMount(){
    this.store.getAll(this.props.item.id)
    this.store.emitter.addListener('GET_ALL_SUCCESS', () => {
      this.setState({
        users : this.store.content
      })
    })
  }
  render() {
     return (
      <div>
        <div>
          Here are the users of the book {this.props.item.title}, author: {this.props.item.author}
        </div>
        <div>
          {this.state.users.map((e, i) => <User item={e} key={i} onSave={this.save} onDelete={this.delete} />)}
        </div>
        <div>
          <UserForm onAdd={this.add} />
        </div>
      </div>
    )
  }
}

export default BookDetails
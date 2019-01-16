import React, { Component } from 'react';
import GBookStore from '../stores/GBookStore'
import Book from './Book'
import GBookForm from './GBookForm'
import BookDetails from './BookDetails'

class GBookList extends Component {
  constructor(){
    super()
    this.state = {
      gbooks : [],
      showUsersFor : -1,
      selectedBook: null
    }
    this.store = new GBookStore()
    this.add = (gBook) => {
      this.store.addOne(gBook)
    }
    this.delete = (id) => {
      this.store.deleteOne(id)
    }
    this.save = (id, gBook) => {
      this.store.saveOne(id, gBook)
    }
    this.select = (id) => {
      let selected = this.state.gbooks.find((e) => e.id === id)
      this.setState({
       showUsersFor : id,
      selectedBook : selected
      })
    }
  }
  componentDidMount(){
    this.store.getAll()
    this.store.emitter.addListener('GET_ALL_SUCCESS', () => {
      this.setState({
        gbooks : this.store.content
      })
    })
  }
  render() {
    if (this.state.showUsersFor === -1){
      return (
        <div>
          {this.state.gbooks.map((e, i) => 
            <Book item={e} key={i} onDelete={this.delete} onSave={this.save} onSelect={this.select} />
          )}
          <GBookForm onAdd={this.add} />
        </div>
      )
    }
    else{
      return (
       <BookDetails item={this.state.selectedBook} />  
      )
   }
  
}
}

export default GBookList

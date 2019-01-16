import React, { Component } from 'react';
import GBookList from './GBookList'
import BooksApi from './BooksApi'
import First from './First.css'

class App extends Component {
  render() {
    return (
      <div>
         <BooksApi />
         
         <GBookList />
      </div>
    )
  }
}

export default App
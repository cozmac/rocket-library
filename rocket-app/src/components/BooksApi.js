import React, { Component } from 'react';
import Book from './Book'

class BooksApi extends Component {
    
    componentDidMount(){
        window.onload = async() => {
            let bUrl = "https://www.googleapis.com/books/v1/volumes?q=";
            
        let getConfig = function(value) {
            fetch(bUrl)
            .then((result) => {
                return result.json();
            })
            .then((data) => {
                runsearch(value)
            })
            .catch(function(err) {
                alert(err);
            });
        }
        
        let runsearch = function(keyword)
        {
            let url = ''.concat(bUrl, keyword);
            fetch(url)
                 .then(result => result.json())
                 .then((data) => {
                     let stringToReturn = "";
                     for(let i = 0; i<data.items.length;i++)
                     {
                        stringToReturn += JSON.stringify(i+1 + ". Title: " + data.items[i].volumeInfo.title
                        + ", authors: " + data.items[i].volumeInfo.authors + ", ISBN:  " + data.items[i].id + ", category: " +
                        data.items[i].volumeInfo.categories) + "<button class='addList' align='right'>Add it to your list</button>" + "<br>";
                        
                        //var bk = new Book(data.items[i].volumeInfo.title, data.items[i].volumeInfo.authors, data.items[i].id, data.items[i].volumeInfo.categories);
                        //console.log(bk.state.author);
                     }
                     stringToReturn +="<br>"
                    document.getElementById('content').innerHTML = stringToReturn;
                 })
        }
        
        let sendButton = document.getElementById('search-button')
        let input = document.getElementById('keywords')
        sendButton.addEventListener("click", function() {
            getConfig(input.value)
        });
    }
    }
    
    render(){
        return (
            <div>
            <h1 align="center">Rocket Library</h1>
            <div class = "search-wrapper">
            <input id="keywords" class="da"></input>
            <button id="search-button" class="btn btn-primary">Search</button>
            </div>
            
            <div id="content"></div>
            <h2>-------------------------------------------</h2>
            </div>
            );
    }

          
}

export default BooksApi;

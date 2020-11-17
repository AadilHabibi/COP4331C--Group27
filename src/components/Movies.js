import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, Link, Switch } from "react-router-dom";
import axios from 'axios'

import Search from './Search'
import Results from './Results'
import Popup from './Popup'
import './Movies.css';

const apiurl = "http://www.omdbapi.com/?i=tt3896198&apikey=d97766ae";

class Movies extends React.Component {

   constructor(props) {
      super(props);
      this.state = {
         s: "",
         results: [],
         selected: {}
      };
   }



   search = (e) => {
      if (e.key === "Enter") {
         axios(apiurl + "&s=" + this.state.s).then(({ data }) => {
            let results = data.Search;
            this.setState(prevState => {
               return { ...prevState, results: results }
            })
         });
      }
   }

   handleInput = (e) => {
      let s = e.target.value;
      this.setState(prevState => {
         return { ...prevState, s: s }
      });
   }

   openPopup = id => {
      axios(apiurl + "&i=" + id).then(({ data }) => {
         let result = data;
         this.setState(prevState => {
            return { ...prevState, selected: result }
         });
      });
   }

   closePopup = () => {
      this.setState(prevState => {
         return { ...prevState, selected: {} }
      });
   }

   render() {
      let { results, selected } = this.state;
      return (
         <div className="App">
            <button
               style={{ float: "right", padding: '10px', margin: '10px' }}
               onClick={this.props.logout}>Logout</button>
            <Link to='/profile' style={{ float: "right" }}>
               <button
                  className="signupbutton"
                  style={{ padding: '10px', margin: '10px' }}>
                  Profile
                  </button>
            </Link>
            <header className="App-header">
               <h1>Flickpick</h1>
            </header>
            <main>
               <Search handleInput={this.handleInput} search={this.search} />
               <Results results={results} openPopup={this.openPopup} />
               {(typeof selected.Title != "undefined") ? <Popup selected={selected} closePopup=
                  {this.closePopup} /> : false}
            </main>
         </div>
      )
   }
}
export default Movies;
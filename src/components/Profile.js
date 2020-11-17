import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, Link, Switch } from "react-router-dom";

class Profile extends React.Component {
   render() {
      return (
         <div className="App">
            <button
               style={{ float: "right", padding: '10px', margin: '10px' }}
               onClick={this.props.logout}>Logout</button>
            <header className="App-header">
               <h1>Profile</h1>
            </header>

            <main>
               <div style={{ width: '100%', height: 'auto', padding: '1%' , display:'inline', marginTop:'100px',  }}>
                  <div>
                     <img
                        style={{ borderRadius: "50%", height: '200px', width: '200px', float:'left', }}
                        src="https://support.hubstaff.com/wp-content/uploads/2019/08/good-pic.png"
                        alt="new"
                     />
                  </div>
                  <div style={{ paddingLeft: '300px', paddingTop: '60px' }}>
                     <h1>Admin User</h1>
                  </div>
               </div>
            </main>
         </div>
      )
   }
}
export default Profile;
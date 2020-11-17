import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, Link, Switch } from "react-router-dom";

class Signup extends React.Component {

   constructor(props) {
      super(props);
      this.state = {
         email:'',
         password:''
      };
   }

   emailChange = e => { this.setState({ email: e.target.value });};
   passwordChange = e => { this.setState({ password: e.target.value });};
   handleSignup = () => {
       let email = this.state.email;
       let password = this.state.password;
        // Make an API call over here and once it's success set local storage
        console.log(email,password);
        this.props.loginUpdate();
   }

   render() {
      let {email, password} = this.state;
      return (
         <div className="Homepage">
            <h1 className="Homepage-logo">Join with Flickpick</h1>
            <div className="Homepage-Login">
               <main>
                  <div>
                     <section className="emailbox-wrap">
                        <input
                           type="text"
                           placeholder="Enter Email Address"
                           className="searchbox"
                           value={email}
                           onChange={this.emailChange}
                        />
                     </section>
                  </div>
                  <div>
                     <section className="emailbox-wrap">
                        <input
                           type="text"
                           placeholder="Enter Password"
                           className="searchbox"
                           value={password}
                           onChange={this.passwordChange}
                        />
                     </section>
                  </div>
                  <div>
                     <section className="buttons">
                           <button
                              onClick={() => {this.handleSignup()}}
                              className="signupbutton"
                              style={{ padding: '10px', margin: '10px' }}>
                              Signup
                           </button>
                        <Link to='/login'>
                           <button
                              className="loginbutton"
                              style={{ padding: '10px', margin: '10px' }}
                           >
                              You have Account Already ? Click Here to Login
                         </button>
                        </Link>
                     </section>
                  </div>
               </main>
            </div>
         </div>
      )
   }
}
export default Signup;
import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, Link, Switch } from "react-router-dom";

class Login extends React.Component {

   constructor(props) {
      super(props);
      this.state = {
         email:'',
         password:''
      };
   }

   emailChange = e => { this.setState({ email: e.target.value });};
   passwordChange = e => { this.setState({ password: e.target.value });};
   handleLogin = () => {
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
         <h1 className="Homepage-logo">Welcome to Flickpick</h1>
         <div className="Homepage-Login">
             <main>
                 <div>
                     <section className="emailbox-wrap">
                         <input
                             type="text"
                             value={email}
                             onChange={this.emailChange}
                             placeholder="Enter Email Address"
                             className="searchbox"
                         />
                     </section>
                 </div>
                 <div>
                     <section className="emailbox-wrap">
                         <input
                             type="text"
                             value={password}
                             onChange={this.passwordChange}
                             placeholder="Enter Password"
                             className="searchbox"
                         />
                     </section>
                 </div>
                 <div>
                     <section className="buttons">
                         <button 
                         className="loginbutton"
                         style={{padding:'10px', margin: '10px'}}
                         onClick={() => {this.handleLogin()}}>
                             Login
                         </button>
                     
                     
                         <Link to='/signup'>
                             <button 
                             className="signupbutton"
                             style={{padding:'10px', margin: '10px'}}>
                                 You don't have Account ? Click Here to Signup
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
 export default Login;
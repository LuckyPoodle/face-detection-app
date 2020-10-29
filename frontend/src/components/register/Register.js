import React from 'react';


class Register extends React.Component {

  constructor(props){
    super();
    this.state={
      Email:'',
      Password:'',
      Name:''
    }
  }

  onNameChange=(event)=>{
    this.setState({Name:event.target.value})
  }

  onEmailChange=(event)=>{
    this.setState({Email:event.target.value})
  }

  onPasswordChange=(event)=>{
    this.setState({Password:event.target.value})
  }

  onSubmitSignIn=()=>{
    fetch('http://localhost:3000/register',{
      method:'post',
      headers:{'Content-Type':'application/json'},
      body:JSON.stringify({
        email:this.state.Email,
        password:this.state.Password, //ASK IF THE PROCESS OF SENDING PASSWORD OVER IS MADE SAFE BY HTTPS
        name:this.state.Name
      })
    })
    .then(response=>response.json())
    .then(user=>{
      if (user.id){

        this.props.loadUser(user)
        this.props.onRouteChange('home');
      }
    })
  }



  render(){
    

    return (
      <article className="br3 ba  mv4 w-100 w-50-m w-25-l mw6 shadow-5 center">
        <main className="pa4 white-80">
        <div className="measure">
          <fieldset id="sign_up" class="ba white ph0 mh0">
            <legend className="f1 fw6 ph0 mh0">Sign Up</legend>
            <div className="mt3">
              <label className="db fw6 lh-copy f6" htmlFor="name">Name</label>
              <input className="pa2 input-reset ba bg-transparent hover-bg-black white w-100"
              onChange={this.onNameChange}
               type="text" name="name"  id="name"/>
            </div>
            <div className="mt3">
              <label className="db fw6 lh-copy f6" htmlFor="email-address">Email</label>
              <input className="pa2 input-reset ba bg-transparent hover-bg-black white w-100" 
              onChange={this.onEmailChange}
              type="email" name="email-address"  id="email-address"/>
            </div>
            <div className="mv3">
              <label className="db fw6 lh-copy f6" htmlFor="password">Password</label>
              <input className="pa2 input-reset ba bg-transparent hover-bg-black white w-100" 
              onChange={this.onPasswordChange}
              type="password" name="password"  id="password"/>
            </div>
           
          </fieldset>
          <div className="">
            <input className="b ph3 pv2 input-reset ba white bg-black grow pointer f6 dib" 
            type="submit" value="Register" onClick={this.onSubmitSignIn} />
          </div>
    
        </div>
      </main>
      </article>
    );

  }
    
}

export default Register;
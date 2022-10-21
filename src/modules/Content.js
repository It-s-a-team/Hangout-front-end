import React from "react";
import '../css/Content.css';
// importing withAuth0, because this is a Class-based component
import { withAuth0 } from "@auth0/auth0-react";

class Content extends React.Component
{
  render()
  {
    return (
      <>
        <div className="content">
          <h1>User Profile</h1>
          <img
            src={ this.props.auth0.user.picture } referrerPolicy="no-referrer"
            alt={ this.props.auth0.user.picture }
          >
          </img>
          <h2>{ this.props.auth0.user.name }</h2>
          <p>{ this.props.auth0.user.email }</p>
        </div>
      </>
    )
  }
}

export default withAuth0(Content);

import React from "react";
// importing `useAuth0`, because this is a functional component
import { useAuth0 } from "@auth0/auth0-react";
import Button from "react-bootstrap/Button";

const LogoutButton = () =>
{
  const { logout } = useAuth0();

  return (
    <Button
      style={ { width: "100px", margin: "auto" } }
      onClick={ () => logout({ returnTo: window.location.origin }) }
      variant="outline-info"
    >
      Log Out
    </Button>
  );
};

export default LogoutButton;

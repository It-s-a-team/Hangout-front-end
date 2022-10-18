import React from "react";
import { withAuth0 } from "@auth0/auth0-react";
import Hangout from "./Hangout";

class Main extends React.Component
{
  render()
  {
    return(
      <>
        <h1>hello world</h1>
        <Hangout />
      </>
    )
  }
}
export default withAuth0(Main);

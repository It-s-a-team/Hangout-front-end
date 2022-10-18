import React from "react";
import { withAuth0 } from "@auth0/auth0-react";

class Main extends React.Component
{
  render()
  {
    return(
      <>
        <h1>hello world</h1>
      </>
    )
  }
}
export default withAuth0(Main);

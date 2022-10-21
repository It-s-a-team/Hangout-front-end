import React from "react";
import '../css/index.css';




class Footer extends React.Component
{
  render()
  {

    return (
      

      <div className ='text-center p-3 text-white' style={{ backgroundColor: 'rgba(0, 0, 0, 0.2)' }}>
        © 2022 Copyright:
        <p className ='text-white'> Hangout Team </p>
      </div>
    
  );
}
}
export default Footer;

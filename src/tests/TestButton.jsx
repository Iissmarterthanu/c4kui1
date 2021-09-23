import { Button } from '@material-ui/core';
import React from 'react';

function TestButton(props) {
  console.log("test props", props);

  const myNames = ["aaa","bbb","ccc"];
  const myVals = [1,2,3];

  const handleClick = (event, name) => {
    console.log(event, name, myVals);
  }


  return (
    <div>
      button test
      {myNames.map( (name) => (
        <Button onClick={(event)=>handleClick(event, name)} key={name}>{name}</Button>
      ))}
    </div>
  );
}

export default TestButton;
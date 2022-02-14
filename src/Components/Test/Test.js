import React, { useState } from 'react';

import { Button } from '../Button/Button';

export const Test = () => {
  const [state, setState] = useState(0);

  const onPlay = () => {
    setState((prevState) => prevState + 1);
  };
  return (
    <div>
      <h1>Hello World</h1>
      <Button id={'1'} key={'1'} power onClick={onPlay} />
      <Button id={'2'} key={'2'} onClick={onPlay} />
      <div>{state}</div>
    </div>
  );
};

export default Test;

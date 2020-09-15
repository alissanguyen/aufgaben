import * as React from 'react';

const ToggleAllButton = (props) => {
  return (
    <button className={"button" + " ml-3"}
      onClick={props.onToggleAll}>Toggle All</button>
  )
}

export default ToggleAllButton
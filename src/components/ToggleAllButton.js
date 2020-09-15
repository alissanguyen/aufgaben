import * as React from 'react';

const ToggleAllButton = (props) => {
  return (
    <button className="button"
      onClick={props.onToggleAll}>Toggle All</button>
  )
}

export default ToggleAllButton
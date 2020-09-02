import * as React from 'react';
import { BUTTON_CLASSNAME} from '../constants';

const ToggleAllButton = (props) => {
  return (
    <button className={BUTTON_CLASSNAME + " ml-3"}
      onClick={props.onToggleAll}>Toggle All</button>
  )
}

export default ToggleAllButton
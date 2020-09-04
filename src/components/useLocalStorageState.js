import * as React from 'react';

const useLocalStorageState = (key, initialValue) => {

  const existentValueInLocalStorage = window.localStorage.getItem(key) && JSON.parse(window.localStorage.getItem(key))

  const [state, setState] = React.useState(existentValueInLocalStorage === undefined || existentValueInLocalStorage === null ? initialValue : existentValueInLocalStorage)


  React.useEffect(() => {
    window.localStorage.setItem(key, JSON.stringify(state))

  }, [key, state])

  return [state, setState]
}

export default useLocalStorageState
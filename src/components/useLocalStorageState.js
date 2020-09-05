import * as React from 'react';

const useLocalStorageState = (key, initialValue, validationFn) => {

  const existentValueInLocalStorage = window.localStorage.getItem(key) && JSON.parse(window.localStorage.getItem(key))

  const validatedValueInLocalStorage = existentValueInLocalStorage ? validationFn(existentValueInLocalStorage) : null

  const [state, setState] = React.useState(validatedValueInLocalStorage === undefined || validatedValueInLocalStorage === null ? initialValue : existentValueInLocalStorage)


  React.useEffect(() => {
    window.localStorage.setItem(key, JSON.stringify(state))
  }, [key, state])

  return [state, setState]
}

export default useLocalStorageState
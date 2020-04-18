import React, { useReducer, useState, useEffect } from 'react';
import appReducer, { appInit, appSetError } from './reducers/appReducer';
import AppContext from './context/AppContext';
import AppRouter from './routers/AppRouter';
import { Client as Styletron } from 'styletron-engine-atomic';
import { Provider as StyletronProvider } from 'styletron-react';
import { LightTheme, BaseProvider } from 'baseui';
import { initApp } from './backend/api';
import authReducer from './reducers/authReducer';

function App() {

  const [app, appDis] = useReducer(appReducer, {
    isReady: false,
    error: ""
  });

  const [auth, authDis] = useReducer(authReducer, {
    currentUser: null,
    isLoggedIn: false,
    error: ""
  });

  useEffect(() => {
    appDis(appSetError(auth.error))
  }, [auth.error]);

  const setError = (error = "") => appDis(appSetError(error));

  const [engine, ] = useState(new Styletron());

  useEffect(() => {
    initApp()
    .then(({ success }) => {
      console.log("app initialized");
      appDis(appInit(success));
    })
    .catch(error => {
      console.error(error);
    })
  }, [])

  return (
    <AppContext.Provider value={{ app, appDis, auth, authDis, appErr: app.error, setError }}>
      <StyletronProvider value={engine}>
        <BaseProvider theme={LightTheme}>
          <AppRouter />
        </BaseProvider>
      </StyletronProvider>
    </AppContext.Provider>
  );
}

export default App;

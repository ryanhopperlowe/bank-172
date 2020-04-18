import React, { useContext, useState } from 'react';
import { Container, MaskedPinInput } from '../../common/StyleClasses';
import { useHistory } from 'react-router-dom';
import AppContext from '../../context/AppContext';
import { Card, StyledBody } from 'baseui/card';
import { FormControl } from 'baseui/form-control';
import { Input } from 'baseui/input';
import { Button } from 'baseui/button';
import { userLogin } from '../../backend/api';
import { authLogin } from '../../reducers/authReducer';
import ErrorBox from '../../common/ErrorBox';

const LoginPage = () => {
  const { setError, appErr, authDis } = useContext(AppContext);
  const history = useHistory();
  const [pin, setPin] = useState(["", "", "", ""]);
  const [username, setUsername] = useState('');
  const [buttonLoad, setButtonLoad] = useState(false);

  return (
    <Container>
      <Card>
        <StyledBody>
          <h2>Login</h2>
          <form onSubmit={(e) => {
            e.preventDefault();
            setButtonLoad(true);

            userLogin(username, parseInt(pin.join("")))
            .then((response) => {
              authDis(authLogin(response.user));
              history.push("/")
            })
            .catch(error => {
              console.error(error);
              setError(error.message);
              setButtonLoad(false);
            });

            
          }}>
            <FormControl
              label={() => "Username"}
            >
              <Input 
                value={username}
                onChange={e => setUsername(e.target.value)}
              />
            </FormControl>

            <FormControl
              label={() => "Pin"}
            >
              <MaskedPinInput
                type="password"
                values={pin}
                onChange={({ values }) => setPin(values)}
              />
            </FormControl>
            <ErrorBox error={appErr} />
            <Button
              isLoading={buttonLoad}
              disabled={!username || !pin}
            >
              Login
            </Button>
          </form>
        </StyledBody>
      </Card>
    </Container>
  );
};

export default LoginPage;
import React, { useContext, useState, useCallback, useEffect } from 'react';
import { Container } from '../../common/StyleClasses';
import { Card } from 'baseui/card';
import { FormControl } from 'baseui/form-control';
import { Input } from 'baseui/input';
import { PinCode } from 'baseui/pin-code';
import AppContext from '../../context/AppContext';
import { useHistory } from 'react-router-dom';
import { Button } from 'baseui/button';
import { userSignup, userLogin } from '../../backend/api';
import ErrorBox from '../../common/ErrorBox';
import { authLogin } from '../../reducers/authReducer';

const SignupPage = () => {
  const { setError, authDis, appErr } = useContext(AppContext);
  const history = useHistory();
  const [username, setUsername] = useState('');
  const [pin, setPin] = useState(["", "", "", ""]);
  const [confirmPin, setConfirmPin] = useState(["", "", "", ""]);
  const [negativePinCode, setNegativePinCode] = useState(false);
  const [userTaken, setUserTaken] = useState(false);

  const checkPinsMatch = useCallback(
    () => {
      if (pin[0] === "" || confirmPin[0] === "") {
        return false;
      }

      for (let i in pin) {
        if (parseInt(pin[i]) !== parseInt(confirmPin[i])) {
          return false;
        }
      }
      return pin.length === confirmPin.length;
    },
    [pin, confirmPin],
  );

  useEffect(() => {
    setNegativePinCode(!checkPinsMatch());
  }, [confirmPin, checkPinsMatch])

  return (
    <Container>
      <Card>
        <h2>Sign Up</h2>
        <form onSubmit={(e) => {
          e.preventDefault();

          if (username.length < 4) {
            setError("Invalid Username");
            return false;
          }

          if (pin.join('').length < 4) {
            console.log(pin.join(""));
            
            setError("Invalid Pin");
            return false;
          }

          if (!checkPinsMatch()) {
            setError("Pins do not match");
            return false;
          }

          userSignup(username, parseInt(pin.join("")))
          .then(({ user: newUser }) => {
            console.log("User " + newUser.id + " successfully created!");

            userLogin(newUser.username, newUser.pin)
            .then(({ user }) => {
              console.log("User " + user.id + " (" + user.username + ") login success!");
              authDis(authLogin(user));
              history.push("/");
            })
          })
          .catch(error => {
            setError(error.message);
            setUserTaken(true);
          })
        }}>
          <FormControl
            label={() => "Username:"}
          >
            <Input
              value={username}
              onChange={(e) => {
                setUsername(e.target.value)
                setUserTaken(false);
              }}
              error={userTaken}
            />
          </FormControl>

          <FormControl
            label={() => "Pin:"}
          >
            <PinCode
              values={pin}
              onChange={({ values }) => setPin(values)}
            />
          </FormControl>

          <FormControl
            label={() => "Confirm Pin:"}
          >
            <PinCode
              values={confirmPin}
              onChange={({ values }) => setConfirmPin(values)}
              error={negativePinCode && confirmPin[0] !== ""}
            />
          </FormControl>
          
          <ErrorBox error={appErr} />

          <Button>Submit</Button>
        </form>
      </Card>
    </Container>
  );
};

export default SignupPage;
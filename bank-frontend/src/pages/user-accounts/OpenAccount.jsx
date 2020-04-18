import React, { useContext, useState } from 'react';
import { Container } from '../../common/StyleClasses';
import { FormControl } from 'baseui/form-control';
import AppContext from '../../context/AppContext';
import { Checkbox } from 'baseui/checkbox';
import { Input } from 'baseui/input';
import { RadioGroup, Radio, ALIGN } from 'baseui/radio';
import { Button } from 'baseui/button';
import { accountOpen } from '../../backend/api';
import { useHistory } from 'react-router-dom';
import ErrorBox from '../../common/ErrorBox';

const OpenAccount = () => {

  const { auth, app, appErr, setError } = useContext(AppContext);

  const history = useHistory();

  const [ownerId, setOwnerId] = useState(auth.isLoggedIn ? auth.currentUser.id : undefined);
  const [type, setType] = useState("Checking");
  const [amount, setAmount] = useState(0);


  return (
    <Container>
      <h2>Open a new account</h2>
      <ErrorBox error={appErr} />
      <form onSubmit={(e) => {
        e.preventDefault();

        if (amount < 0) {
          setError("Initial deposit cannot be negative");
          return false;
        }

        setError("");

        accountOpen({ ownerId, type, amount })
        .then(({ account }) => {
          console.log("Successfully opened account: ", account);
          history.push('/');
        })
        .catch(error => {
          setError(error.message);
          console.error(error);
        })
      }}>
        <FormControl label={() => "Who is this account for?"}>
          <React.Fragment>
            <Input 
              type="number"
              value={ownerId}
              onChange={(e) => setOwnerId(e.target.value)}
              startEnhancer={() => "#"}
            />
            {auth.isLoggedIn && (
              <Checkbox
                checked={ownerId === auth.currentUser.id}
                onChange={(e) => {
                  setOwnerId(e.target.checked ? auth.currentUser.id : 0)
                }}
              >
                This account is for me
              </Checkbox>
            )}
          </React.Fragment>
        </FormControl>

        <FormControl label={() => "What type of account is this?"}>
          <RadioGroup
            value={type}
            onChange={(e) => setType(e.target.value)}
            name="type"
            align={ALIGN.vertical}
          >
            <Radio value="Checking">Checking</Radio>
            <Radio value="Savings">Savings</Radio>
            <Radio value="Brokerage">Brokerage</Radio>
          </RadioGroup>
        </FormControl>

        <FormControl label={() => "Would you like to make an initial deposit?"}>
          <Input
            type="number"
            startEnhancer={() => "$"}
            value={amount}
            onChange={e => setAmount(e.target.value)}
          />
        </FormControl>

        <Button>Open Account</Button>
      </form>
    </Container>
  );
};

export default OpenAccount;
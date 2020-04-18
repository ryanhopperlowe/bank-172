import React, { useState, useContext } from 'react';
import { FormControl } from 'baseui/form-control';
import { Input } from 'baseui/input';
import { Button } from 'baseui/button';
import AppContext from '../../../context/AppContext';
import { accountDeposit, accountWithdraw, accountTransfer } from '../../../backend/api';
import UserAccountContext from '../../../context/UserAccountContext';
import ErrorBox from '../../../common/ErrorBox';

const TransactionForm = (props) => {
  const { account, transactionType } = props;
  const { auth } = useContext(AppContext);
  const { loadAccounts, setNotify } = useContext(UserAccountContext);
  const [error, setError] = useState("");

  const [amount, setAmount] = useState(0.00);
  const [destination, setDestination] = useState(0);

  return (
    <form onSubmit={(e) => {
      e.preventDefault();
      if (amount <= 0) {
        setError("Amount must be greater than 0");
        return false;
      }

      let transactionProm;

      switch (transactionType) {
        case 'Deposit':
          transactionProm = accountDeposit(account.number, amount);
          break;
        
        case 'Withdraw':
          transactionProm = accountWithdraw(account.number, amount, auth.currentUser);
          break;
        
        case 'Transfer':
          transactionProm = accountTransfer(account.number, destination, amount, auth.currentUser)
          break;

        default:
          transactionProm = Promise.reject(new Error("Invalid transactionType: '" + transactionType + "'"));
          break;
      };

      transactionProm
      .then(response => {
        console.log(response);
        loadAccounts();
        setNotify(transactionType + " successful!");
        setError("");
      })
      .catch(error => {
        setError(error.message);
      })

    }}>
      <FormControl label={() => transactionType + " amount:"}>
        <Input
          type="number"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          startEnhancer="$"
          required
        />
      </FormControl>

      {transactionType === "Transfer" && (
        <FormControl label={() => "Destination Account #:"}>
          <Input
            type="number"
            value={destination}
            onChange={(e) => setDestination(e.target.value)}
            startEnhancer="#"
            required
          />
        </FormControl>
      )}

      <ErrorBox error={error} />

      <Button>Submit</Button>

    </form>
  );
};

export default TransactionForm;
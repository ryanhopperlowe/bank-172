import React, { useEffect, useState, useContext, useCallback } from 'react';
import { getUserAccounts, accountClose, accountReopen } from '../../backend/api';
import AppContext from '../../context/AppContext';
import { Container, Centered } from '../../common/StyleClasses';
import { Accordion, Panel } from 'baseui/accordion';
import { ListItem, ListItemLabel } from 'baseui/list';
import { Button } from 'baseui/button';
import TransactionForm from './forms/TransactionForm';
import UserAccountContext from '../../context/UserAccountContext';
import { Toast, KIND } from 'baseui/toast';
import ErrorBox from '../../common/ErrorBox';
import { useHistory, Link } from 'react-router-dom';

const ListUserAccounts = () => {

  const { auth, appErr, setError } = useContext(AppContext);
  const history = useHistory();

  const [accounts, setAccounts] = useState([]);
  const [expandPanels, setExpandPanels] = useState(true);
  const [notify, setNotify] = useState("");

  const loadAccounts = useCallback(() => {
    getUserAccounts(auth.currentUser)
    .then((response) => {
      setAccounts([]);
      console.log(response.accounts);
      setAccounts(response.accounts);
      setExpandPanels(false);
    })
    .catch(error => {
      setError(error.message);
    });
  }, [auth.currentUser, setError])

  useEffect(() => {
    loadAccounts();
  }, [loadAccounts])

  return (
    <UserAccountContext.Provider value={{ loadAccounts, setNotify }}>
      <Container>
        <h2>All Your Accounts at a Glance</h2>
        <Button onClick={() => history.push('/open')}>Open Account</Button>
        <hr />
        {accounts.length < 1 && (
          <div>
            <Centered>
              <hr />
            </Centered>
            <Centered>
              <h3>We couldn't find any accounts for you! Open one <Link to="/open">here</Link></h3>
            </Centered>
          </div>
        )}
        <Accordion
          onChange={({ expanded }) => setNotify("")}
        >
          {accounts.length > 0 && accounts.map((account) => (
            <Panel 
              expanded={expandPanels}
              key={account.number} 
              title={
                <span>Account #: {account.number}</span>
              }
            >
              <ul>
                <ListItem
                  endEnhancer={() => `$${account.amount.toFixed(2)}`}
                >
                  <ListItemLabel>Balance:</ListItemLabel>
                </ListItem>
                <ListItem
                  endEnhancer={() => account.type}
                >
                  <ListItemLabel>Type:</ListItemLabel>
                </ListItem>
                <ListItem
                  endEnhancer={() => account.status === 'A' ? 'Active' : 'Inactive'}
                >
                  <ListItemLabel>Status:</ListItemLabel>
                </ListItem>
              
                <hr/>
                
                {!!notify && <Toast place kind={KIND.positive}>{notify}</Toast>}
                
                {account.status === "A" && (
                  <Accordion>
                    <Panel title="Deposit">
                      <TransactionForm account={account} transactionType="Deposit" />
                    </Panel>
                    <Panel title="Withdraw">
                      <TransactionForm account={account} transactionType="Withdraw" />
                    </Panel>
                    <Panel title="Transfer">
                      <TransactionForm account={account} transactionType="Transfer" />
                    </Panel>
                    <Panel title="Close Account" expanded={expandPanels}>
                      <h4>Are you sure you want to close this account?</h4>
                      <Button onClick={() => {
                        accountClose(account.number, auth.currentUser)
                        .then(response => {
                          loadAccounts();
                          setNotify("Account Successfully closed!")
                          setError("");
                        })
                        .catch(error => {
                          setError(error.message)
                        })
                      }}>Yes, Close Account</Button>
                      <ErrorBox error={appErr} />
                    </Panel>
                  </Accordion>
                )}
                {account.status === "I" && (
                  <Centered>
                    <Button onClick={() => {
                      accountReopen(account.number, auth.currentUser)
                      .then(response => {
                        loadAccounts();
                        setNotify("Account Successfully Reopened!")
                        setError("");
                      })
                      .catch(error => {
                        setError(error.message)
                      })
                    }}>Reopen Account</Button>
                  </Centered>
                )}
              </ul>
              
            </Panel>
          ))}
        </Accordion>
      </Container>
    </UserAccountContext.Provider>
  );
};

export default ListUserAccounts;
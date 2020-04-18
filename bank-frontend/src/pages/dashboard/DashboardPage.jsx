import React, { useContext } from 'react';
import AppContext from '../../context/AppContext';
import { Container, Centered } from '../../common/StyleClasses';
import ListUserAccounts from '../user-accounts/ListUserAccounts';

const DashboardPage = () => {

  const { auth } = useContext(AppContext);

  return !!auth.currentUser && auth.isLoggedIn ? (
    <ListUserAccounts />
  ) : (
    <Container>
      <Centered>
        <h2>Welcome to Bank-172</h2>
      </Centered>
      <Centered>
        <p>Login to access our banking system</p>
      </Centered>
    </Container>
  )
};

export default DashboardPage;
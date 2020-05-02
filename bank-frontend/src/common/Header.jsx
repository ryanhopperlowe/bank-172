import React, { useContext } from 'react';
import {
  HeaderNavigation,
  ALIGN,
  StyledNavigationList,
  StyledNavigationItem
} from "baseui/header-navigation";
import { NavLink, useHistory } from 'react-router-dom';
import AppContext from '../context/AppContext';
import { userLogout } from '../backend/api';
import { authLogout } from '../reducers/authReducer';

const Header = () => {

  const history = useHistory();
  const { auth, authDis, setError } = useContext(AppContext);
  

  return (
    <HeaderNavigation>
      <StyledNavigationList $align={ALIGN.left}>
        <StyledNavigationItem>Bank 172</StyledNavigationItem>
      </StyledNavigationList>
      <StyledNavigationList $align={ALIGN.center} />
      <StyledNavigationList $align={ALIGN.right}>
        {!!auth.currentUser && (
          <StyledNavigationItem>
            {`${auth.currentUser.username} (#${auth.currentUser.id})`} 
          </StyledNavigationItem>
        )}
        <StyledNavigationItem>
          <NavLink to="/">
            Home
          </NavLink>
        </StyledNavigationItem>
        {!auth.isLoggedIn && (
          <StyledNavigationItem>
            <NavLink to="/login">
              Login
            </NavLink>
          </StyledNavigationItem>
        )}
        {!auth.isLoggedIn && (
          <StyledNavigationItem>
            <NavLink to="/register">
              Sign Up
            </NavLink>
          </StyledNavigationItem>
        )}
        {!!auth.currentUser && (
          <StyledNavigationItem>
            <NavLink 
              to=""
              onClick={() => {
                userLogout(auth.currentUser)
                .then(response => {
                  if (response.success) {
                    authDis(authLogout(auth.currentUser));
                    history.push("/");
                  }
                })
                .catch(error => {
                  console.error(error);
                  setError(error.message)
                });
              }}
            >
              Logout
            </NavLink>
          </StyledNavigationItem>
        )}
      </StyledNavigationList>
    </HeaderNavigation>
  );
};

export default Header;
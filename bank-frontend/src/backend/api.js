import Axios from 'axios';
import { AppFactory } from './app';

const appRef = new AppFactory();

const baseURL = "/api";

const instance = () => Axios.create({
  baseURL
});

export const initApp = () => new Promise((resolve, reject) => {
  instance().get("/")
  .then(response => {
    console.log(response);
    let links = response.data._links;
    
    for (let name in links) {
      appRef.setLink(name, links[name].href.replace('{?page,size,sort}', ''))
    }
    console.log(appRef);

    resolve({
      success: true
    });
  })
  .catch(error => {
    console.error(error);
    reject(error);
  });
});


export const getAllCustomers = (endpoint) => new Promise((resolve, reject) => {
  instance().get(`/customers/all`)
  .then(response => {
    console.log(response.data);
    resolve({
      customers: response.data
    });
  })
  .catch(error => {
    console.error(error);
    reject(error);
  })
});

export const userLogin = (username, pin) => new Promise((resolve, reject) => {
  instance().post('/customers/login', { username, pin })
  .then(response => {
    console.log(response);
    let user = response.data;
    resolve({
      user
    });
  })
  .catch(error => {
    console.error(error);
    console.log(error.response);
    
    reject(new Error(error.response.data.message));
  });
})

export const userLogout = (user) => new Promise((resolve, reject) => {

    instance().get(`/customers/logout/${user.id}`)
    .then(response => {
      console.log(response);
      resolve({
        success: response.data
      });
    })
    .catch(error => {
      console.error(error);
      reject(error);
    });

});

export const userSignup = (username, pin) => new Promise((resolve, reject) => {
  instance().post(`/customers/create`, { username, pin, role: 0 })
  .then(response => {
    resolve({
      user: response.data
    });
  })
  .catch((error) => {
    console.log(error.toJSON());
    console.log(error.response);
      
    reject(new Error(error.response.data.message));
  });
});

/**
 * Initiate a delete request for a user's profile
 * @param {number} id ID number of user to delete
 * @param {{ id: number }} user User initiating delete request
 */
export const userDeleteProfile = (id, user) => new Promise((resolve, reject) => {
  instance().post(`/customers/delete/${id}`, user)
  .then(response => {
    resolve(response);
  })
  .catch(error => {
    console.error(error.response.data);
    reject(new Error(error.response.data.message));
  });
});


/**
 * Initiate an open account request
 * @param {{id: number, username: string, role: number, pin: number}} user
 * @returns {Promise<any>} 
 */
export const userUpdateProfile = (user) => new Promise((resolve, reject) => {
  instance().put(`/customers/edit/${user.id}`, user)
  .then(response => {
    resolve({
      user: response.data
    });
  })
  .catch(error => {
    console.error(error.response.data);
    reject(new Error(error.response.data.message));
  });
});


export const getUserAccounts = (user) => new Promise((resolve, reject) => {

  instance().get(`/accounts/for/${user.id}`)
  .then(response => {
    console.log(response);

    resolve({
      accounts: response.data
    });
  })
  .catch(error => {
    console.log(error.response.data);
    reject(new Error(error.response.data.message));
  });

});


/**
 * Initiate Deposit request with server
 * @param {number} accountNumber Deposit target account
 * @param {number} amount amount of money to deposit
 * @returns {Promise<any>}
 */
export const accountDeposit = (accountNumber, amount) => new Promise((resolve, reject) => {
  instance().put(`/accounts/deposit/${accountNumber}`, { amount })
  .then(response => {
    console.log("Deposit Response: ", response);
    
    resolve({
      account: response.data
    })
  })
  .catch(error => {
    console.error("Deposit Error: ", error.response);
    reject(new Error(error.response.data.message));
  })
});


/**
 * Initiate a withdraw request with server
 * @param {number} accountNumber Withdraw target
 * @param {number} amount amount of money to withdraw
 * @param {User} user User making the request
 * @returns {Promise<any>}
 */
export const accountWithdraw = (accountNumber, amount, user) => new Promise((resolve, reject) => {
  instance().put(`/accounts/withdraw/${accountNumber}`, { amount, userId: user.id })
  .then(response => {
    console.log("Withdraw Response: ", response);
    
    resolve({
      account: response.data
    })
  })
  .catch(error => {
    console.error("Withdraw Error: ", error.response);
    reject(new Error(error.response.data.message));
  })
});

/**
 * Initiate transfer between accounts
 * @param {Number} source Source Account Number
 * @param {Number} target Destination Account Number
 * @param {number} amount Amount in $ to be transferred from source to destination
 * @param {User} user User making the transfer request
 * @returns {Promise<any>}
 */
export const accountTransfer = (source, target, amount, user) => new Promise((resolve, reject) => {
  instance().post('/accounts/transfer', { source, target, amount, userId: user.id})
  .then(response => {
    console.log("Transfer Response: ", response);
    
    resolve({
      account: response.data
    })
  })
  .catch(error => {
    console.error("Transfer Error: ", error.response);
    reject(new Error(error.response.data.message));
  })
});


/**
 * Initiate an open account request
 * @param {{ownerId: number, type: string, amount: number}} account params
 * @returns {Promise<any>} 
 */
export const accountOpen = ({ ownerId, type, amount }) => new Promise((resolve, reject) => {
  instance().post(`/accounts/open`, { ownerId, type, amount })
  .then(response => {
    resolve({
      account: response.data,
      ...response
    });
  })
  .catch(error => {
    console.error("Account Open Error: ", error.response);
    reject(new Error(error.response.data.message));
  });
});


/**
 * Initiate close request
 * @param {number} accountNumber target account to close
 * @param {User} user user object
 * @returns {Promise<any>}
 */
export const accountClose = (accountNumber, user) => new Promise((resolve, reject) => {
  instance().put(`/accounts/close/${accountNumber}`, { userId: user.id })
  .then(response => {
    console.log("Account close response: ", response);
    resolve({
      account: response.data
    });
  })
  .catch(error => {
    console.error("Account Close Error: ", error.response)
    reject(new Error(error.response.data.message));
  });
});


/**
 * Initiate reopen account request
 * @param {number} accountNumber target account number
 * @param {User} user user object with id field
 * @returns {Promise<any>}
 */
export const accountReopen = (accountNumber, user) => new Promise((resolve, reject) => {
  instance().put(`/accounts/reopen/${accountNumber}`, { userId: user.id })
  .then(response => {
    console.log("Account Reopen Response: ", response);
    resolve({
      account: response.data
    });
  })
  .catch(error => {
    console.error("Account Reopen Error: ", error.response)
    reject(new Error(error.response.data.message));
  });
});
# bank-172

## San Jose State University
### Course: EnterpriseSoftware-CMPE172/Spring2020
Team Members: Endalk Aychiluhim, Ayesha Khan, Ryan Hopper-Lowe

## Project Introduction
For our project, we decided to implement an online banking system. This is an application which users and administrators can use to manage finances within their accounts. Users will be able to create accounts, close accounts, deposit, withdraw and transfer money.

## Sample Demo Screenshots
<a><img src="https://i.ibb.co/9gQsV3X/Screen-Shot-2020-05-07-at-2-27-56-PM.png" alt="Screen-Shot-2020-05-07-at-2-27-56-PM" border="0"></a>
<a><img src="https://i.ibb.co/YBNSzf3/Screen-Shot-2020-05-07-at-2-29-52-PM.png" alt="Screen-Shot-2020-05-07-at-2-29-52-PM" border="0"></a>
<a><img src="https://i.ibb.co/S31qmgj/Screen-Shot-2020-05-07-at-2-35-29-PM.png" alt="Screen-Shot-2020-05-07-at-2-35-29-PM" border="0"></a><br />
<a><img src="https://i.ibb.co/t4bVFHD/Screen-Shot-2020-05-07-at-2-37-01-PM.png" alt="Screen-Shot-2020-05-07-at-2-37-01-PM" border="0"></a>
<a><img src="https://i.ibb.co/4mdYYK8/Screen-Shot-2020-05-07-at-2-39-35-PM.png" alt="Screen-Shot-2020-05-07-at-2-39-35-PM" border="0"></a>

## Instructions on how to run the project locally.

### Prerequisites:
- git
- node/npm
- java 8

### Setup/Build the Project
- Pull Repository
- run `cd /path/to/project/root/`
- run `./mvnw clean install`

### Run the website locally
- run `./mvnw spring-boot:run`
- Webpage will be available on `http://localhost:8080`

## UML Diagrams - Class & Sequence Diagrams
<a><img src="https://i.ibb.co/gzQyq71/Screen-Shot-2020-05-06-at-6-44-41-PM.png" alt="Screen-Shot-2020-05-06-at-6-44-41-PM" border="0"></a>
<a><img src="https://i.ibb.co/cCFBhHy/Class-Diagram.jpg" alt="Class-Diagram" border="0"></a>

## Schemas
```MySQL
TABLE `customer` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `pin` int(11) NOT NULL,
  `role` tinyint(3) unsigned NOT NULL DEFAULT '0',
  `username` varchar(255) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `UK_irnrrncatp2fvw52vp45j7rlw` (`username`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=latin1;

TABLE `account` (
  `number` bigint(20) NOT NULL AUTO_INCREMENT,
  `amount` decimal(10,2) DEFAULT '0.00',
  `owner_id` bigint(20) DEFAULT NULL,
  `status` varchar(1) DEFAULT 'A',
  `type` varchar(12) DEFAULT 'Checking',
  PRIMARY KEY (`number`),
  KEY `ownerId_fk` (`owner_id`),
  CONSTRAINT `ownerId_fk` FOREIGN KEY (`owner_id`) REFERENCES `customer` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=latin1;
```
## Database Queries

All database queries are generated and handled by the middleware.

## Mid tier APIs

### Exposed Endpoints

#### Root: `/api/`

#### Customers Endpoint: `/api/customers/`
- POST `/api/customers/create` - **body: {userObject}** - create new user profile
- GET `/api/customers/${id}` - get user profile by id
- POST `/api/customers/login` - **body: {username, pin}** - login a user
- GET `/api/customers/logout/${id}` - logout a user

#### Accounts Endpoint: `/api/accounts/`
- GET `/api/accounts/for/${id}` - get all accounts for a user
- GET `/api/accounts/${number}` - **body: {userId}** - get account by account number. UserId must match account.owner_id
- POST `/api/accounts/open` - **body: {type, balance, ownerId}** - open a new account for user with ownerId
- PUT `/api/accounts/reopen/${number}` - **body: {userId}** - reopen a closed account. UserId must match account.ownerId
- PUT `/api/accounts/close/${number}` - **body: {userId}** - close an open account. userId must match account.ownerId
- PUT `/api/accounts/deposit/${number}` - **body: {amount}** - deposit into account
- PUT `/api/accounts/withdraw/${number}` - **body: {amount, userId}** - withdraw funds from account. UserId must match account.owner_id
- PUT `/api/accounts/transfer` - **body: {sourceId, targetId, ownerID, amount}** - transfer funds from source account to target account


## UI Data Transport -xml, json, etc.

Data transported as JSON 

### Example: 

#### Frontend Request:
```JS
instance().post('/customers/login', { 
	username: 'rhopperlowe', 
	pin: 1234
});
```

#### Server Response:
```JSON
{
  "status": 200,
  "statusText": "OK",
  "data": {
    "id": 1,
    "username": "rhopperlowe",
    "pin": 1234,
    "role": 1
  }
}
```



# Personal Budget API

The goal of the project is to create a personal budget API. This API will be using the [envelope budgeting method](https://www.thebalancemoney.com/what-is-envelope-budgeting-1293682). Users will be able to use this api to create envelopes and set personal budgetting goals to track how much a user is spending and set limits. This project will be using Express.js to handle CRUD.

## Functionality

- Create an envelope with a name and an initial cash value.
- Edit the amount of money in the envelope with an explanation.
- Click on specific envelope to read transation history.
- Delete envelopes.

## Visuals

# Main Menu

![Image](https://github.com/user-attachments/assets/98daae7c-b0a1-4854-b56c-316c70148943)
Here you can see the main page populated with a few envelopes as an example. An envelope is made up of a name, balance, budget, and functionality buttons. The envelopes current balance for the period, balance can intentionally exceed the budget and dip into the negatives. This allows for users to set a perferred balance but still lets them go into debt with the idea that they will have to spend less money OR they obtained extra money from some other source to use for one purpose or an other.

# Create a New Envelope

![Image](https://github.com/user-attachments/assets/abb32c8e-d7b7-4b78-a78c-2c69c734466d)
Creating a new envlope requires two fields, the name of the envelope and the budget you'd like the set for the period. The name of the envelope is limited to 15 characters but there's no limit on balance. Budget is static but balance can be changed with a visit to the Update tab.

# Update Balance

![Image](https://github.com/user-attachments/assets/784bfb09-78a5-4901-a25b-85f9c5b3ddb3)
The update balance tab has a radio selection menu so the user can indicated if the update in balance in an increase or a decrease. After the user inputs thier amount and hit submit they will see the balance on the main menu update and can see the transaction history in the Transaction tab.

# Transactions

![Image](https://github.com/user-attachments/assets/d220a7ac-71dc-4196-a740-4bf44e13b730)
This is the transaction history of GROCERIES envelope. At the bottom is the initial balance the envelope started with. Then we see the transactions from newest to the oldest. Increases or decreases in balance are indicated but a '+' or '-' next to the amount. Here we can see that this envelope has mostly decreases in balance but increase with $50.

# Deletion

![Image](https://github.com/user-attachments/assets/1125ebd2-10a8-45c1-b0a0-9eba6e637716)
A user may no longer require an envelope for one reason or an other. Pressing delete will prompted confirm the deletion. After confirming the envelope and related data will be delete.

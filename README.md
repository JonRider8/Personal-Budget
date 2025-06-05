# Personal Budget API
The goal of the project is to create a personal budget API. This API will be using the [envelope budgeting method](https://www.thebalancemoney.com/what-is-envelope-budgeting-1293682). Users will be able to use this api to create envelopes and set personal budgetting goals to track how much a user is spending and set limits. This project will be using Express.js to handle CRUD.

## Functionality
- Create an envelope with a name and an initial cash value.
- Edit the amount of money in the envelope with an explanation.
- Click on specific envelope to read transation history.
- Delete envelopes.

## Visuals
# Main Menu
![Image](https://github.com/user-attachments/assets/8e63780d-b5df-4a3f-9240-04bc6d825340)
Here you can see the main page populated with a few envelopes as an example. An envelope is made up of a name, balance, budget, and functionality buttons. The envelopes current balance for the period, balance can intentionally exceed the budget and dip into the negatives. This allows for users to set a perferred balance but still lets them go into debt with the idea that they will have to spend less money OR they obtained extra money from some other source to use for one purpose or an other.

# Create a New Envelope
![Image](https://github.com/user-attachments/assets/abb32c8e-d7b7-4b78-a78c-2c69c734466d)
Creating a new envlope requires two fields, the name of the envelope and the budget you'd like the set for the period. The name of the envelope is limited to 15 characters but there's no limit on balance. Budget is static but balance can be changed with a visit to the Update tab.

# Update Balance
![Image](https://github.com/user-attachments/assets/57d03ed4-a99d-4cf3-a0cf-f270a8b734bb)
The update balance tab has a radio selection menu so the user can indicated if the update in balance in an increase or a decrease. After the user inputs thier amount and hit submit they will see the balance on the main menu update and can see the transaction history in the Transaction tab.

# Transactions
![Image](https://github.com/user-attachments/assets/3717aa9a-aade-42e1-9dca-86635f728f15)
This is the transaction history of GROCERIES envelope. At the bottom is the initial balance the envelope started with. Then we see the transactions from newest to the oldest. Increases or decreases in balance are indicated but a '+' or '-' next to the amount. Here we can see that this envelope has mostly decreases in balance but increase with $50.

# Deletion
![Image](https://github.com/user-attachments/assets/c7ff66ec-0deb-43bf-9832-49f68bb54a28)
A user may no longer require an envelope for one reason or an other. Pressing delete will prompted confirm the deletion. After confirming the envelope and related data will be delete.
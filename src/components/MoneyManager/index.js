import {Component} from 'react'
import {v4 as uuidv4} from 'uuid'
import './index.css'

import MoneyDetails from '../MoneyDetails'
import TransactionItem from '../TransactionItem'
// import {options} from 'jest-runtime/build/cli/args'

const transactionTypeOptions = [
  {
    optionId: 'INCOME',
    displayText: 'Income',
  },
  {
    optionId: 'EXPENSES',
    displayText: 'Expenses',
  },
]

class MoneyManager extends Component {
  state = {
    transactionsList: [
      {
        id: uuidv4(),
        title: 'Salary',
        amount: 50000,
        type: 'Income',
      },
    ],
    balanceInput: 0,
    incomeInput: 0,
    expenseInput: 0,
  }

  render() {
    const {
      transactionsList,
      balanceInput,
      incomeInput,
      expenseInput,
    } = this.state

    return (
      <div className="app-container">
        <div className="money-manager-container">
          <div className="greetings-container">
            <h1 className="greeting-heading">Hi,Richard</h1>
            <p className="welcome-description">
              Welcome back to your{' '}
              <span className="money-manager-heading">Money Manager</span>
            </p>
          </div>
          <MoneyDetails
            balanceInput={balanceInput}
            incomeInput={incomeInput}
            expenseInput={expenseInput}
          />
          <form className="form">
            <h1 className="form-heading">Add Transaction</h1>
            <label htmlFor="title" className="label">
              TITLE
            </label>
            <input
              type="text"
              id="title"
              className="input-text"
              placeholder="TITLE"
            />
            <label htmlFor="amount" className="label">
              AMOUNT
            </label>
            <input
              type="text"
              id="amount"
              className="input-text"
              placeholder="AMOUNT"
            />
            <label htmlFor="type" className="label">
              TYPE
            </label>
            <select className="dropdown-list">
              {transactionTypeOptions.map(eachType => (
                <option value={eachType.displayText}>
                  {eachType.displayText}
                </option>
              ))}
            </select>
            <button type="submit" className="form-add-btn">
              Add
            </button>
          </form>
          <div className="transaction-history-container">
            <p className="history-heading">History</p>
            <ul className="transaction-list">
              <div className="headings-container">
                <p className="columns-headings">Title</p>
                <p className="columns-headings">Amount</p>
                <p className="columns-headings">Type</p>
              </div>
              {transactionsList.map(eachTransaction => (
                <TransactionItem transactionDetails={eachTransaction} />
              ))}
            </ul>
          </div>
        </div>
      </div>
    )
  }
}

export default MoneyManager

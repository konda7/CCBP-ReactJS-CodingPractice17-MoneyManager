import {Component} from 'react'
import {v4 as uuidv4} from 'uuid'
import './index.css'

import MoneyDetails from '../MoneyDetails'
import TransactionItem from '../TransactionItem'
import {each} from 'immer/dist/internal'
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
    transactionsList: [],
    titleInput: '',
    amountInput: '',
    typeInput: 'INCOME',
    balanceInput: 0,
    incomeInput: 0,
    expenseInput: 0,
  }

  deleteTransaction = transactionId => {
    const {transactionsList} = this.state

    const filteredTransactionList = transactionsList.filter(
      eachTransaction => eachTransaction.id !== transactionId,
    )

    // let incomeUpdate
    // let expenseUpdate
    // const amountUpdate = transactionsList.find(eachTransaction => {
    //   if (eachTransaction.id === transactionId) {
    //     amount = eachTransaction.amountInput
    //   }
    // })

    // let incomeUpdate = incomeInput
    // let expenseUpdate = expenseInput
    // let balanceUpdate = balanceInput
    // if (typeInput === 'INCOME') {
    //   balanceUpdate += amountInput
    //   incomeUpdate += amountInput
    //   expenseUpdate += 0
    // } else {
    //   balanceUpdate -= amountInput
    //   expenseUpdate += amountInput
    //   incomeUpdate += 0
    // }

    this.setState({
      transactionsList: filteredTransactionList,
    })
  }

  addTransaction = event => {
    event.preventDefault()

    const {
      titleInput,
      amountInput,
      typeInput,
      balanceInput,
      incomeInput,
      expenseInput,
    } = this.state

    const newTransaction = {
      id: uuidv4(),
      title: titleInput,
      amount: amountInput,
      type: typeInput,
    }

    let incomeUpdate = incomeInput
    let expenseUpdate = expenseInput
    let balanceUpdate = balanceInput
    if (typeInput === 'INCOME') {
      balanceUpdate += amountInput
      incomeUpdate += amountInput
      expenseUpdate += 0
    } else {
      balanceUpdate -= amountInput
      expenseUpdate += amountInput
      incomeUpdate += 0
    }

    this.setState(prevState => ({
      transactionsList: [...prevState.transactionsList, newTransaction],
      titleInput: '',
      amountInput: '',
      typeInput: 'INCOME',
      balanceInput: balanceUpdate,
      incomeInput: incomeUpdate,
      expenseInput: expenseUpdate,
    }))
  }

  onChangeTitleValue = event => {
    this.setState({
      titleInput: event.target.value,
    })
  }

  onChangeAmountValue = event => {
    this.setState({
      amountInput: parseInt(event.target.value),
    })
  }

  onChangeTypeValue = event => {
    console.log(event.target.value)
    this.setState({
      typeInput: event.target.value,
    })
  }

  render() {
    const {
      transactionsList,
      titleInput,
      amountInput,
      incomeInput,
      expenseInput,
      balanceInput,
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
          <div className="add-transaction-and-history-container">
            <form className="form" onSubmit={this.addTransaction}>
              <h1 className="form-heading">Add Transaction</h1>
              <label htmlFor="title" className="label">
                TITLE
              </label>
              <input
                type="text"
                id="title"
                className="input-text"
                placeholder="TITLE"
                onChange={this.onChangeTitleValue}
                value={titleInput}
              />
              <label htmlFor="amount" className="label">
                AMOUNT
              </label>
              <input
                type="text"
                id="amount"
                className="input-text"
                placeholder="AMOUNT"
                onChange={this.onChangeAmountValue}
                value={amountInput}
              />
              <label htmlFor="type" className="label">
                TYPE
              </label>
              <select
                className="dropdown-list"
                onChange={this.onChangeTypeValue}
              >
                {transactionTypeOptions.map(eachType => (
                  <option value={eachType.optionId} key={eachType.optionId}>
                    {eachType.displayText}
                  </option>
                ))}
              </select>
              <button type="submit" className="form-add-btn">
                Add
              </button>
            </form>
            <div className="transaction-history-container">
              <h1 className="history-heading">History</h1>
              <ul className="transaction-list">
                <li className="headings-container">
                  <p className="columns-headings">Title</p>
                  <p className="columns-headings">Amount</p>
                  <p className="columns-headings">Type</p>
                </li>
                {transactionsList.map(eachTransaction => (
                  <TransactionItem
                    transactionDetails={eachTransaction}
                    key={eachTransaction.id}
                    deleteTransaction={this.deleteTransaction}
                  />
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default MoneyManager

'use strict';

// const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];

/////////////////////////////////////////////////

// Why are all these methods accessible to each array that we create?
// Due to prototypal inheritance.

// SLICE
// Immutable
// We specify the start and end index
// If only start specified, then start to end of array
// If we want last x elements of array, we can do -x
// arr.slice(-x)

// SPLICE
// Mutates
// It also removes the specified elements from the array
// (start, number of elements)
// we can also use -x here, like -1 we remove the last element of the array.

// REVERSE
// Mutates
// const arr2 = arr1.reverse()

// CONCAT
// Immutable
// const newArr = arr1.contact(arr2)
// const newArr = [ ...arr1, ...arr2 ]

// JOIN
// Immutable
// Converts it into a string with separator in between

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// BANKIST APP

// Data
const account1 = {
  owner: 'Jonas Schmedtmann',
  movements: [200, 450, -400, 3000, -650, -130, 70, 1300],
  interestRate: 1.2, // %
  pin: 1111,
};

const account2 = {
  owner: 'Jessica Davis',
  movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
  interestRate: 1.5,
  pin: 2222,
};

const account3 = {
  owner: 'Steven Thomas Williams',
  movements: [200, -200, 340, -300, -20, 50, 400, -460],
  interestRate: 0.7,
  pin: 3333,
};

const account4 = {
  owner: 'Sarah Smith',
  movements: [430, 1000, 700, 50, 90],
  interestRate: 1,
  pin: 4444,
};

const accounts = [account1, account2, account3, account4];

// Elements
const labelWelcome = document.querySelector('.welcome');
const labelDate = document.querySelector('.date');
const labelBalance = document.querySelector('.balance__value');
const labelSumIn = document.querySelector('.summary__value--in');
const labelSumOut = document.querySelector('.summary__value--out');
const labelSumInterest = document.querySelector('.summary__value--interest');
const labelTimer = document.querySelector('.timer');

const containerApp = document.querySelector('.app');
const containerMovements = document.querySelector('.movements');

const btnLogin = document.querySelector('.login__btn');
const btnTransfer = document.querySelector('.form__btn--transfer');
const btnLoan = document.querySelector('.form__btn--loan');
const btnClose = document.querySelector('.form__btn--close');
const btnSort = document.querySelector('.btn--sort');

const inputLoginUsername = document.querySelector('.login__input--user');
const inputLoginPin = document.querySelector('.login__input--pin');
const inputTransferTo = document.querySelector('.form__input--to');
const inputTransferAmount = document.querySelector('.form__input--amount');
const inputLoanAmount = document.querySelector('.form__input--loan-amount');
const inputCloseUsername = document.querySelector('.form__input--user');
const inputClosePin = document.querySelector('.form__input--pin');

const movements = [200, 450, -400, 3000, -650, -130, 70, 1300]

const createUsernames = accs => {
  accs.forEach(acc => 
    acc.username = acc.owner
      .toLowerCase()
      .split(' ')
      .map(word => word[0])
      .join('')
  )
}

createUsernames(accounts)

// Can't use continue and break with forEach
// we can specify max 3 parameters in forEach (element, index, array)
// movements.forEach((movement, idx) => {
//   if (movement > 0) {
//     console.log(`Movement ${idx + 1}: You deposited ${movement}`)
//   } else {
//     console.log(`Movement ${idx + 1}: You withdrew ${Math.abs(movement)}`)
//   }
// })

// Alternative: Can use for, of
// for (const [i, movement] of movements.entries()) {
// }

// const currencies = new Map([
//   ['INR', 'Indian R'],
//   ['USD', 'United States Dollar'],
//   ['GBP', 'Pound Sterling'],
//   ['INR', 'Indian Rupee'],
// ])

// currencies.forEach((value, key, map) => {
//   console.log(`${key}: ${value}`)
// })

// const currenciesUnique = new Set([
//   'USD', 'GBP', 'USD', 'EUR', 'EUR', 'INR', 'INR'
// ])

// currenciesUnique.forEach((value, _, map) => {
//   console.log(`${value}: ${value}`)
// })

const displayMovements = movementsArr => {
  containerMovements.innerHTML = ''
  movementsArr.forEach((mov, i) => {
    const movementType = mov > 0 ? 'deposit' : 'withdrawal'
    const html = `
    <div class="movements">
      <div class="movements__row">
        <div class="movements__type movements__type--${movementType}">${i + 1} ${movementType}</div>
        <div class="movements__value">${currencyEuro(mov)}</div>
      </div>
    </div>
    `;
    containerMovements.insertAdjacentHTML('afterbegin', html)
  })
}

const calcDisplayBalance = account => {
  // we have to set the balance for the user so that we can use this property later
  // for example while transfer
  // since array is of reference type (heap address stored in variable env)
  // we can set the balance property
  account.balance = account.movements.reduce((acc, curr) => acc + curr, 0)
  labelBalance.textContent = currencyEuro(account.balance)
}


// DATA TRANSFORMATIONS WITH MAP, FILTER AND REDUCE
// map: returns the new array after applying a specific operation on each original array element
// filter: returns all array elements that passed a specific test condition
// reduce: reduces / boils down all elements to a single value.

// const euroToUsd = 1.1
// const usdMovements = movements.map(mov => mov * euroToUsd)
// console.log(usdMovements)

const currencyEuro = string => `${string} ???`

const calcDisplaySummary = account => {
  // labelSumIn
  const inValue = account.movements
    .filter(mov => mov > 0)
    .reduce((acc, curr) => acc + curr, 0)
  labelSumIn.textContent = currencyEuro(inValue)

  const outValue = account.movements
    .filter(mov => mov < 0)
    .reduce((acc, curr) => acc + curr, 0)
  labelSumOut.textContent = currencyEuro(Math.abs(outValue))

  const creditInterestValue = account.movements
    .filter(mov => mov > 0)
    .map(mov => mov * (account.interestRate / 100))
    .filter(interest => interest >= 1)
    .reduce((acc, curr) => acc + curr)
  labelSumInterest.textContent = currencyEuro(creditInterestValue)
}

let currentAccount

const updateUI = acc => {
  // populate the movements
  displayMovements(acc.movements)

  // populate the in, out and interest
  calcDisplaySummary(acc)

  // populate the balance
  calcDisplayBalance(acc)
}

// EVENT HANDLERS

// IMPLEMENTING LOGIN
btnLogin.addEventListener('click', (e) => {
  // prevent default behaviour of page reload on submit of form
  // this covers all form cases
  // button click and key press event
  e.preventDefault()

  // verify the identity of user with pin and username
  currentAccount = accounts.find(acc => acc.username === inputLoginUsername.value)
  console.log(currentAccount, currentAccount?.pin, inputLoginPin.value, inputLoginUsername.value)
  
  // if occurs, then
  if (currentAccount?.pin === Number(inputLoginPin.value)) {
    inputLoginUsername.value = inputLoginPin.value = ''
    // to loose cursor focus
    inputLoginPin.blur()
    // display the screen
    containerApp.style.opacity = '100'

    updateUI(currentAccount)
  }
})

// IMPLEMENTING TRANSFERS
btnTransfer.addEventListener('click', (e) => {
  e.preventDefault()
  const toUsername = inputTransferTo.value
  const transferAmt = Number(inputTransferAmount.value)
  const toAccount = accounts.find(acc => acc.username === toUsername)
  if (currentAccount.balance > transferAmt && 
    transferAmt > 0 &&
    toAccount &&
    toAccount.username !== currentAccount.username) {
    inputTransferAmount.value = inputTransferTo.value = ''
    toAccount.movements.push(transferAmt)
    currentAccount.movements.push(-transferAmt)
  }
  updateUI(currentAccount)
})

// IMPLEMENTING CLOSE ACCOUNT
btnClose.addEventListener('click', (e) => {
  e.preventDefault()
  if (
    currentAccount.username === inputCloseUsername.value &&
    currentAccount.pin === Number(inputClosePin.value
  )) {
    // in indexOf we can't specify so many constraints as it does not use callback 
    // eg. indexOf(23)
    const closeAccountIdx = accounts.findIndex(acc => acc.username === inputCloseUsername.value)
    // splice
    accounts.splice(closeAccountIdx, 1)
    // remove the pin and username
    inputCloseUsername.value = inputClosePin.value = ''
    // hide the UI
    containerApp.style.opacity = '0'
  }
})

// IMPLEMENTING REQUEST LOAN
btnLoan.addEventListener('click', (e) => {
  e.preventDefault()
  const loanAmount = Number(inputLoanAmount.value)
  if (loanAmount > 0 && currentAccount.movements.some(mov => mov >= 0.1 * loanAmount)) {
    currentAccount.movements.push(loanAmount)
    updateUI(currentAccount)
  }
  inputLoanAmount.value = ''
})

// Flat and flatMap
// They don't mutate the state

const arr = [[1, 2, 3], [4, 5, 6], 7, 8, [9, 10], 11]
const arr2 = [[[1, 2], 3], [4, [5, 6]], [7, 8, [9, 10], 11]]

const flatArr = arr.flat()
console.log(flatArr, arr)

const flatArr2 = arr2.flat(2)
console.log(flatArr2, arr2)

const overallBalance = accounts
  .map(acc => acc.movements)
  .flat()
  .reduce((acc, curr) => acc + curr)

// using flatMap 
const overallBalance2 = accounts
  .flatMap(acc => acc.movements)
  .reduce((acc, curr) => acc + curr)

console.log(overallBalance, overallBalance2)  

// if we just want to check for equality then we can use includes else some / every

// console.log(accounts)

// const deposits = movements.filter(mov => mov > 0)
// console.log(deposits)

// Other use cases of reduce
// const balance = movements.reduce((acc, curr) => {
//   // we need to return this so that this value can be used in the next iteration
//   console.log(acc)
//   return acc + curr
// }, 0)

// const maxInvestment = movements.reduce((acc, curr) => acc > curr ? acc : curr, movements[0])
// console.log(maxInvestment)

// Coding Challenge 2

// const dogAgesArr = [
//   [5, 2 , 4, 1, 15, 8, 3],
//   [16, 6, 10, 5, 6, 1, 4]
// ]

// better to create a new one than mutating actual array
// the power of chaining methods
// const calcAverageHumanAge = dogAges =>
//   dogAges
//   .map(dogAge => dogAge <= 2 ? 2 * dogAge : 16 + dogAge * 4)
//   .filter(dogAge => dogAge >= 18)
//   .reduce((sum, age, _, arr) => sum + age / arr.length, 0)

// console.log(calcAverageHumanAge(dogAgesArr[0]), calcAverageHumanAge(dogAgesArr[1]))
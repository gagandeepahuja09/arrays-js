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

// Can't use continue and break with forEach
// we can specify max 3 parameters in forEach (element, index, array)
movements.forEach((movement, idx) => {
  if (movement > 0) {
    console.log(`Movement ${idx + 1}: You deposited ${movement}`)
  } else {
    console.log(`Movement ${idx + 1}: You withdrew ${Math.abs(movement)}`)
  }
})

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
        <div class="movements__value">${mov}</div>
      </div>
    </div>
    `;
    containerMovements.insertAdjacentHTML('afterbegin', html)
  })
}

displayMovements(movements)

const calcDisplayBalance = movements => {
  const balance = movements.reduce((acc, curr) => acc + curr, 0)
  labelBalance.textContent = `${balance} EUR`
}
calcDisplayBalance(movements)


// DATA TRANSFORMATIONS WITH MAP, FILTER AND REDUCE
// map: returns the new array after applying a specific operation on each original array element
// filter: returns all array elements that passed a specific test condition
// reduce: reduces / boils down all elements to a single value.

// const euroToUsd = 1.1
// const usdMovements = movements.map(mov => mov * euroToUsd)
// console.log(usdMovements)

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
// console.log(accounts)

// const deposits = movements.filter(mov => mov > 0)
// console.log(deposits)

// Other use cases of reduce
// const balance = movements.reduce((acc, curr) => {
//   // we need to return this so that this value can be used in the next iteration
//   console.log(acc)
//   return acc + curr
// }, 0)

const maxInvestment = movements.reduce((acc, curr) => acc > curr ? acc : curr, movements[0])
console.log(maxInvestment)
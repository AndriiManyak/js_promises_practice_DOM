/* eslint-disable no-console */
'use strict';

function clickPromise() {
  const resolver = (resolve, reject) => {
    document.addEventListener('click', () => {
      resolve('first promise resolved on left click');
    });

    setTimeout(() => {
      reject('first prmise rejected after 5s');
    }, 5000);
  };

  return new Promise(resolver);
}

function leftOrRightClickPromise() {
  const resolver = (resolve) => {
    document.addEventListener('click', () => {
      resolve('second promise resolved after left click');
    });

    document.addEventListener('contextmenu', (event) => {
      event.preventDefault();
      resolve('second promise resolved after right click');
    });
  };

  return new Promise(resolver);
}

function createPromiseForMouseClick(eventName) {
  const resolver = (resolve) => {
    document.addEventListener(eventName, (event) => {
      event.preventDefault();
      resolve('resolve on both click');
    });
  };

  return new Promise(resolver);
}

const promiseOnClick = clickPromise();
const promiseOnRightOrLeftClick = leftOrRightClickPromise();

const promiseLeftClick = createPromiseForMouseClick('click');
const promiseRightClick = createPromiseForMouseClick('contextmenu');

promiseOnClick
  .then((result) => console.log(result))
  .catch((result) => console.log(result));

promiseOnRightOrLeftClick
  .then((result) => console.log(result));

promiseLeftClick
  .then(() => promiseRightClick)
  .then((result) => console.log(result));

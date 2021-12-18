const { LocalStorage } = require('node-localstorage');
const { toStore, fromStore } = require('../src/core/store');

jest.mock('node-localstorage', () => {
  return {
    LocalStorage: jest.fn(()=>{
      return {
        setItem: jest.fn(),
        getItem: jest.fn(()=>JSON.stringify({test: "data"}))
      }
    })
  }
});

describe('toStore', function(){
  it('should call localstorage setItem', function(){
    toStore({test: "data"});
    expect(localStorage.setItem).toHaveBeenCalled();
    expect(localStorage.setItem.mock.calls[0][0]).toBe('Data');
    expect(localStorage.setItem.mock.calls[0][1]).toBe(JSON.stringify({test: "data"}));
  })
});

describe('fromStore', function(){
  it('should return stored data', function(){
    fromStore({test: "data"});
    expect(localStorage.getItem).toHaveBeenCalled();
  })
});
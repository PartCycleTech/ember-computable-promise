import Ember from 'ember';
import DS from 'ember-data';

function computablePromise() {
  let args = [].slice.call(arguments);
  let fn = args.pop();
  let fnAsPromiseObject = function() {
    let promise = fn.apply(this);
    if(promise) {
      return DS.PromiseObject.create({
        promise
      });
    }
  };
  args.push(fnAsPromiseObject);
  return Ember.computed.apply(this, args);
}

function computablePromiseValue(promiseProp) {
  return Ember.computed(`${promiseProp}.isFulfilled`, function() {
    let promise = this.get(promiseProp);
    if(promise && promise.isFulfilled) {
      return promise.content;
    }
  });
}

function isLoadingComputablePromise(promiseProp) {
  return Ember.computed.alias(`${promiseProp}.isPending`);
}

export {computablePromise, computablePromiseValue, isLoadingComputablePromise};

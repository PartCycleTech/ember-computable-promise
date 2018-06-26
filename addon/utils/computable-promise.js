import { alias } from '@ember/object/computed';
import { computed } from '@ember/object';
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
  return computed.apply(this, args);
}

function computablePromiseValue(promiseProp) {
  return computed(`${promiseProp}.isFulfilled`, function() {
    let promise = this.get(promiseProp);
    if(promise && promise.isFulfilled) {
      return promise.content;
    }
  });
}

function isLoadingComputablePromise(promiseProp) {
  return alias(`${promiseProp}.isPending`);
}

export {computablePromise, computablePromiseValue, isLoadingComputablePromise};

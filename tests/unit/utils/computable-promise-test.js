import { run } from '@ember/runloop';
import { Promise } from 'rsvp';
import EmberObject from '@ember/object';
import {
  computablePromise,
  computablePromiseValue,
  isLoadingComputablePromise
} from 'ember-computable-promise/utils/computable-promise';
import { module, test } from 'qunit';

module('Unit | Utility | computable promise');

test('computablePromise works with computablePromiseValue', function(assert) {
  let expectedValue = 'foo';
  let Obj = EmberObject.extend({
    someVal: false,
    myComputablePromise: computablePromise('someVal', function() {
      let resolvedVal = expectedValue;
      return new Promise(resolve => {
        resolve(resolvedVal);
      });
    }),
    myComputablePromiseValue: computablePromiseValue('myComputablePromise')
  });
  let obj = Obj.create();

  run(function() {
    obj.set('someVal', true);
    assert.strictEqual(obj.get('myComputablePromiseValue'), undefined, 'computedPromiseValue is undefined before promise resolution');
    obj.get('myComputablePromise').then(() => {
      assert.strictEqual(obj.get('myComputablePromiseValue'), expectedValue, 'computedPromiseValue has the resolved value of computedPromise after resolution');
    });
  });
});

test('computablePromise works with isLoadingComputablePromise', function(assert) {
  let Obj = EmberObject.extend({
    someVal: 'foo',
    myComputablePromise: computablePromise('someVal', function() {
      let resolvedVal = this.get('someVal');
      return new Promise(resolve => {
        resolve(resolvedVal);
      });
    }),
    isLoading: isLoadingComputablePromise('myComputablePromise')
  });
  let obj = Obj.create();

  run(function() {
    obj.get('myComputablePromise').then(() => {
      assert.strictEqual(obj.get('isLoading'), false, 'isLoadingComputablePromise is false once promise has resolved');
      obj.set('someVal', 'bar');
      assert.strictEqual(obj.get('isLoading'), true, 'isLoadingComputablePromise is true when promise is fired again');
    });
  });
});

import Ember from 'ember';
import { computablePromise, computablePromiseValue } from 'ember-computable-promise/utils/computable-promise';
import { module, test } from 'qunit';

module('Unit | Utility | computable promise');

test('computablePromise works with computablePromiseValue', function(assert) {
  let expectedValue = 'foo';
  let Obj = Ember.Object.extend({
    someVal: false,
    myComputablePromise: computablePromise('someVal', function() {
      let resolvedVal = expectedValue;
      return new Ember.RSVP.Promise(resolve => {
        resolve(resolvedVal);
      });
    }),
    myComputablePromiseValue: computablePromiseValue('myComputablePromise')
  });
  let obj = Obj.create();

  Ember.run(function() {
    obj.set('someVal', true);
    assert.strictEqual(obj.get('myComputablePromiseValue'), undefined, 'computedPromiseValue is undefined before promise resolution');
    obj.get('myComputablePromise').then(() => {
      assert.strictEqual(obj.get('myComputablePromiseValue'), expectedValue, 'computedPromiseValue has the resolved value of computedPromise after resolution');
    });
  });
});

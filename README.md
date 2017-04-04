# ember-computable-promise

## Usage
In your `component.js`:
```js
import Ember from 'ember';
import {computablePromise, computablePromiseValue} from 'ember-computable-promise';

export default Ember.Component.extend({
  someValue: 'foo',

  myPromise: computablePromise('someValue', function() {
    let result = this.get('someValue');
    return new Ember.RSVP.Promise( resolve => {
      resolve(result);
    });
  }),

  myResolvedValue: computablePromiseValue('myPromise') // will be 'foo' after myPromise resolves
});

```

`myResolvedValue` will be undefined before the promise has fulfilled, and will contain the resolved value after fulfillment.

Now your templates will automatically be compatible with `{{myResolvedValue}}`

# ember-computable-promise

## Usage
In your `component.js`:
```js
import {computablePromise, computablePromiseValue} from 'ember-computable-promise';

myProp: computablePromise('dep1', 'dep2', function() {
  // your code
  return new Ember.RSVP.Promise( resolve => {
    resolve();
  })
}),

myValue: computablePromiseValue('myProp');
```

Now your templates will automatically be compatible with `{{myValue}}`

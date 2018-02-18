# down.js

Detects when the user connection goes down


## Usage

ES6
```js
import Down from 'down.js';

const down = new Down();
```

CDN
```html
  <script src="link/to/down.js"></script>
  <script>
    const down = new Down();
  </script>
```

### API

```js
const down = new Down();

this.isOnline = !this.$down.isDown;
this.$down.on('online', () => {
  this.isOnline = true;
});

this.$down.on('offline', () => {
  this.isOnline = false;
});
```

### Compatability

This library requires a polyfill for `fetch`.

### MIT
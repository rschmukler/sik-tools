# Sik-Tools

Command line tools/generators for [sik](http://github.com/rschmukler/sik)

## Commands

### api < name >

Generates an express-based sik API at `lib/api/name-api.js`.

#### Options

* `-d, --dir` - set the target directory for the api. By default this is
  `lib/api`.
* `-m, --models` - Auto import models into the API.

#### Example

```
sik api users -m user
```

Generates:

lib/api/users-api.js

```js
var User = require('user-model');

var app = module.exports = require('sik')();

app.get('/api/...', function(req, res, next) {
});
```

### component < name >

Generates a angular component.


#### Options

* `-d, --dir` - set the target directory for the component. By default this is
  `lib/components`.

* `-j, --javascript` - mark the component to include js file named
  `component-name.js`

* `-p, --partials` - mark the component to include partial file named
  `component-name.jade`

* `-s, --styles` - mark the component to include styl file named
  `component-name.styl`

* `-t, --template` - mark the component to include template file named
  `component-name.jade`

#### Example

    sik component -jsp -l some-dependency some-component

Generates:

       lib/components/some-component
          -> some-component.js
          -> some-component.styl
          -> template.jade

### page < name >

Generates a local page with a angular page template and adds it to the local section of `component.json`


#### Options

* `-d, --dir` - set the target directory for the component. By default this is
  `lib/pages`.

* `-l, --locals` - Comma delimited list for use in `component.json` 
  locals section


#### Example

    sik page -l some-dependency some-page

Generates:

       lib/pages/some-page
          -> some-page.js
          -> some-page.styl
          -> template.jade

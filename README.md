# Sik

Make your node/express applications have a project structure that keeps you
sane.

## Commands

### component < name >

Generates a local component and adds it to the local section of `component.json`


#### Options

* `-d, --dir` - set the target directory for the component. By default this is
  `lib/components`.

* `-j, --javascript` - mark the component to include js file named
  `component-name.js`

* `-l, --locals` - Comma delimited list for use in `component.json` 
  locals section

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
          -> component.json
          -> some-component.js
          -> some-component.styl
          -> template.jade

component.json:

    {
      "name": "some-component",
      "version": "0.0.1",
      "partials": [
        "template.jade"
      ],
      "main": "some-component.js",
      "scripts": [
        "some-component.js"
      ],
      "styles": [
        "some-component.styl"
      ],
      "local": [
        "some-dependency"
      ],
      "description": "Description was prompted for"
    }

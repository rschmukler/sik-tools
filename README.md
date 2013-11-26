# Sik-Tools

Command line tools/generators for [sik](http://github.com/rschmukler/sik)

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
          -> component.json
          -> some-page.js
          -> some-page.styl
          -> template.jade

component.json:

    {
      "name": "some-page",
      "version": "0.0.1",
      "partials": [
        "template.jade"
      ],
      "main": "some-page.js",
      "scripts": [
        "some-page.js"
      ],
      "styles": [
        "some-page.styl"
      ],
      "local": [
        "some-dependency"
      ],
      "description": "Description was prompted for"
    }

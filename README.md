# gpt-ads-module
[![npm (scoped with tag)](https://img.shields.io/npm/v/gpt-ads-module/latest.svg?style=flat-square)](https://npmjs.com/package/gpt-ads-module)
[![npm](https://img.shields.io/npm/dt/gpt-ads-module.svg?style=flat-square)](https://npmjs.com/package/gpt-ads-module)
[![CircleCI](https://img.shields.io/circleci/project/github/ax2inc/gpt-ads-module.svg?style=flat-square)](https://circleci.com/gh/ax2inc/gpt-ads-module)
[![Codecov](https://img.shields.io/codecov/c/github/ax2inc/gpt-ads-module.svg?style=flat-square)](https://codecov.io/gh/ax2inc/gpt-ads-module)
[![Dependencies](https://david-dm.org/ax2inc/gpt-ads-module/status.svg?style=flat-square)](https://david-dm.org/ax2inc/gpt-ads-module)
[![Code Style](https://badgen.net/badge/code%20style/airbnb/ff5a5f?icon=airbnb)](https://github.com/airbnb/javascript)

> Goggle Publisher Tag ads integration for Nuxt

[📖 **Release Notes**](./CHANGELOG.md)

## Features

Integrate Google Publisher Tag with your Nuxt project.

## Setup

- Install the module with your favorite package manager.

```sh
yarn add gpt-ads-module
# Or npm i gpt-ads-module
```

- Add `gpt-ads-module` to `modules` section of `nuxt.config.js`.

```js
// nuxt.config.js

{
  modules: [
    'gpt-ads-module',
 ],
}
```

- Configure the module as needed by adding a `gptAds` key to `nuxt.config.js`.

```js
// nuxt.config.js

{
  gptAds: {
    // Module options
  }
}
```

## Options

### networkCode

- **Type**: `Array|String`: required

Your network code as found in **Google Ad Manager > Admin > Global Settings**.

### debug

- **Type**: `Boolean`
- **Default**: `false`

Enable debug mode, when this is `true`, GPT console opens when the app loads.

### componentName

- **Type**: `String`
- **Default**: `'GptAd'`

Name of the component that the module registers.

## Usage

When the module is enabled, it registers a global Vue component that you can use to display ads in your app. By default, the component's name is **GptAd** but this can be changed via the `componentName` option.

The component accepts a few props to customize the ads you display.

### Props

#### adUnit

- Type: `string`: required

The ad unit for a given ad as defined in Google Ad Manager > Inventory > Ad units.

#### size

- Type: `Array|string`: required

Default size for this ad, can be an array (`[<width>, <height>]`) or a string (`'<width>x<height>'`).

#### sizeMapping

- Type: `Array`

Size mapping for this ad. Each item in the list is an array of its own, where the first item is the browser size, and the second is the expected ad's size(s) for the breakpoint.
Sizes should either be arrays in the form `[<width>, <height>]` or strings in the form `'<width>x<height>'`.

### Examples


```vue
<template>
  <GptAd
    ad-unit="SOME-AD-UNIT"
    :size="[120, 60]"
    :size-mapping="[
      [[1024, 768], [970, 250]],
      [[980, 690], [728, 90]],
      [[640, 480], [120, 60]],
      [[0, 0], [88, 31]],
    ]" />
</template>
```

Equivalent:


```vue
<template>
  <GptAd
    ad-unit="SOME-AD-UNIT"
    size="120x60"
    :size-mapping="[
      ['1024x768', '970x250'],
      ['980x690', '728x90'],
      ['640x480', '120x60'],
      ['0x0', '88x31'],
    ]" />
</template>
```


## Development

- Clone this repository
- Install dependencies using `yarn install` or `npm install`
- Start development server using `npm run dev`

## License

[MIT License](./LICENSE)

Copyright (c) Ax2 Inc.

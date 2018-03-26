<div align="center">
<h1>react-simple-expand</h1>

<p>React Component for creating accessible and performant expandable UI</p>
</div>

<hr />

[![Build Status][build-badge]][build]
[![Code Coverage][coverage-badge]][coverage]
[![version][version-badge]][package]
[![downloads][downloads-badge]][npmtrends]
[![MIT License][license-badge]][license]

[![PRs Welcome][prs-badge]][prs]
[![Code of Conduct][coc-badge]][coc]

[![Watch on GitHub][github-watch-badge]][github-watch]
[![Star on GitHub][github-star-badge]][github-star]
[![Tweet][twitter-badge]][twitter]

## The problem

We create similar info panels and accordion components that collapse and expand, to and from a height of zero. The logic is always the same but the look may change between use cases. Additionally, we want to have the component accessible to all users, at all times.

## This solution

This is a WAI-ARIA compliant React component. It controls how panels/accordions/etc collapse and
expand. ReactSimpleExpand uses render props to reduce overhead and give you flexibility in styling.

## Table of Contents

<!-- START doctoc generated TOC please keep comment here to allow auto update -->

<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->

* [Installation](#installation)
* [Usage](#usage)
* [Props](#props)
  * [id `required`](#id-required)
  * [isOpen](#isopen)
  * [onToggle](#ontoggle)
  * [duration](#duration)
* [Render Prop](#render-prop)
  * [Prop Getters](#prop-getters)
  * [State](#state)
* [LICENSE](#license)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

## Installation

This module is distributed via [npm][npm] which is bundled with [node][node] and
should be installed as one of your project's `dependencies`:

```bash
npm install --save react-simple-expand
```

## Usage

```js
class Accordion extends React.Component {
  state = {
    open: 0,
  }

  onClickItem = index => () => {
    this.setState({open: index})
  }

  render() {
    const {items} = this.props
    const {open} = this.state

    return items.map((item, index) => (
      <ReactSimpleExpand
        key={item.title}
        onToggle={this.onClickItem(index)}
        isOpen={open === index}
      >
        ({(getRootProps, getHeaderProps, getContentProps)}) => (
        <div {...getRootProps()}>
          <button {...getHeaderProps()}>{item.title}</button>
          <div {...getContentProps()}>{item.description}</div>
        </div>
        )}
      </ReactSimpleExpand>
    ))
  }
}

// Using the accordion
const App = () => (
  <Accordion
    items={[
      {title: 'First item', description: 'This is just a demo.'},
      {
        title: "I'm the second item",
        description:
          'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque scelerisque mi sed sapien mollis tempor. Donec ut pretium mi, et mollis dolor. Donec fermentum, augue tristique dapibus facilisis, velit nisi mattis mi, sit amet ultrices arcu libero sed odio. Donec id nisl facilisis, luctus turpis vitae, egestas velit.',
      },
      {
        title: 'Yup, this is the last item...',
        description: 'Last but not least!',
      },
    ]}
  />
)
```

## Props

### id `required`

```js
id: PropTypes.string.isRequired
```

Unique html id.

### isOpen

```js
isOpen: PropTypes.bool
```

Controls the visibilty of the content. If the value changes _after the first render_,
the component will change with an animation.

### onToggle

```js
onToggle: PropTypes.func
```

`onToggle` is passed to the header element and called when clicked. This is the ideal place to
trigger a state change.

### duration

```js
duration: PropTypes.number
```

If a value is supplied, the component will animate the toggle.

> Note: This API is likely to change.

## Render Prop

This is where you pass your own components to render the state of
ReactSimpleExpand. You can either use a prop called `render`, or use the
children prop.

The render prop function is passed an object that has the following properties:

### Prop Getters

These functions are used to apply props to the elements that you render.
The functions take care composing event handlers, merging style objects and
applying other important props and attributes to your components. Their API
is all as follows:

```js
@params {Object} props - optional props you want to add.
@returns {Object} - the props that you need to render the component.
```

_Note:_ If you are rendering a composite component, that component
will need a prop called `refKey`. The refKey is used to forward a
required ref function that ReactSimpleExpand uses internally to
the root DOM element of the composite component. Commonly, folks
call this `innerRef`. So you'd call:
`getRootProps({ refKey: 'innerRef' })` and your composite component
would forward like: `<div ref={props.innerRef} />`

#### getRootProps()

#### getHeaderProps()

#### getContentProps()

### State

| property    | type    | description                                      |
| ----------- | ------- | ------------------------------------------------ |
| isOpen      | boolean | Indicates the current visibility of the content. |
| isAnimating | boolean | Is true during state changes.                    |

## LICENSE

[MIT][license]

[build-badge]: https://img.shields.io/travis/aranja/react-simple-expand.svg?style=flat-square
[build]: https://travis-ci.org/aranja/react-simple-expand
[coc-badge]: https://img.shields.io/badge/code%20of-conduct-ff69b4.svg?style=flat-square
[coc]: https://github.com/aranja/react-simple-expand/blob/master/CODE_OF_CONDUCT.md
[coverage-badge]: https://img.shields.io/codecov/c/github/aranja/react-simple-expand.svg?style=flat-square
[coverage]: https://codecov.io/github/aranja/react-simple-expand
[donate-badge]: https://img.shields.io/badge/$-support-green.svg?style=flat-square
[downloads-badge]: https://img.shields.io/npm/dm/react-simple-expand.svg?style=flat-square
[github-star-badge]: https://img.shields.io/github/stars/aranja/react-simple-expand.svg?style=social
[github-star]: https://github.com/aranja/react-simple-expand/stargazers
[github-watch-badge]: https://img.shields.io/github/watchers/aranja/react-simple-expand.svg?style=social
[github-watch]: https://github.com/aranja/react-simple-expand/watchers
[license-badge]: https://img.shields.io/npm/l/react-simple-expand.svg?style=flat-square
[license]: https://github.com/aranja/react-simple-expand/blob/master/LICENSE
[node]: https://nodejs.org
[npm]: https://www.npmjs.com/
[npmtrends]: http://www.npmtrends.com/react-simple-expand
[package]: https://www.npmjs.com/package/react-simple-expand
[prs-badge]: https://img.shields.io/badge/PRs-welcome-brightgreen.svg?style=flat-square
[prs]: https://github.com/aranja/react-simple-expand/issues
[twitter-badge]: https://img.shields.io/twitter/url/https/github.com/aranja/react-simple-expand.svg?style=social
[twitter]: https://twitter.com/intent/tweet?text=Check%20out%20react-simple-expand%20by%20%40aranjastudio%20https%3A%2F%2Fgithub.com%2Faranja%2Freact-simple-expand%20%F0%9F%91%8D
[version-badge]: https://img.shields.io/npm/v/react-simple-expand.svg?style=flat-square

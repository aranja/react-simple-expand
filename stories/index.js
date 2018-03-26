import React from 'react'
import Component from 'react-component-component'
import {storiesOf} from '@storybook/react'
import ReactSimpleExpand from '../src'

// eslint-disable-next-line
import './demo.css'

const accordionItems = [
  {
    title: 'React',
    description:
      'React makes it painless to create interactive UIs. Design simple views for each state in your application, and React will efficiently update and render just the right components when your data changes. Declarative views make your code more predictable and easier to debug.',
  },
  {
    title: 'Ember',
    description:
      'Ember.js helps developers be more productive out of the box. Designed with developer ergonomics in mind, its friendly APIs help you get your job done—fast.',
  },
  {
    title: 'Vue',
    description:
      'Vue (pronounced /vjuː/, like view) is a progressive framework for building user interfaces. Unlike other monolithic frameworks, Vue is designed from the ground up to be incrementally adoptable. The core library is focused on the view layer only, and is easy to pick up and integrate with other libraries or existing projects.',
  },
]

storiesOf('ReactSimpleExpand', module)
  .add('without animation', () => (
    <Component initialState={{open: false}}>
      {({state, setState}) => (
        <ReactSimpleExpand
          id="test"
          onToggle={() => setState(({open}) => ({open: !open}))}
          isOpen={state.open}
          render={({getRootProps, getHeaderProps, getContentProps}) => (
            <div {...getRootProps()}>
              <button className="Header" {...getHeaderProps()}>
                Click me
              </button>
              <div className="Panel" {...getContentProps()}>
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ab
                accusantium adipisci, architecto dicta dignissimos dolorem eaque
                eligendi fuga in laboriosam magnam neque nihil nobis optio
                perspiciatis quae quis ullam, veniam.
              </div>
            </div>
          )}
        />
      )}
    </Component>
  ))
  .add('with animation', () => (
    <Component initialState={{open: false}}>
      {({state, setState}) => (
        <ReactSimpleExpand
          id="test"
          onToggle={() => setState(({open}) => ({open: !open}))}
          isOpen={state.open}
          duration={500}
          render={({getRootProps, getHeaderProps, getContentProps}) => (
            <div {...getRootProps()}>
              <button className="Header" {...getHeaderProps()}>
                Click me
              </button>
              <div className="Panel" {...getContentProps()}>
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ab
                accusantium adipisci, architecto dicta dignissimos dolorem eaque
                eligendi fuga in laboriosam magnam neque nihil nobis optio
                perspiciatis quae quis ullam, veniam.
              </div>
            </div>
          )}
        />
      )}
    </Component>
  ))

storiesOf('Accordion', module).add('simple', () => (
  <Component
    initialState={{
      open: 'React',
    }}
  >
    {({state, setState}) =>
      accordionItems.map(({title, description}) => (
        <ReactSimpleExpand
          key={title}
          id={title.toLowerCase()}
          onToggle={() => setState({open: title})}
          isOpen={title === state.open}
          duration={300}
        >
          {({getRootProps, getHeaderProps, getContentProps}) => (
            <div {...getRootProps()}>
              <button className="Header" {...getHeaderProps()}>
                {title}
              </button>
              <div className="Panel" {...getContentProps()}>
                {description}
              </div>
            </div>
          )}
        </ReactSimpleExpand>
      ))
    }
  </Component>
))

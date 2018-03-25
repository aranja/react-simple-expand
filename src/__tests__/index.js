import React from 'react'
import {mount} from 'enzyme'
import ReactSimpleExpand from '../'
import {noop} from '../utils'

test('when open, the header should have [aria-expanded=true]', () => {
  const header = mount(
    <ReactSimpleExpand isOpen onToggle={noop}>
      {({getHeaderProps}) => <div {...getHeaderProps()} />}
    </ReactSimpleExpand>,
  ).getDOMNode()

  expect(header.getAttribute('aria-expanded')).toBe('true')
})

test('when closed, the header should have [aria-expanded=false]', () => {
  const header = mount(
    <ReactSimpleExpand onToggle={noop}>
      {({getHeaderProps}) => <div {...getHeaderProps()} />}
    </ReactSimpleExpand>,
  ).getDOMNode()

  expect(header.getAttribute('aria-expanded')).toBe('false')
})

test('the header has an [aria-controls=id] == content[id]', () => {
  const wrapper = mount(
    <ReactSimpleExpand onToggle={noop}>
      {({getHeaderProps, getContentProps}) => (
        <div>
          <div {...getHeaderProps()} data-header />
          <div {...getContentProps()} data-content />
        </div>
      )}
    </ReactSimpleExpand>,
  )
  const header = wrapper.find('[data-header]').getDOMNode()
  const contentId = wrapper.find('[data-content]').getDOMNode().id

  expect(contentId).toBeDefined()
  expect(header.getAttribute('aria-controls')).toBe(contentId)
})

test('allow custom ids', () => {
  const myCustomId = 'custom-id'
  const wrapper = mount(
    <ReactSimpleExpand onToggle={noop} id={myCustomId}>
      {({getHeaderProps, getContentProps}) => (
        <div>
          <div {...getHeaderProps()} data-header />
          <div {...getContentProps()} data-content />
        </div>
      )}
    </ReactSimpleExpand>,
  )
  const header = wrapper.find('[data-header]').getDOMNode()
  const contentId = wrapper.find('[data-content]').getDOMNode().id

  expect(contentId).toBe(myCustomId)
  expect(header.getAttribute('aria-controls')).toBe(contentId)
})

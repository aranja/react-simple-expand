import {Component} from 'react'
import PropTypes from 'prop-types'
import {composeFunctions, createGetter, noop} from './utils'

const OUT_OF_FLOW = {
  bottom: '100%',
  position: 'absolute',
}

class ReactSimpleExpand extends Component {
  static propTypes = {
    id: PropTypes.string.isRequired,
    onToggle: PropTypes.func,
    render: PropTypes.func,
    children: PropTypes.func,
    isOpen: PropTypes.bool,
    duration: PropTypes.number,
  }

  state = {
    isAnimating: false,
    height: '',
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.isOpen !== nextProps.isOpen) {
      // Prepare the animation by setting the current height as max height.
      this.setState(
        {isAnimating: true, height: `${this.root.offsetHeight}px`},
        () => {
          // Set a transition after specifying the starting point (height)
          // of the animation.
          // Calculate the height of the root at the end state.
          const contentHeight = nextProps.isOpen ? this.content.offsetHeight : 0
          this.setState(
            {
              height: `${this.tab.offsetHeight + contentHeight}px`,
            },
            this.onComplete,
          )
        },
      )
    }
  }

  onComplete = () => {
    const {duration = 0} = this.props

    setTimeout(() => {
      this.setState({isAnimating: false, height: ''})
    }, duration)
  }

  onToggle = event => {
    this.props.onToggle(event)
  }

  rootRef = element => {
    this.root = element
  }

  headerRef = element => {
    this.tab = element
  }

  contentRef = element => {
    this.content = element
  }

  getRootProps = ({ref, onTransitionEnd, ...props} = {}) =>
    createGetter(props, {
      onTransitionEnd: composeFunctions(onTransitionEnd, this.onTransitionEnd),
      ref: composeFunctions(ref, this.rootRef),
      style: {
        overflow: 'hidden',
        height: this.state.height,
        transition: `height ${this.props.duration}ms`,
      },
    })

  getHeaderProps = ({ref, onToggle, ...props} = {}) =>
    createGetter(props, {
      'aria-controls': this.props.id,
      'aria-expanded': Boolean(this.props.isOpen),
      onClick: composeFunctions(onToggle, this.onToggle),
      ref: composeFunctions(ref, this.headerRef),
    })

  getContentProps = ({ref, ...props} = {}) => {
    const isClosed = !(this.props.isOpen || this.state.isAnimating)
    const defaultProps = {
      ref: composeFunctions(ref, this.contentRef),
      id: this.props.id,
    }

    if (isClosed) {
      defaultProps.style = OUT_OF_FLOW
    }

    return createGetter(props, defaultProps)
  }

  render() {
    const {render, children, isOpen} = this.props
    const {isAnimating, height} = this.state
    const renderFunction = render || children || noop

    return renderFunction({
      isAnimating,
      isOpen,
      height,
      getRootProps: this.getRootProps,
      getHeaderProps: this.getHeaderProps,
      getContentProps: this.getContentProps,
    })
  }
}

export default ReactSimpleExpand

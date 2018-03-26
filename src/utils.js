export const composeFunctions = (...fns) => (...args) =>
  fns.forEach(fn => typeof fn === 'function' && fn(...args))

export const createGetter = (props, defaultProps) => {
  const composedProps = {
    ...props,
    ...defaultProps,
  }

  if ('style' in props && 'style' in defaultProps) {
    composedProps.style = {
      ...props.style,
      ...defaultProps.style,
    }
  }

  if ('refKey' in composedProps) {
    composedProps[composedProps.refKey] = composedProps.ref
    delete composedProps.refKey
    delete composedProps.ref
  }

  return composedProps
}

export const noop = () => {}

import {composeFunctions, createGetter} from '../utils'

describe('composeFunctions', () => {
  it('should create a new function', () => {
    const result = composeFunctions()
    expect(typeof result).toBe('function')
  })

  it('should call callbacks in order', () => {
    const expected = [1, 2, 3, 4]
    const result = []

    composeFunctions(
      () => result.push(1),
      () => result.push(2),
      () => result.push(3),
      () => result.push(4),
    )()
    expect(result).toEqual(expected)
  })

  it('should ignore arguments that are not functions', () => {
    const notFunction = true
    const expected = [1, 2]
    const result = []

    composeFunctions(() => result.push(1), notFunction, () => result.push(2))()
    expect(result).toEqual(expected)
  })
})

describe('createGetter', () => {
  it('should merge style objects', () => {
    const props = {
      style: {
        background: 'red',
        fontSize: 24,
      },
    }

    const style = {
      color: 'green',
      fontSize: 16,
    }

    const result = createGetter(props, {style})

    expect(result).toEqual({
      style: {
        ...props.style,
        ...style,
      },
    })
  })

  it('should replace a ref with refKey', () => {
    const fakeRef = () => {}
    const props = {
      ref: fakeRef,
    }
    const result = createGetter(props, {
      refKey: 'innerRef',
    })

    expect(result).not.toHaveProperty('ref', fakeRef)
    expect(result).not.toHaveProperty('refKey', 'innerRef')
    expect(result).toHaveProperty('innerRef', fakeRef)
  })
})

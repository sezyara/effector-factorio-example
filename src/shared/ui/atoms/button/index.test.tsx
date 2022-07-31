import React from 'react'
import { fireEvent, render, screen } from '@testing-library/react'
import { Button } from '.'

describe('Button', () => {
  describe('should be rendered correctly', () => {
    test('default', () => {
      render(<Button>Button</Button>)
      const button = screen.getByText('Button')
      expect(button.classList.contains('btn')).toBeTruthy()
    })

    test('danger', () => {
      render(<Button danger>Button</Button>)
      const button = screen.getByText('Button')
      expect(button.classList.contains('danger')).toBeTruthy()
    })

    test('ghost', () => {
      render(<Button ghost>Button</Button>)
      const button = screen.getByText('Button')
      expect(button.classList.contains('ghost')).toBeTruthy()
    })

    test('danger ghost', () => {
      render(<Button danger ghost>Button</Button>)
      const button = screen.getByText('Button')
      expect(button.classList.contains('danger') && button.classList.contains('ghost')).toBeTruthy()
    })
  })

  test('should be clickable', () => {
    const onClick = jest.fn()
    render(<Button onClick={onClick}>Button</Button>)
    fireEvent.click(screen.getByText('Button'))
    expect(onClick).toHaveBeenCalledTimes(1)
  })
})

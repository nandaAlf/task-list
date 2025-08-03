import {describe, it, expect, vi} from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import { Button } from '../components/Button'


describe('<Button />', () => {
  it('renders the button with text', () => {
    render(<Button>Click me</Button>)
    expect(screen.getByRole('button', { name: /click me/i })).toBeInTheDocument()
  })

  it('triggers onClick handler when clicked', () => {
    const onClick = vi.fn()
    render(<Button onClick={onClick}>Click</Button>)
    fireEvent.click(screen.getByRole('button'))
    expect(onClick).toHaveBeenCalled()
  })

  it('disables the button when `disabled` is true', () => {
    const onClick = vi.fn()
    render(<Button disabled onClick={onClick}>Disabled</Button>)
    const btn = screen.getByRole('button')
    expect(btn).toBeDisabled()
    fireEvent.click(btn)
    expect(onClick).not.toHaveBeenCalled()
  })

  it('is focusable via keyboard', () => {
    render(<Button>Focusable</Button>)
    const btn = screen.getByRole('button')
    btn.focus()
    expect(btn).toHaveFocus()
  })

  it('supports aria-label for accessibility', () => {
    render(<Button aria-label="Save">Save</Button>)
    expect(screen.getByRole('button', { name: /save/i })).toBeInTheDocument()
  })
})

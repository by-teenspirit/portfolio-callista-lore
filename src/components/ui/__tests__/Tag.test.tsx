import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { Tag } from '@/components/ui/Tag'

describe('Tag', () => {
  it('renders label', () => {
    render(<Tag label="UX Design" />)
    expect(screen.getByText('UX Design')).toBeInTheDocument()
  })

  it('applies orange variant classes', () => {
    const { container } = render(<Tag label="Test" variant="orange" />)
    expect(container.firstChild).toHaveClass('text-brand-orange')
  })

  it('applies dark variant by default', () => {
    const { container } = render(<Tag label="Test" />)
    expect(container.firstChild).toHaveClass('bg-ink/5')
  })

  it('applies small size', () => {
    const { container } = render(<Tag label="Test" size="sm" />)
    expect(container.firstChild).toHaveClass('text-[10px]')
  })

  it('accepts custom className', () => {
    const { container } = render(<Tag label="Test" className="my-custom" />)
    expect(container.firstChild).toHaveClass('my-custom')
  })
})

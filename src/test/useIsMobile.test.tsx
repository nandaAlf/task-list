import { renderHook, act } from '@testing-library/react'

import { describe, it, expect, beforeEach, afterEach } from "vitest";
import { useIsMobile } from '../hook/useIsMobile';
describe('useIsMobile', () => {
  const originalInnerWidth = window.innerWidth

  beforeEach(() => {
    // Reset window width before each test
    Object.defineProperty(window, 'innerWidth', {
      writable: true,
      configurable: true,
      value: 1024,
    })
  })

  afterEach(() => {
    // Restaurar
    Object.defineProperty(window, 'innerWidth', {
      writable: true,
      configurable: true,
      value: originalInnerWidth,
    })
  })

  it('should return false if width is above breakpoint', () => {
    const { result } = renderHook(() => useIsMobile(768))
    expect(result.current).toBe(false)
  })

  it('should return true if width is below breakpoint', () => {
    window.innerWidth = 500
    const { result } = renderHook(() => useIsMobile(768))
    expect(result.current).toBe(true)
  })

  it('should update value on resize', () => {
    const { result } = renderHook(() => useIsMobile(768))

    act(() => {
      window.innerWidth = 500
      window.dispatchEvent(new Event('resize'))
    })
    expect(result.current).toBe(true)

    act(() => {
      window.innerWidth = 1024
      window.dispatchEvent(new Event('resize'))
    })
    expect(result.current).toBe(false)
  })
})

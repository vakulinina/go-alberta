'use client'

import { useCallback, useEffect, useRef, useState } from 'react'
import React from 'react'
import { RightArrowIcon } from '../Icons/RightArrowIcon'
import { LeftArrowIcon } from '../Icons/LeftArrowIcon'
import Link from 'next/link'

interface CarouselProps {
  itemWidth?: number
  step?: number
  gap?: number
  title?: string
  visibleItems?: number
  children: React.ReactNode[]
  link?: string
}

// TODO: add swipe functionality for mobile

const CarouselComponent = ({
  itemWidth = 255,
  step = 1,
  gap = 72,
  visibleItems = 4,
  title,
  children,
  link,
}: CarouselProps) => {
  const carouselRef = useRef<HTMLDivElement>(null)
  const [currentIndex, setCurrentIndex] = useState(0)
  const [containerWidth, setContainerWidth] = useState(0)

  useEffect(() => {
    const updateItemsInView = () => {
      if (carouselRef.current) {
        const containerWidth = carouselRef.current.offsetWidth
        setContainerWidth(containerWidth)
      }
    }

    updateItemsInView()
    window.addEventListener('resize', updateItemsInView)

    return () => window.removeEventListener('resize', updateItemsInView)
  }, [gap, itemWidth])

  const scrollLeft = useCallback(() => {
    setCurrentIndex((prev) => Math.max(prev - step, 0))
  }, [step])

  const scrollRight = useCallback(() => {
    setCurrentIndex((prev) => {
      const totalScrollableWidth = children.length * (itemWidth + gap) - gap - containerWidth
      const maxIndex = Math.ceil(totalScrollableWidth / (itemWidth + gap))
      return Math.min(prev + step, maxIndex)
    })
  }, [children.length, containerWidth, gap, itemWidth, step])

  return (
    <div
      className="relative mx-auto overflow-hidden"
      style={{ maxWidth: `${(itemWidth + gap) * visibleItems - gap}px` }}
    >
      <div className="mb-[70px] flex items-baseline justify-between">
        <div className="flex items-center gap-[5px] self-center">
          <button onClick={scrollLeft}>
            <LeftArrowIcon />
          </button>
          <button onClick={scrollRight}>
            <RightArrowIcon />
          </button>
        </div>

        {title && <h2 className="text-[32px]">{title}</h2>}

        {link && (
          <Link href={link} className="text-[20px] underline">
            See all
          </Link>
        )}
      </div>

      <div
        ref={carouselRef}
        className="flex whitespace-nowrap"
        style={{
          gap: `${gap}px`,
          transform: `translateX(-${currentIndex * (itemWidth + gap)}px)`,
          transition: 'transform 0.4s ease-in-out',
        }}
      >
        {children}
      </div>
    </div>
  )
}

export const Carousel = React.memo(CarouselComponent)

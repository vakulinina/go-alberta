'use client'

import { useState } from 'react'
import { useSearchParams } from 'next/navigation'
import { debounce } from '@/utils/helpers'
import { ChevronRightIcon } from './Icons/ChevronRightIcon'

const INITIAL_VISIBLE_CATEGORIES = 5

type Category = {
  categoryId: number
  categoryName: string
}

type Props = {
  categories: Category[]
  onCategoryChange: (categoryIds: number[]) => void
}

const debouncedUpdate = debounce(async (cats: number[], onCategoryChange: (categoryIds: number[]) => void) => {
  try {
    onCategoryChange(cats)
  } catch (error) {
    console.error('Error filtering campaigns:', error)
  }
}, 800)

export function CategoryFilter({ categories, onCategoryChange }: Props) {
  const searchParams = useSearchParams()
  const [showAll, setShowAll] = useState(false)
  const [selectedCategories, setSelectedCategories] = useState<number[]>(() => {
    const categoryParam = searchParams.get('categories')
    return categoryParam ? categoryParam.split(',').map(Number) : []
  })

  const visibleCategories = showAll ? categories : categories.slice(0, INITIAL_VISIBLE_CATEGORIES)

  const handleCategoryChange = (categoryId: number) => {
    const newSelected = selectedCategories.includes(categoryId)
      ? selectedCategories.filter((id) => id !== categoryId)
      : [...selectedCategories, categoryId]

    setSelectedCategories(newSelected)
    debouncedUpdate(newSelected, onCategoryChange)
  }

  return (
    <div>
      <h2 className="mb-4 font-semibold">Categories</h2>
      <div className="space-y-2">
        {visibleCategories.map(({ categoryId, categoryName }) => (
          <label key={categoryId} className="flex cursor-pointer items-center space-x-2">
            <input
              type="checkbox"
              checked={selectedCategories.includes(categoryId)}
              onChange={() => handleCategoryChange(categoryId)}
              className="rounded border-gray-300"
            />
            <span>{categoryName}</span>
          </label>
        ))}
      </div>
      {categories.length > INITIAL_VISIBLE_CATEGORIES && (
        <button onClick={() => setShowAll(!showAll)} className="mt-4 flex w-full justify-center">
          <ChevronRightIcon className={`h-8 w-8 ${showAll ? '-rotate-90' : 'rotate-90'} hover:stroke-[#51236DD9]`} />
        </button>
      )}
    </div>
  )
}

'use client'

import { useState } from 'react'
import { useSearchParams } from 'next/navigation'
import { debounce } from '@/utils/helpers'
import { ChevronRightIcon } from './Icons/ChevronRightIcon'
import { SearchIcon } from './Icons/SearchIcon'
import { Input } from './Inputs/Input'

const INITIAL_VISIBLE_CATEGORIES = 5

type Category = {
  categoryId: number
  categoryName: string
}

type Props = {
  categories: Category[]
  onCategoryChange: (categoryIds: number[], freeText?: string) => void
}

const debouncedUpdate = debounce(
  async (
    cats: number[],
    freeText: string | undefined,
    onCategoryChange: (categoryIds: number[], freeText?: string) => void
  ) => {
    try {
      onCategoryChange(cats, freeText)
    } catch (error) {
      console.error('Error filtering campaigns:', error)
    }
  },
  800
)

export function CampaignsFilter({ categories, onCategoryChange }: Props) {
  const searchParams = useSearchParams()
  const [showAll, setShowAll] = useState(false)
  const [searchText, setSearchText] = useState(() => searchParams.get('freeText') || '')
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
    debouncedUpdate(newSelected, searchText, onCategoryChange)
  }

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newText = e.target.value
    setSearchText(newText)
    debouncedUpdate(selectedCategories, newText, onCategoryChange)
  }

  return (
    <div>
      <div className="relative mb-8">
        <div className="relative">
          <div className="pointer-events-none absolute inset-y-0 left-0 z-20 flex items-center pl-3">
            <SearchIcon />
          </div>
          <Input
            type="text"
            value={searchText}
            onChange={handleSearchChange}
            className="w-full pl-10"
            placeholder="Search..."
          />
        </div>
      </div>
      <div className="mb-4 flex items-center justify-between">
        <h2 className="font-semibold">Categories</h2>
      </div>
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

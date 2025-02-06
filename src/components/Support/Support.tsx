'use client'

import React, { useEffect, useState } from 'react'
import { getFAQs } from '@/api/supportApi'
import { FAQ } from '@/types/support'

const FAQPage = () => {
  const [faqs, setFaqs] = useState<FAQ[]>([])
  const [loading, setLoading] = useState<boolean>(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const loadFAQs = async () => {
      try {
        const data = await getFAQs()
        setFaqs(data)
      } catch (err: unknown) {
        if (err instanceof Error) {
          setError(err.message)
        } else {
          setError('An unknown error occurred')
        }
      } finally {
        setLoading(false)
      }
    }

    loadFAQs()
  }, [])

  if (loading) {
    return (
      <div className="container mx-auto max-w-4xl px-4 py-8">
        <div className="animate-pulse">
          <div className="mb-8 h-8 w-1/3 rounded bg-gray-200"></div>
          {[1, 2, 3].map((i) => (
            <div key={i} className="mb-6">
              <div className="mb-4 h-6 w-3/4 rounded bg-gray-200"></div>
              <div className="h-4 w-full rounded bg-gray-200"></div>
            </div>
          ))}
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="container mx-auto max-w-4xl px-4 py-8">
        <div className="text-red-500">{error}</div>
      </div>
    )
  }

  if (!loading && !error && faqs.length === 0) {
    return (
      <div className="container mx-auto max-w-4xl px-4 py-8">
        <div className="text-gray-500">No FAQs available at the moment.</div>
      </div>
    )
  }

  return (
    <main className="container mx-auto max-w-4xl px-4 py-8">
      <h1 className="mb-12 pt-16 text-3xl font-bold">FAQ: Go Alberta Booster</h1>

      <div className="space-y-6">
        {faqs.map((faq) => (
          <div key={faq.faqID} className="border-b border-gray-200 pb-6 last:border-b-0">
            <h2 className="mb-4 text-xl font-semibold">
              {faq.faqID}. {faq.question}
            </h2>
            <p className="text-gray-600">{faq.answer}</p>
          </div>
        ))}
      </div>
    </main>
  )
}

export default FAQPage

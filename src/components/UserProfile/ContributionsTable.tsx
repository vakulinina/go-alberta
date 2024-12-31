'use client'
import { SupportIcon } from '../Icons/SupportIcon'
import { Contribution, mockContributions } from '@/constants/contributions-mock'

export default function ContributionsTable() {
  return (
    <div className="w-full overflow-x-auto">
      <table className="w-full min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-3 py-2 text-left text-base font-medium text-gray-900 sm:px-6 sm:py-3">Invest</th>
            <th className="px-3 py-2 text-left text-base font-medium text-gray-900 sm:px-6 sm:py-3">Campaign</th>
            <th className="px-3 py-2 text-left text-base font-medium text-gray-900 sm:px-6 sm:py-3">Date</th>
            <th className="px-3 py-2 text-left text-base font-medium text-gray-900 sm:px-6 sm:py-3">Perks</th>
            <th className="px-3 py-2 text-left text-base font-medium text-gray-900 sm:px-6 sm:py-3">Status</th>
            <th className="px-3 py-2 text-left text-base font-medium text-gray-900 sm:px-6 sm:py-3"></th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200">
          {mockContributions.map((contribution: Contribution, index: number) => (
            <tr key={index} className="group hover:bg-gray-50">
              <td className="relative px-3 py-2 text-xs text-gray-900 sm:px-6 sm:py-4">
                <div className="absolute left-0 top-0 h-full w-1 bg-green-500 opacity-0 group-hover:opacity-100" />
                {contribution.invest}
              </td>
              <td className="px-3 py-2 text-xs sm:px-6 sm:py-4">
                <a href={`/campaigns/${contribution.campaign}`} className="text-gray-900 underline hover:text-gray-600">
                  {contribution.campaign}
                </a>
              </td>
              <td className="px-3 py-2 text-xs text-gray-500 sm:px-6 sm:py-4">
                <div className="break-words">{contribution.date}</div>
              </td>
              <td className="px-3 py-2 text-xs text-gray-500 sm:px-6 sm:py-4">{contribution.perks}</td>
              <td className="px-3 py-2 text-xs font-semibold sm:px-6 sm:py-4">{contribution.status}</td>
              <td className="px-3 py-2 text-xs text-gray-500 sm:px-6 sm:py-4">
                <SupportIcon className="h-2 w-2" />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

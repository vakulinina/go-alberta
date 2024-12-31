'use client'
import { SupportIcon } from '../Icons/SupportIcon'
import { Contribution, mockContributions } from '@/constants/contributions-mock'

export default function ContributionsTable() {
  return (
    <div className="w-full">
      <table className="w-full">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-6 py-3 text-left text-base font-medium text-gray-900">Invest</th>
            <th className="px-6 py-3 text-left text-base font-medium text-gray-900">Campaign</th>
            <th className="px-6 py-3 text-left text-base font-medium text-gray-900">Date</th>
            <th className="px-6 py-3 text-left text-base font-medium text-gray-900">Perks</th>
            <th className="px-6 py-3 text-left text-base font-medium text-gray-900">Status</th>
            <th className="px-6 py-3 text-left text-base font-medium text-gray-900"></th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200">
          {mockContributions.map((contribution: Contribution, index: number) => (
            <tr key={index} className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
              <td className="whitespace-nowrap px-6 py-4 text-xs text-gray-900">{contribution.invest}</td>
              <td className="px-6 py-4 text-xs">
                <a href="#" className="text-gray-900 hover:underline">
                  {contribution.campaign}
                </a>
              </td>
              <td className="whitespace-nowrap px-6 py-4 text-xs text-gray-500">{contribution.date}</td>
              <td className="whitespace-nowrap px-6 py-4 text-xs text-gray-500">{contribution.perks}</td>
              <td className="whitespace-nowrap px-6 py-4 text-xs">
                <span className="inline-flex rounded-full px-2 text-xs font-semibold leading-5">
                  {contribution.status}
                </span>
              </td>
              <td className="whitespace-nowrap px-6 py-4 text-xs text-gray-500">
                <SupportIcon className="h-2 w-2" />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

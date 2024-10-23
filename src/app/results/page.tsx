'use client'

import { useSearchParams } from 'next/navigation'
import ResultsPageComponent from '@/components/results-page'

export default function ResultsPage() {
  const searchParams = useSearchParams()
  const data = searchParams.get('data')
//   const analysisResult = data ? JSON.parse(decodeURIComponent(data)) : null
  const analysisResult = {
    status: 'parkinsons' as const,
    confidence: 80,
    details: "good"
  }

  return <ResultsPageComponent result={analysisResult} />
}

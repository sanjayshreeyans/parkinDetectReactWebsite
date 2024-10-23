import React from 'react'
import { motion } from 'framer-motion'
import { useRouter, useSearchParams } from 'next/navigation'
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { CheckCircle, AlertTriangle, ArrowLeft, Brain, Activity, FileText } from 'lucide-react'

type AnalysisResult = {
  diagnosis: string
  status: 'HEALTHY' | 'PARKINSON'
  confidence: number
  details: string
}

export default function ResultsPageComponent() {
  const router = useRouter()
  const searchParams = useSearchParams()

  // Parse the result from the URL parameters
  const resultParam = searchParams.get('data')
  const result: AnalysisResult = resultParam ? JSON.parse(decodeURIComponent(resultParam)) : null

  if (!result) {
    return <div>No result data available.</div>
  }

  // Determine if the user is healthy
  const isHealthy = result.diagnosis === 'HEALTHY'

  // Set the details based on the diagnosis
  result.details = isHealthy
    ? "Our advanced machine learning models thoroughly analyzed your drawing for signs of tremors, pressure inconsistencies, and irregular movements commonly associated with Parkinson's Disease. Based on these metrics, the analysis indicates no significant indicators of the disease. This suggests that, according to our evaluation, you are likely not diagnosed with Parkinson's Disease. However, it's always advisable to consult with a healthcare professional for a comprehensive assessment."
    : "Our state-of-the-art algorithms have detected notable markers in your drawing, such as hand tremors, pressure variations, and irregularities in your movements, which are frequently linked to early stages of Parkinson's Disease. The findings strongly suggest that you may be showing signs consistent with the condition. While this analysis provides valuable insights, it is not a definitive diagnosis, and we encourage you to seek further evaluation from a medical professional."

  return (
    <motion.div 
      initial={{ opacity: 0 }} 
      animate={{ opacity: 1 }} 
      transition={{ duration: 0.5 }}
      className="min-h-screen bg-gradient-to-b from-green-50 to-white text-gray-900 py-16"
    >
      <div className="container mx-auto px-4 max-w-4xl">
        <motion.div
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.5 }}
        >
          <Button
            variant="ghost"
            className="mb-8 text-green-600 hover:text-green-700 transition-colors"
            onClick={() => router.push('/')}
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Home
          </Button>
        </motion.div>

        <motion.h1
          className="text-5xl font-bold text-center mb-12 text-green-800"
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.5 }}
        >
          Analysis Results
        </motion.h1>

        <motion.div
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.5 }}
        >
          <Card className="bg-white shadow-xl rounded-2xl overflow-hidden">
            <CardContent className="p-8">
              <div className="flex items-center justify-center mb-8">
                {isHealthy ? (
                  <CheckCircle className="text-green-500 w-24 h-24" />
                ) : (
                  <AlertTriangle className="text-yellow-500 w-24 h-24" />
                )}
              </div>
              <h2 className="text-3xl font-semibold text-center mb-6">
                {isHealthy ? 'No Indicators Detected' : 'Parkinson\'s Indicators Detected'}
              </h2>
              <div className="mb-8">
                <p className="text-lg text-gray-600 text-center mb-2">Confidence Level</p>
                <div className="relative pt-1">
                  <div className="flex mb-2 items-center justify-between">
                    <div>
                      <span className="text-xs font-semibold inline-block py-1 px-2 uppercase rounded-full text-green-600 bg-green-200">
                        {result.confidence.toFixed(2)}%
                      </span>
                    </div>
                  </div>
                  <Progress value={result.confidence} className="w-full" />
                </div>
              </div>
              <p className="text-xl text-gray-700 text-center mb-8 leading-relaxed">
                {result.details}
              </p>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                {[
                  { icon: Brain, title: "AI Analysis", description: "Our advanced algorithms have processed your data" },
                  { icon: Activity, title: "Symptom Detection", description: "We've analyzed potential indicators in your submission" },
                  { icon: FileText, title: "Detailed Report", description: "A comprehensive breakdown of our findings" }
                ].map((item, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.6 + index * 0.1 }}
                    className="bg-green-50 p-4 rounded-lg text-center"
                  >
                    <item.icon className="w-12 h-12 mx-auto mb-4 text-green-600" />
                    <h3 className="text-lg font-semibold mb-2">{item.title}</h3>
                    <p className="text-sm text-gray-600">{item.description}</p>
                  </motion.div>
                ))}
              </div>
              <div className="flex justify-center">
                <Button
                  className="bg-green-600 hover:bg-green-700 text-white px-8 py-3 rounded-full text-lg font-semibold transition-colors"
                  onClick={() => router.push('/')}
                >
                  Analyze Another Image
                </Button>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </motion.div>
  )
}

"use client"

import React, { useState, useRef } from 'react'
import { motion,  } from 'framer-motion'
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Brain, Activity, FileText, ChevronRight, Upload } from 'lucide-react'
import { useRouter,  } from 'next/navigation'



export default function HomePage() {
  const [file, setFile] = useState<File | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisType, setAnalysisType] = useState("spiral");
  const tryItNowRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  // Handle file drop
  const handleFileDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    const droppedFile = e.dataTransfer.files[0];
    if (droppedFile && (droppedFile.type === "image/png" || droppedFile.type === "image/jpeg")) {
      setFile(droppedFile);
    }
  };

  // Handle file input
  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      setFile(selectedFile);
    }
  };

  // Convert base64 to blob


  // Analyze image
  const analyzeImage = async () => {
    if (!file) return;
    setIsAnalyzing(true);

    try {
      const formData = new FormData();
      formData.append("image", file);

      // Send image to the API
      const serverResponse = await fetch(
        `http://127.0.0.1:8000/api/diagnosis?type=${analysisType}`,
        {
          method: "POST",
          body: formData,
        }
      );
      const data = await serverResponse.json();

      

      // Navigate to results page
      router.push(`/results?data=${encodeURIComponent(JSON.stringify(data))}`);
    } catch (error) {
      console.error("Error analyzing image:", error);
    } finally {
      setIsAnalyzing(false);
    }
  };

  // Scroll to section
  const scrollToTryItNow = () => {
    tryItNowRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  // Handle analysis type change
  const handleAnalysisTypeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setAnalysisType(e.target.value);
  };

  return (
    <motion.div 
      initial={{ opacity: 0 }} 
      animate={{ opacity: 1 }} 
      transition={{ duration: 0.5 }}
      className="min-h-screen bg-[#f0fdf4] text-gray-900"
    >
      <header className="bg-white shadow-sm fixed w-full z-10">
        <motion.div 
          initial={{ y: -50 }}
          animate={{ y: 0 }}
          transition={{ type: "spring", stiffness: 100 }}
          className="container mx-auto px-8 py-6 flex justify-between items-center"
        >
          <h1 className="text-3xl font-bold text-green-600">ParkinDetect</h1>
          <nav className="hidden md:flex space-x-8">
            <Button variant="ghost" className="text-lg">About</Button>
            <Button variant="ghost" className="text-lg">Features</Button>
            <Button variant="ghost" className="text-lg">Contact</Button>
            <Button variant="outline" className="text-lg text-green-600 border-green-600">Login</Button>
          </nav>
          <Button variant="outline" className="md:hidden text-lg">Menu</Button>
        </motion.div>
      </header>

      <main className="container mx-auto px-8 pt-32 pb-24">
        <motion.section 
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.8 }}
          className="text-center mb-32"
        >
          <h2 className="text-6xl font-bold mb-8">Revolutionize Parkinson&apos;s Detection</h2>
          <p className="text-2xl mb-12 text-gray-600 max-w-3xl mx-auto">
            Save time and gain insights with ParkinDetect AI-powered symptom analysis system
          </p>


          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Button 
              size="lg" 
              className="bg-green-600 hover:bg-green-700 text-white px-12 py-6 rounded-full text-xl font-semibold"
              onClick={scrollToTryItNow}
            >
              Try it Now
            </Button>
          </motion.div>
        </motion.section>

        <motion.section 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.8 }}
          className="mb-32"
        >
          <h3 className="text-4xl font-bold mb-16 text-center">Key Features</h3>
          <div className="grid md:grid-cols-3 gap-16">
            {[
              { icon: Brain, title: "AI Analysis", description: "Advanced algorithms detect subtle movement patterns" },
              { icon: Activity, title: "Real-time Tracking", description: "Monitor symptoms and progression over time" },
              { icon: FileText, title: "Detailed Reports", description: "Generate comprehensive reports for healthcare providers" }
            ].map((feature, index) => (
              <motion.div
                key={index}
                initial={{ y: 50, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.2 * index, duration: 0.5 }}
              >
                <Card className="bg-white shadow-lg hover:shadow-xl transition-shadow duration-300">
                  <CardContent className="p-8 text-center">
                    <feature.icon className="w-16 h-16 mx-auto mb-6 text-green-600" />
                    <h4 className="text-2xl font-semibold mb-4">{feature.title}</h4>
                    <p className="text-gray-600 text-lg">{feature.description}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.section>

        <motion.section
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6, duration: 0.8 }}
          className="mb-32"
        >
          <h3 className="text-4xl font-bold mb-16 text-center">How ParkinDetect Works</h3>
          <div className="space-y-12">
            {[
              "Upload a video of your hand movements or writing sample",
              "Our AI analyzes the data for Parkinson's indicators",
              "Receive a detailed report of potential symptoms",
              "Share results with your healthcare provider for further evaluation"
            ].map((step, index) => (
              <motion.div
                key={index}
                initial={{ x: -50, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.2 * index, duration: 0.5 }}
                className="flex items-start"
              >
                <div className="bg-green-600 text-white rounded-full w-12 h-12 flex items-center justify-center font-bold mr-6 flex-shrink-0 text-xl">
                  {index + 1}
                </div>
                <p className="text-xl">{step}</p>
              </motion.div>
            ))}
          </div>
        </motion.section>

        <motion.section
          ref={tryItNowRef}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8, duration: 0.8 }}
          className="mb-32"
        >
          <h3 className="text-4xl font-bold mb-16 text-center">Try It Now</h3> <Card className="bg-white shadow-lg p-8">
            <CardContent>
              {/* Select analysis type (spiral or wave) */}
              <div className="mb-8">
                <label className="text-lg font-semibold mb-4">Choose Analysis Type:</label>
                <select
                  value={analysisType}
                  onChange={handleAnalysisTypeChange}
                  className="border border-gray-300 p-2 rounded-lg ml-4"
                >
                  <option value="spiral">Spiral</option>
                  <option value="wave">Wave</option>
                </select>
              </div>

              {/* File drop zone */}
              <div
                className="border-4 border-dashed border-green-300 rounded-2xl p-12 mb-8 text-center cursor-pointer transition-all hover:border-green-500 hover:bg-green-50"
                onDragOver={(e) => e.preventDefault()}
                onDrop={handleFileDrop}
                onClick={() => document.getElementById("fileInput")?.click()}
              >
                {file ? (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.5 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.3 }}
                  >
                    <img
                      src={URL.createObjectURL(file)}
                      alt="Uploaded file preview"
                      className="max-w-full max-h-64 mx-auto mb-4"
                    />
                    <p className="text-xl text-green-600">{file.name}</p>
                    <p className="text-gray-500 mt-2">Click or drag to change file</p>
                  </motion.div>
                ) : (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.3 }}
                  >
                    <Upload className="mx-auto h-16 w-16 mb-4 text-green-600" />
                    <p className="text-2xl text-green-700 mb-2">Drag & drop your image here</p>
                    <p className="text-gray-500">or click to select</p>
                  </motion.div>
                )}
                <input
                  id="fileInput"
                  type="file"
                  accept="image/png,image/jpeg"
                  className="hidden"
                  onChange={handleFileInput}
                />
              </div>

              {/* Analyze button */}
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className="text-center">
                <Button
                  className="bg-green-600 hover:bg-green-700 text-white px-12 py-4 rounded-full text-xl font-semibold inline-flex items-center"
                  onClick={analyzeImage}
                  disabled={!file || isAnalyzing}
                >
                  {isAnalyzing ? "Analyzing..." : "Analyze Image"}
                  <ChevronRight className="ml-2 h-6 w-6" />
                </Button>
              </motion.div>
            </CardContent>
          </Card>
        </motion.section>
      </main>

      <footer className="bg-gray-200 p-4 text-center">
        <p className="text-gray-700">© 2024 Parkinson&apos;s Analysis. All rights reserved.</p>
      </footer>

    </motion.div>
  )
}

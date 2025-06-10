import React from 'react'
import { Link } from 'react-router-dom'

const LandingPage: React.FC = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-white to-blue-50 px-4">
      <div className="flex flex-col items-center space-y-6 text-center">
        <h1 className="text-4xl md:text-5xl font-bold text-primary-700">Welcome to Volta CRM</h1>
        <p className="text-lg text-gray-600 max-w-md">Your lightweight, powerful CRM platform. Beautiful. Fast. Modular.</p>
        <Link to="/login">
          <button className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-8 rounded-full transition-transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50">
            Get Started
          </button>
        </Link>
      </div>
    </div>
  )
}

export default LandingPage

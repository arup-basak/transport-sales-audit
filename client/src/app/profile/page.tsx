import React from 'react'
import { User, Mail, Phone, MapPin, Briefcase, Calendar } from 'lucide-react'

const Page = () => {
  const profileInfo = [
    { Icon: User, text: 'Ranjith Kumar Manian' },
    { Icon: Mail, text: 'sample@email.com' },
    { Icon: Phone, text: '+91 (555) 789-0123' },
    { Icon: MapPin, text: 'Chicago, IL' },
    { Icon: Briefcase, text: 'Speedy Logistics Inc.' },
    { Icon: Calendar, text: 'Joined March 2015' },
  ]

  const skills = ['Fleet Management', 'Sales Auditing', 'Logistics', 'Supply Chain']

  return (
    <main className="bg-gray-100 dark:bg-gray-900 min-h-screen p-8">
      <div className="max-w-2xl mx-auto bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden">
        <div className="bg-gray-800 dark:bg-gray-700 text-white p-6">
          <h1 className="text-3xl font-bold mb-2">Sarah Johnson</h1>
          <p className="text-gray-300">Transport Operations Manager</p>
        </div>
        <div className="p-6">
          {profileInfo.map(({ Icon, text }, index) => (
            <div key={index} className="flex items-center mb-4">
              <Icon className="w-5 h-5 mr-3 text-gray-600 dark:text-gray-400" />
              <span className="dark:text-gray-300">{text}</span>
            </div>
          ))}
          <div className="flex flex-wrap gap-2">
            {skills.map((skill, index) => (
              <span key={index} className="bg-gray-800 dark:bg-gray-700 text-white px-3 py-1 rounded-full text-sm">
                {skill}
              </span>
            ))}
          </div>
        </div>
      </div>
    </main>
  )
}

export default Page
import React, { useContext, useState, useEffect } from 'react'
import { ShopContext } from '../context/ShopContext'
import axios from 'axios'
import { toast } from 'react-toastify'
import { assets } from '../assets/assets'

// Icon Component
const Icon = ({ children }) => (
  <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    {children}
  </svg>
)

const MailIcon = () => <Icon><path d="M4 4h16v16H4z" /><polyline points="22,6 12,13 2,6" /></Icon>
const PhoneIcon = () => <Icon><path d="M22 16.92v3a2 2 0 0 1-2.18 2A19.79 19.79 0 0 1 11 18" /><path d="M11 6a12.84 12.84 0 0 0 .7 2.81" /></Icon>
const MapPinIcon = () => <Icon><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" /><circle cx="12" cy="10" r="3" /></Icon>

const Contact = () => {
  const { backendUrl } = useContext(ShopContext)
  const [form, setForm] = useState({ name: '', email: '', concern: '' })
  const [isSubmitted, setIsSubmitted] = useState(false)

  const onSubmit = async (e) => {
    e.preventDefault()
    try {
      const res = await axios.post(backendUrl + '/api/contact/submit', form)
      if (res.data.success) {
        toast.success('Message sent')
        setIsSubmitted(true)
        setForm({ name: '', email: '', concern: '' })
        setTimeout(() => setIsSubmitted(false), 3000)
      } else toast.error(res.data.message)
    } catch (err) {
      toast.error('Failed to send message')
    }
  }

  const contactInfo = [
    { icon: <MailIcon />, text: 'admin@forever.com' },
    { icon: <PhoneIcon />, text: '+91 9876543210' },
    { icon: <MapPinIcon />, text: 'Chitkara University, Rajpura, India' },
  ]

  return (
    <div className="font-sans bg-gray-50 min-h-screen flex items-center justify-center p-4">
      <main className="w-full max-w-6xl mx-auto">
        <div className="relative bg-white rounded-3xl shadow-2xl overflow-hidden grid md:grid-cols-2">

          {/* Left Info Section */}
          <div className="relative p-10 bg-gradient-to-br from-gray-900 to-gray-800 text-white">
            <h1 className="text-4xl font-bold mb-4">Let's Talk Style.</h1>
            <p className="text-gray-300 mb-10">Have a question or business inquiry? Reach out — we’d love to connect.</p>

            <div className="space-y-6">
              {contactInfo.map((item, i) => (
                <div key={i} className="flex items-center gap-4">
                  <div className="bg-white/10 p-3 rounded-xl">{item.icon}</div>
                  <span className="text-lg">{item.text}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Right Form Section */}
          <div className="p-10">
            <h2 className="text-3xl font-bold text-gray-800 mb-6">Send Us a Message</h2>

            {isSubmitted ? (
              <div className="text-center p-6 bg-green-50 rounded-xl text-green-700 font-semibold">
                ✅ Message Sent Successfully!
              </div>
            ) : (
              <form onSubmit={onSubmit} className="space-y-6">

                <input
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  className="w-full border border-gray-300 rounded-lg px-4 py-3 bg-gray-100 focus:bg-white focus:border-black outline-none transition"
                  placeholder="Your Name"
                  required
                />

                <input
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  type="email"
                  className="w-full border border-gray-300 rounded-lg px-4 py-3 bg-gray-100 focus:bg-white focus:border-black outline-none transition"
                  placeholder="Your Email"
                  required
                />

                <textarea
                  value={form.concern}
                  onChange={(e) => setForm({ ...form, concern: e.target.value })}
                  className="w-full border border-gray-300 rounded-lg px-4 py-3 bg-gray-100 focus:bg-white focus:border-black outline-none transition h-28 resize-none"
                  placeholder="Your Message"
                  required
                />

                <button type="submit" className="w-full bg-gray-900 text-white py-3 rounded-lg font-bold hover:bg-rose-600 transition">
                  Send Message
                </button>

              </form>
            )}
          </div>
        </div>
      </main>
    </div>
  )
}

export default Contact

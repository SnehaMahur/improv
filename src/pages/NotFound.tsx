import { Link } from 'react-router-dom'

export default function NotFound() {
  return (
    <main className="flex-1 overflow-y-auto max-w-2xl mx-auto w-full px-6 py-32 text-center">
      <p className="label-sm mb-4">404</p>
      <h1 className="font-serif font-medium text-3xl mb-6">Lost chapter.</h1>
      <p className="text-gray-500 mb-10">This page doesn't exist — but a good story might.</p>
      <Link to="/" className="btn-primary">Back to Home</Link>
    </main>
  )
}

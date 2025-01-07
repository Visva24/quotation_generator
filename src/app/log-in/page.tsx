"use client"

import { useRouter } from "next/navigation";


export default function LoginPage() {
  const router = useRouter();
  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <div className="w-full max-w-sm p-6 bg-white shadow-md">
        <h1 className="text-2xl font-bold text-center mb-4">Login</h1>
        <form>
          <div className="mb-4">
            <label className="block text-sm font-medium mb-1" htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              className="w-full px-3 py-2 border rounded-md"
              placeholder="Enter your email"
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium mb-1" htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              className="w-full px-3 py-2 border rounded-md"
              placeholder="Enter your password"
            />
          </div>
          <button type="submit" className="w-full bg-blue-500 text-white py-2 rounded-md" onClick={()=>router.push("/home")}>
            Log In
          </button>
        </form>
      </div>
    </div>
  );
}

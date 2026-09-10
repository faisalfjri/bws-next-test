"use client";

import Link from "next/link";
import { motion } from "motion/react";

const methods = [
  {
    href: "/fetch",
    title: "Native Fetch",
    description: "Menggunakan fetch() API bawaan browser",
    color: "bg-gray-100 text-gray-700",
  },
  {
    href: "/axios",
    title: "Axios",
    description: "Menggunakan axios untuk HTTP request",
    color: "bg-blue-50 text-blue-700",
  },
  {
    href: "/query",
    title: "React Query",
    description: "Menggunakan @tanstack/react-query dengan infinite query",
    color: "bg-green-50 text-green-700",
  },
];

export default function Home() {
  return (
    <main className="min-h-screen bg-white">
      <motion.section
        className="mx-auto max-w-3xl px-4 sm:px-6 pt-20 sm:pt-32 pb-16 text-center"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-3xl sm:text-5xl font-bold tracking-tight text-gray-900">
          Perbandingan Data Fetching
        </h1>
        <p className="mt-4 text-sm sm:text-base text-gray-500">
          3 cara berbeda mengambil data dari API dengan infinite scroll
        </p>
      </motion.section>

      <section className="mx-auto max-w-3xl px-4 sm:px-6 pb-20">
        <div className="space-y-4">
          {methods.map((method, index) => (
            <motion.div
              key={method.href}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
            >
              <Link
                href={method.href}
                className="group flex items-center gap-4 rounded-2xl border border-gray-100 bg-gray-50 p-5 transition-all duration-300 hover:shadow-[0_4px_20px_-4px_rgba(0,0,0,0.08)]"
              >
                <span className={`inline-flex items-center justify-center w-12 h-12 rounded-xl text-sm font-semibold ${method.color}`}>
                  {method.title.charAt(0)}
                </span>
                <div className="flex-1">
                  <h2 className="text-base font-semibold text-gray-900 group-hover:text-gray-600 transition-colors">
                    {method.title}
                  </h2>
                  <p className="text-sm text-gray-500">{method.description}</p>
                </div>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 text-gray-400 group-hover:text-gray-600 transition-colors"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                </svg>
              </Link>
            </motion.div>
          ))}
        </div>
      </section>
    </main>
  );
}

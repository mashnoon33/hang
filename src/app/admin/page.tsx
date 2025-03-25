"use client";

export default function AdminPage() {
  return (
    <main className="flex flex-col items-center justify-center bg-gray-100 px-4 py-16 text-center">
      <div className="max-w-3xl">
        <h1 className="mb-6 text-5xl font-bold tracking-tight text-gray-900 sm:text-6xl">
          Admin Dashboard
        </h1>
        <p className="mb-8 text-gray-600">
          Welcome to the admin dashboard. Here you can manage the application
          settings and user data.
        </p>
        <div className="flex justify-center gap-4"></div>
      </div>
    </main>
  );
}

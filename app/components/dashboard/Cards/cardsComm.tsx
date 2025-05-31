
function CardsComm() {
  const stats = [
    { label: 'Total Users', value: 1200 },
    { label: 'Active Sessions', value: 345 },
    { label: 'Pending Approvals', value: 23 },
    { label: 'Reports', value: 7 }
  ]
  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
        {stats.map((stat, idx) => (
          <div
            key={idx}
            className="rounded-2xl p-6 bg-white dark:bg-gray-900 shadow-md hover:shadow-xl transition-shadow duration-300 border border-gray-200 dark:border-gray-700"
          >
            <p className="text-sm text-gray-500 dark:text-gray-400 uppercase tracking-wide font-medium">
              {stat.label}
            </p>
            <p className="text-3xl font-extrabold mt-3">
              {stat.value.toLocaleString()}
            </p>
            <div className="mt-2 h-1 w-10 bg-indigo-500 rounded-full" />
          </div>
        ))}
      </div>
    </>
  )
}

export default CardsComm
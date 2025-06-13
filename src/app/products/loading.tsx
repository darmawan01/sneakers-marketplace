export default function ProductsLoading() {
  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <div className="h-8 w-48 bg-gray-200 rounded animate-pulse"></div>
        <div className="flex gap-4">
          {[1, 2, 3, 4].map((i) => (
            <div
              key={i}
              className="h-10 w-24 bg-gray-200 rounded-full animate-pulse"
            ></div>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
          <div key={i} className="bg-white rounded-lg shadow-md overflow-hidden">
            <div className="h-64 bg-gray-200 animate-pulse"></div>
            <div className="p-4 space-y-2">
              <div className="h-4 w-3/4 bg-gray-200 rounded animate-pulse"></div>
              <div className="h-4 w-1/2 bg-gray-200 rounded animate-pulse"></div>
              <div className="h-4 w-1/4 bg-gray-200 rounded animate-pulse"></div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
} 
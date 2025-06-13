export default function ProductsLoading() {
  return (
    <div className="space-y-8 min-h-screen py-8">
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
          <div key={i} className="bg-white rounded-lg shadow-md overflow-hidden flex flex-col h-full w-52">
            <div className="relative h-64 bg-gray-200 animate-pulse"></div>
            <div className="p-4 flex flex-col flex-1 justify-between">
              <div>
                <div className="h-6 w-3/4 bg-gray-200 rounded animate-pulse mb-1"></div>
                <div className="h-5 w-1/2 bg-gray-200 rounded animate-pulse mb-2"></div>
              </div>
              <div className="flex justify-between items-center mt-auto">
                <div className="h-5 w-16 bg-gray-200 rounded animate-pulse"></div>
                <div className="h-4 w-12 bg-gray-200 rounded animate-pulse"></div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
} 
export default function ProductDetailLoading() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
      <div className="relative h-[500px] w-[500px] rounded-lg overflow-hidden bg-gray-200 animate-pulse"></div>

      <div className="space-y-6">
        <div>
          <div className="h-10 w-3/4 bg-gray-200 rounded animate-pulse mb-2"></div>
          <div className="h-7 w-1/2 bg-gray-200 rounded animate-pulse"></div>
        </div>

        <div className="h-8 w-24 bg-gray-200 rounded animate-pulse"></div>

        <div>
          <div className="h-6 w-32 bg-gray-200 rounded animate-pulse mb-2"></div>
          <div className="h-4 w-full bg-gray-200 rounded animate-pulse"></div>
        </div>

        <div>
          <div className="h-6 w-32 bg-gray-200 rounded animate-pulse mb-2"></div>
          <div className="flex gap-2">
            {[1, 2, 3, 4, 5].map((i) => (
              <div
                key={i}
                className="w-8 h-8 bg-gray-200 rounded-full border border-gray-300 animate-pulse"
              ></div>
            ))}
          </div>
        </div>

        <div className="h-12 w-full bg-gray-200 rounded-md animate-pulse mt-4"></div>
      </div>
    </div>
  )
} 
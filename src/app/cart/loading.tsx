export default function CartLoading() {
  return (
    <div className="space-y-8">
      <h1 className="text-2xl font-bold">Your Cart</h1>
      
      <div className="space-y-4">
        {[1, 2, 3].map((i) => (
          <div key={i} className="flex gap-4 p-4 bg-white rounded-lg shadow-sm">
            <div className="w-24 h-24 bg-gray-200 rounded-md animate-pulse"></div>
            <div className="flex-1 space-y-2">
              <div className="h-6 w-3/4 bg-gray-200 rounded animate-pulse"></div>
              <div className="h-4 w-1/2 bg-gray-200 rounded animate-pulse"></div>
              <div className="flex justify-between items-center">
                <div className="h-6 w-20 bg-gray-200 rounded animate-pulse"></div>
                <div className="h-8 w-24 bg-gray-200 rounded animate-pulse"></div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="border-t pt-4">
        <div className="flex justify-between items-center mb-4">
          <div className="h-6 w-32 bg-gray-200 rounded animate-pulse"></div>
          <div className="h-6 w-24 bg-gray-200 rounded animate-pulse"></div>
        </div>
        <div className="h-12 w-full bg-gray-200 rounded-md animate-pulse"></div>
      </div>
    </div>
  )
} 
export const Loading = () => (
  <div className="
    fixed top-[50%] left-[50%] z-40 grid max-w-[calc(100%-2rem)] 
    translate-x-[-50%] 
    translate-y-[-50%] 
    gap-4 rounded-lg border p-6 shadow-lg duration-200">
    <div className="flex flex-col gap-2 items-center">
      <div className="relative w-16 h-16">
        <div className="absolute inset-0 animate-spin rounded-full bg-primary/10 border-4 border-t-transparent"></div>
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-6 h-6 bg-primary rounded-full animate-pulse"></div>
        </div>
      </div>
      <p className="text-sm text-gray-500">Cargando ...</p>
    </div>
  </div>
);
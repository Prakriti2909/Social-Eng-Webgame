export default function AttackerPage() {
  return (
    <div className="min-h-screen bg-black flex flex-col items-center 
                    justify-center text-center px-4">
      <div className="border border-red-800 rounded-xl p-12 max-w-md">
        <div className="text-red-500 text-6xl mb-6">⚠</div>
        <h1 className="text-white text-3xl font-bold mb-4">
          Attacker Interface
        </h1>
        <p className="text-gray-400 mb-6">
          This module is restricted to authorized users only. 
          Academic use under faculty supervision.
        </p>
        <div className="bg-red-950 border border-red-800 rounded-lg p-4">
          <p className="text-red-400 text-sm">
            Coming soon — requires faculty authorization
          </p>
        </div>
      </div>
    </div>
  )
}
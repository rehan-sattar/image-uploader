function App() {
  return (
    <div className="bg-gray-100 h-screen">
      <div className="h-full w-full flex justify-center items-center">
        <div className="h-96 w-96 bg-white rounded-lg shadow-md">
          <div className="h-full flex flex-col py-8 px-6 justify-between items-center">
            <div className="mx-auto text-center">
              <h1 className="text-xl">Upload Your Image</h1>
              <div className="mt-3 text-sm text-gray-500">
                File should be png or jpg
              </div>
            </div>
            <div className="h-full w-full border-2 rounded border-dashed my-6 bg-gray-100"></div>
            <div className="text-sm">Or</div>
            <button className="text-white text-sm hover:bg-blue-300 shadow-md bg-blue-400 rounded py-2 px-4 mt-4">
              Choose File
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;

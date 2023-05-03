export const Loader = ({ type }) => {
    return (
        <div className="fixed z-50 inset-0 overflow-y-auto">
            <div className="flex items-center justify-center min-h-screen">
                <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
                <div className="relative z-10 bg-white p-4 rounded-lg text-center">
                    <h2 className="text-gray-900 font-semibold mb-2">{type}...</h2>
                    <div className="inline-flex">
                        <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-cyan-900"></div>
                    </div>
                </div>
            </div>
        </div>
    );
};

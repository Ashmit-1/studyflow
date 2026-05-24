// Toast.js
export default function Toast({ message, onClose }) {
    if (!message) return null;

    return (
        <div className="fixed bottom-4 right-4 bg-red-500 text-white px-4 py-2 rounded-lg shadow-lg flex items-center">
            <span>{message}</span>
            <button
                onClick={onClose}
                className="ml-3 text-sm underline hover:text-gray-200"
            >
                Close
            </button>
        </div>
    );
}

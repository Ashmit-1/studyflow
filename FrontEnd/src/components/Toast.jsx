import styles from "../styles/components/toast.module.css";
export default function Toast({ message, onClose }) {
    if (!message) return null;

    return (
        <div className={styles.toast}>
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

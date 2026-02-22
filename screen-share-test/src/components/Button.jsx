function Button({ children, onClick, disabled }) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      className={`
        px-6 py-3 rounded-xl font-semibold text-white
        bg-blue-600 hover:bg-blue-700
        transition-all duration-300
        shadow-lg hover:shadow-blue-500/40
        active:scale-95
        disabled:opacity-50 disabled:cursor-not-allowed
      `}
    >
      {children}
    </button>
  );
}

export default Button;
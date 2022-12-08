function Button({ children }) {
  return (
    <div>
      <button
        type="button"
        className="bg-yellow-500 mt-2 p-1 inline-block text-white text-center"
      >
        {children}
      </button>
    </div>
  );
}

export default Button;

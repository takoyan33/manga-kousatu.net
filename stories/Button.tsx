function Button({ children }) {
  return (
    <div>
      <button type='button' className='mt-2 inline-block bg-yellow-500 p-1 text-center text-white'>
        {children}
      </button>
    </div>
  )
}

export default Button

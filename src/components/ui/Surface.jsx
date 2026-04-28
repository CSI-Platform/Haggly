function Surface({ children, className = '' }) {
  return (
    <div className={`rounded-lg border border-stone-200 bg-white shadow-sm shadow-stone-900/5 ${className}`}>
      {children}
    </div>
  )
}

export default Surface

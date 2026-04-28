const variantClasses = {
  primary: 'bg-primary-700 text-white hover:bg-primary-800 shadow-sm shadow-primary-900/15',
  secondary: 'border border-primary-200 bg-white text-primary-900 hover:border-primary-300 hover:bg-primary-50',
  ghost: 'text-primary-800 hover:bg-primary-50',
  muted: 'bg-primary-50 text-primary-800 hover:bg-primary-100',
}

const sizeClasses = {
  sm: 'h-9 px-3 text-sm',
  md: 'h-11 px-4 text-sm',
  lg: 'min-h-14 px-5 py-3 text-base',
}

function Button({
  children,
  className = '',
  variant = 'primary',
  size = 'md',
  type = 'button',
  ...props
}) {
  return (
    <button
      type={type}
      className={[
        'inline-flex items-center justify-center gap-2 rounded-lg font-semibold transition',
        'focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-500',
        'disabled:cursor-not-allowed disabled:opacity-65',
        variantClasses[variant],
        sizeClasses[size],
        className,
      ].join(' ')}
      {...props}
    >
      {children}
    </button>
  )
}

export default Button

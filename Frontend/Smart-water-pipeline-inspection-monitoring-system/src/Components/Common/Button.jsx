const Button = ({
  children,
  variant = "primary",
  href = "#",
  className = "",
}) => {
  const base =
    "inline-flex items-center justify-center gap-2 rounded-xl px-6 py-3 text-sm font-semibold transition-all duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2";
  const variants = {
    primary:
      "bg-blue-600 text-white shadow-md shadow-blue-600/20 hover:-translate-y-0.5 hover:bg-blue-700 hover:shadow-lg",
    secondary:
      "border border-slate-200 bg-white text-slate-700 hover:-translate-y-0.5 hover:border-blue-300 hover:text-blue-600 hover:shadow-md",
    ghost: "text-slate-700 hover:bg-slate-100 hover:text-blue-600",
    light:
      "bg-white text-blue-700 shadow-md hover:-translate-y-0.5 hover:bg-blue-50 hover:shadow-lg",
  };
  return (
    <a href={href} className={`${base} ${variants[variant]} ${className}`}>
      {children}
    </a>
  );
};
export default Button;
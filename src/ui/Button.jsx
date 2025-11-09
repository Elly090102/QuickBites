export default function Button({children, variant="solid", className="", ...props}){
  const base = variant==="ghost" ? "btn-ghost" : "btn";
  return <button className={`${base} ${className}`} {...props}>{children}</button>;
}

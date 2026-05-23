import clsx from "clsx";

interface SelectProps
  extends React.SelectHTMLAttributes<HTMLSelectElement> {}

export default function Select({
  className,
  children,
  ...props
}: SelectProps) {
  return (
    <select
      className={clsx(
        "soft-input",
        className
      )}
      {...props}
    >
      {children}
    </select>
  );
}
import clsx from "clsx";

interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {}

export default function Input({
  className,
  ...props
}: InputProps) {
  return (
    <input
      className={clsx(
        "soft-input",
        className
      )}
      {...props}
    />
  );
}
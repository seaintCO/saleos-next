import clsx from "clsx";

interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary";
}

export default function Button({
  variant = "primary",
  className,
  ...props
}: ButtonProps) {
  return (
    <button
      className={clsx(
        "px-5 py-3 rounded-2xl text-sm font-semibold transition-all duration-200",
        variant === "primary" &&
          "bg-white text-black hover:bg-zinc-200",
        variant === "secondary" &&
          "bg-zinc-950 border border-zinc-800 hover:bg-zinc-900 text-white",
        className
      )}
      {...props}
    />
  );
}
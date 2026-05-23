import clsx from "clsx";

interface TextareaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {}

export default function Textarea({
  className,
  ...props
}: TextareaProps) {
  return (
    <textarea
      className={clsx(
        "soft-input",
        className
      )}
      {...props}
    />
  );
}
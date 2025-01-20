import { Button as BaseButton, type ButtonProps } from "@/components/ui/button"

export function Button({ className, ...props }: ButtonProps) {
  return <BaseButton className={`bg-blue-600 text-white hover:bg-blue-700 ${className}`} {...props} />
}


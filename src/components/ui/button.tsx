import {
  Button as ButtonPrimitive,
  type ButtonProps as ButtonPrimitiveProps,
  composeRenderProps,
} from "react-aria-components"
import { tv } from "tailwind-variants"

import { focusButtonStyles } from "./primitive"

const buttonStyles = tv({
  extend: focusButtonStyles,
  base: [
    "kbt32x border relative flex items-center justify-center gap-x-2 font-medium",
    "forced-colors:[--button-icon:ButtonText] forced-colors:data-hovered:[--button-icon:ButtonText]",
    "*:data-[slot=icon]:-mx-0.5 *:data-[slot=icon]:my-1 *:data-[slot=icon]:size-4 *:data-[slot=icon]:shrink-0 *:data-[slot=icon]:text-current/60",
  ],
  variants: {
    intent: {
      primary: [
        "outline-primary [--btn-bg:theme(--color-primary/95%)] dark:[--btn-bg:theme(--color-primary/90%)] [--btn-fg:var(--color-primary-fg)] [--btn-border:var(--color-primary)]",
        "[--btn-bg-hovered:theme(--color-primary/87%)] [--btn-border-hovered:theme(--color-primary/87%)] dark:[--btn-bg-hovered:theme(--color-primary)] dark:[--btn-border-hovered:theme(--color-primary)]",
        "inset-shadow-primary-fg/20 data-hovered:inset-shadow-primary-fg/25 data-pressed:inset-shadow-primary-fg/20",
      ],
      secondary: [
        "[--btn-bg:theme(--color-secondary/95%)] dark:[--btn-bg:theme(--color-secondary/85%)] [--btn-fg:var(--color-secondary-fg)] [--btn-border:theme(--color-secondary-fg/10%)] dark:[--btn-border:theme(--color-secondary-fg/15%)]",
        "[--btn-bg-hovered:color-mix(in_oklab,var(--color-secondary)_60%,white_20%)] dark:[--btn-bg-hovered:color-mix(in_oklab,var(--color-secondary)_95%,white_5%)]",
        "inset-shadow-white/20 data-hovered:inset-shadow-white/25 data-pressed:inset-shadow-white/20",
      ],
      warning: [
        "[--btn-warning:theme(--color-warning/97%)]",
        "[--btn-warning-hovered:color-mix(in_oklab,var(--color-warning)_85%,white_15%)]",
        "dark:[--btn-warning-hovered:color-mix(in_oklab,var(--color-warning)_90%,white_10%)]",
        "outline-warning [--btn-bg:var(--btn-warning)] [--btn-fg:var(--color-warning-fg)] [--btn-border:var(--btn-warning)]",
        "[--btn-bg-hovered:var(--btn-warning-hovered)] [--btn-border-hovered:var(--btn-warning-hovered)]",
        "inset-shadow-white/25 data-hovered:inset-shadow-white/30 data-pressed:inset-shadow-white/25",
      ],
      danger: [
        "outline-danger [--btn-bg:var(--color-danger)] dark:[--btn-bg:var(--color-danger)] [--btn-fg:var(--color-danger-fg)] [--btn-border:var(--color-danger)]",
        "[--btn-danger-hovered:color-mix(in_oklab,var(--color-danger)_93%,white_7%)]",
        "dark:[--btn-danger-hovered:color-mix(in_oklab,var(--color-danger)_96%,white_4%)]",
        "[--btn-bg-hovered:var(--btn-danger-hovered)] [--btn-border-hovered:var(--btn-danger-hovered)]",
        "inset-shadow-danger-fg/30 data-hovered:inset-shadow-danger-fg/35 data-pressed:inset-shadow-danger-fg/30",
      ],
    },
    appearance: {
      solid: [
        "dark:border-0 inset-ring-0 dark:inset-ring",
        "inset-shadow-2xs bg-(--btn-bg) text-(--btn-fg) border-(--btn-border) inset-ring-(--btn-border)",
        "data-hovered:bg-(--btn-bg-hovered) data-hovered:ring-(--btn-border-hovered) data-hovered:*:data-[slot=icon]:text-current/90",
        "data-pressed:bg-(--btn-bg) data-pressed:border-(--btn-border) data-pressed:*:data-[slot=icon]:text-current",
      ],
      outline: ["border data-hovered:bg-secondary data-pressed:bg-secondary"],
      plain: ["border-transparent data-hovered:bg-secondary data-pressed:bg-secondary"],
    },
    size: {
      "extra-small": "h-8 px-[calc(var(--spacing)*2.7)] text-xs/4 lg:text-[0.800rem]/4",
      small: "h-9  px-3.5 text-sm/5 sm:text-sm/5",
      medium: "h-10 px-4 text-base sm:text-sm/6",
      large:
        "*:data-[slot=icon]:mx-[-1.5px] h-11 px-4.5 text-base lg:text-base/7 sm:*:data-[slot=icon]:size-5",
      "square-petite": "size-9 shrink-0 **:data-[slot=icon]:text-current",
    },
    shape: {
      square: "rounded-lg",
      circle: "rounded-full",
    },
    isDisabled: {
      false: "forced-colors:data-disabled:text-[GrayText] cursor-pointer",
      true: "cursor-default ring-0 dark:inset-ring-0 border-0 inset-shadow-none opacity-50 forced-colors:data-disabled:text-[GrayText]",
    },
    isPending: {
      true: "cursor-default opacity-50",
    },
  },
  defaultVariants: {
    intent: "primary",
    appearance: "solid",
    size: "medium",
    shape: "square",
  },
})

interface ButtonProps extends ButtonPrimitiveProps {
  intent?: "primary" | "secondary" | "danger" | "warning"
  size?: "medium" | "large" | "square-petite" | "extra-small" | "small"
  shape?: "square" | "circle"
  appearance?: "solid" | "outline" | "plain"
  ref?: React.Ref<HTMLButtonElement>
}

const Button = ({ className, intent, appearance, size, shape, ref, ...props }: ButtonProps) => {
  return (
    <ButtonPrimitive
      ref={ref}
      {...props}
      className={composeRenderProps(className, (className, renderProps) =>
        buttonStyles({
          ...renderProps,
          intent,
          appearance,
          size,
          shape,
          className,
        }),
      )}
    >
      {(values) => (
        <>{typeof props.children === "function" ? props.children(values) : props.children}</>
      )}
    </ButtonPrimitive>
  )
}

export type { ButtonProps }
export { Button, ButtonPrimitive, buttonStyles }

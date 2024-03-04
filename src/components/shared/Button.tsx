import type { ButtonHTMLAttributes, AnchorHTMLAttributes } from 'react'
import Link from 'next/link'
import clsx from 'clsx'

const styles = {
  base: 'text-sm py-4 px-6 duration-200 flex gap-1 justify-center whitespace-nowrap items-center rounded-full disabled:cursor-not-allowed',
  default:
    'bg-[#F9FAFE] text-[#7E88C3] hover:bg-light-gray focus-visible:bg-light-gray disabled:bg-light-gray dark:text-light-gray dark:bg-[#252945] dark:hover:bg-white dark:focus-visible:bg-white dark:disabled:bg-white',
  red: 'bg-[#EC5757] text-white hover:bg-[#FF9797] focus-visible:bg-[#FF9797] disabled:bg-[#FF9797]',
  dark: 'bg-grayish-blue text-gray hover:bg-[#0C0E16] focus-visible:bg-[#0C0E16] disabled:bg-[#0C0E16] dark:text-light-gray dark:hover:bg-dark-grayish-blue dark:focus-visible:bg-dark-grayish-blue dark:disabled:bg-dark-grayish-blue',
  white:
    'bg-[#F9FAFE] text-[#7E88C3] hover:bg-light-gray focus-visible:bg-light-gray disabled:bg-light-gray',
  purple:
    'bg-purple text-white hover:bg-light-purple focus-visible:bg-light-purple disabled:bg-light-purple'
}
interface StyleProps {
  full?: boolean
  variant?: 'default' | 'red' | 'dark' | 'white' | 'purple'
}

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  href?: undefined
}

type AnchorProps = AnchorHTMLAttributes<HTMLAnchorElement> & {
  href: string
}

const hasHref = (props: ButtonProps | AnchorProps): props is AnchorProps => 'href' in props

interface Overload {
  (props: ButtonProps & StyleProps): JSX.Element
  (props: AnchorProps & StyleProps): JSX.Element
}

export const Button: Overload = ({ className, variant = 'default', full, ...props }) => {
  const btnStyles = clsx(styles.base, styles[variant], full && 'w-full', className)

  const componentProps = { className: btnStyles, ...props }

  if (hasHref(componentProps)) {
    return <Link {...componentProps} href={componentProps.href} />
  }

  return <button {...componentProps} />
}

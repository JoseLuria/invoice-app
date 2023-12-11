import type { FC } from 'react'
import clsx from 'clsx'

export interface Props {
  className?: string
  status: 'paid' | 'pending' | 'draft'
}

const BTN_STATUS = {
  paid: 'bg-[#33D69F] text-[#33D69F] bg-opacity-[0.05]',
  pending: 'bg-[#FF8F00] text-[#FF8F00] bg-opacity-[0.05]',
  draft:
    'bg-[#373B53] text-[#373B53] bg-opacity-[0.05] dark:bg-opacity-[0.05] dark:bg-light-gray dark:text-light-gray'
}

const BTN_ICON = {
  paid: 'bg-[#33D69F]',
  pending: 'bg-[#FF8F00]',
  draft: 'bg-[#373B53] dark:bg-light-gray'
}

export const StatusLabel: FC<Props> = ({ status, className }) => {
  return (
    <span
      className={clsx(
        'p-3 w-[104px] flex items-center justify-center gap-2 rounded-md',
        BTN_STATUS[status],
        className
      )}
    >
      <span className={clsx('w-2 h-2 rounded-full', BTN_ICON[status])} />
      {status}
    </span>
  )
}

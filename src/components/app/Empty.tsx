import { IllustrationEmpty } from '@/components'

export const Empty = () => {
  return (
    <section className='m-auto flex flex-col items-center text-center'>
      <IllustrationEmpty />

      <h2 className='font-semibold text-xl mt-10 mb-6'>There is nothing here</h2>

      <p className='duration-200 text-gray dark:text-light-gray'>
        Create an invoice by clicking <br />
        the <strong>New</strong> button and get started
      </p>
    </section>
  )
}

import { headers } from 'next/headers'
import { InvoiceList, Header } from '@/components'
import { MOBILE_REGEX } from '@/contants'

const Home = () => {
  const userAgent = headers().get('user-agent') ?? ''
  const isMobile = MOBILE_REGEX.test(userAgent)

  return (
    <>
      <Header isMobile={isMobile} />
      <InvoiceList />
    </>
  )
}

export default Home

import Header from '../header/header';
import Footer from '../footer/footer';

type MainLayoutProps = {
  children: JSX.Element | JSX.Element[]
}

export default function MainLayout({children}: MainLayoutProps): JSX.Element {
  return (
    <>
      <Header />
        {children}
      <Footer />
    </>
  )
}

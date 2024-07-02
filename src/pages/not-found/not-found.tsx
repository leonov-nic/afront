import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import './not-found.css';

export default function NotFound(): JSX.Element {
  return (
    <div className="page page--gray page--main">
      <Helmet>
        <title>404</title>
      </Helmet>
      <main>
        <div className="container not-found">
          <h1 className="not-found__title">
            <span>404</span>
            <b>Not Found</b>
          </h1>
          <Link className="header__logo-link not-found__link" to="/">To Main Page</Link>
        </div>
      </main>
    </div>
  );
}

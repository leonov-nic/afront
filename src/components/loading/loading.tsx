import ClipLoader from 'react-spinners/ClipLoader';
import { CSSProperties } from 'react';

function Loading(): JSX.Element {

  const override: CSSProperties = {
    display: 'block',
    margin: '10% auto',
    borderColor: '#17c1bc',
    borderWidth: '5px',
  };

  return (
    <main className="page__main page__main--index">
      <div className="container">
        <ClipLoader size={120} aria-label="Loading Spinner" data-testid="loader" cssOverride={override}/>
      </div>
    </main>
  );
}

export default Loading;

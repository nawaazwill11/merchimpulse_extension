import React from 'react';
import './styles.scss';

function Layout({ navigate, noheader, noback, children }) {

  const header_element = function () {

    const back_element = (
      <div className="hp abs top3 left0 padding1 back underline" onClick={(e) => handleBackClick(navigate)}>
        Back
      </div>
    );

    const back = noback ? '' : 'back_element';

    return (
      <React.Fragment>
        <header className="hp flex h-center padding_5">
          <img src="/logo.svg" alt="logo" />
        </header>
        {/* {back} */}
      </React.Fragment>
    );
  }();

  const header = noheader ? '' : header_element;

  return (
    <div className="hp col flex-column">
      {header}
      <main className="hp rel flex-column flex1">
        {children}
      </main>
    </div>
  );

}


function handleBackClick(navigate) {

  console.log(navigate);

  navigate.back();

}

export { Layout };
import React from 'react';
import './styles.scss';

function Layout(props) {

  const navigate = props.navigate;

  const header_element = function (noback) {
    
    const back_element = (
      <div className="hp abs top3 left_0 padding1 back underline" onClick={(e) => handleBackClick(navigate)}>
          Back
      </div>
    );

    const back = noback ? '' : back_element;
    
    return (
      <React.Fragment>
        <header className="hp flex h-center padding_5">
          <img src="/logo.svg" alt="logo" />
        </header>
        {back}
      </React.Fragment>
    );
  }(props.noback);

  const header = props.noheader ? '' : header_element;

  return (
    <div className="hp col flex-column">
      {header}
      <main className="hp rel ">
        {props.children}
      </main>
    </div>
  );

}


function handleBackClick(navigate) {

  console.log(navigate);

  navigate.back();

}

export { Layout };
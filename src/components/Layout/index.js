import React from 'react';
import './styles.scss';

function Layout(props) {

  const navigate = props.navigate;

  const header = (
    <React.Fragment>
      <header className="hp flex h-center padding_5">
        <img src="/logo.svg" alt="logo" />
      </header>
      <div className="hp abs top3 left_0 padding1 back underline" onClick={(e) => handleBackClick(navigate)}>
        Back
      </div>
    </React.Fragment>
  );

  

  let noHeader = props.noheader || false;

  return (
    <div className="hp col flex-column">
      {noHeader ? '' : header}
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
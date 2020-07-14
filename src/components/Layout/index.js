import React from 'react';
import './styles.scss';


function handleBackClick(navigate) {

  navigate.goBack();

}

function Layout(props) {

  return (
    <div className="container">
      <header>
        Merch Impulse
      </header>
      <main>
        <div className="hp abs back padding1" onClick={(e) => handleBackClick(props.navigate)}>
          Back
        </div>
        {props.children}
      </main>
    </div>
  );

}

export { Layout };
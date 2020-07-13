import React from 'react';
import './styles.scss';

function Layout(props) {

  return (
    <div className="container">
      <header>
        Merch Impulse
      </header>
      <main>
        {props.children}
      </main>
    </div>
  );

}

export { Layout };
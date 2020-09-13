import React from 'react'
import './styles.scss'

function Layout({ navigate, noheader, noback, children }) {
	return (
		<div className="hp col flex-column">
			<main className="hp rel flex-column flex1">
				{children}
			</main>
		</div>
	)

}

export { Layout }
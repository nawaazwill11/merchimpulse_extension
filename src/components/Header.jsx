import React from 'react'
import { PROFILE_ROUTE } from '../config/definitions'

const Header = () => (
	<header className="hp flex h-center padding_5">
		<a href={PROFILE_ROUTE} target="_blank" rel="noopener noreferrer">
			<img src="/logo.svg" alt="logo" />
		</a>
	</header>
)

export default Header
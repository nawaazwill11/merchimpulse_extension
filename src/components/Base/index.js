import React from 'react'
import PropTypes from 'prop-types'

import Login from './Login'
import Fresh from './Fresh'


const Base = ({
	page,
	setPage,
}) => {

	if (page === 'fresh')
		return <Fresh setPage={setPage}/>

	if (page === 'login')
		return <Login setPage={setPage} />

}

Base.propTypes = {
	page: PropTypes.string,
	setPage: PropTypes.func,
}

export default Base
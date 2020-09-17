import React from 'react'
import PropTypes from 'prop-types'
import Header from './Header'
import {
	HISTORY_ROUTE,
	BOOKMARKS_ROUTE,
	SETTINGS_ROUTE,
	PROFILE_ROUTE, GUMROAD_ROUTE
} from '../config/definitions'

const Dashboard = ({
	state,
	active,
	active_filter,
	search_count,
	setActive,
	setActiveFilter,
	logout,
}) => {

	console.log('search_count', search_count)

	const Content = () => {
		const Inactive = () => {
			return (
				<div className="hp row flex h-center v-center">
					<div className="hp flex-column h-center margin-bottom_-4">
						<div className="hp font-size2 bold margin-bottom_5">
							Inactive
						</div>
						<div className="hp font-size1">
							Click this to activate
						</div>
						<div className="arrow">
							<div className="curve"></div>
							<div className="point"></div>
						</div>
					</div>
				</div>
			)
		}

		const Active = () => {
			const filter_list = [
				'T-Shirt',
				'Popsocket',
				'Sweatshirt',
				'Longsleeves',
				'Premium',
			]

			const filters = filter_list.map((filter) => {
				const isSelected = filter === active_filter

				return (
					<div key={filter} className="hp row col-na-6 padding_5">
						<div
							className={
								'hp row col-na-12 border_1 border-radius_2 padding_5 text-center filter '
								+ (isSelected ? 'selected' : '')}
							onClick={() => setActiveFilter(isSelected ? '' : filter)}>
							{filter}
						</div>
					</div>
				)
			})

			// const bookmarks = app_data.bookmarks.map((bookmark) => {
			//     return <Bookmark key={bookmark.name} bookmark={bookmark} />
			// });

			return (
				<div className="hp row flex24 flex-column">
					<div className="hp row margin-bottom1">
						<div className="hp row bold padding-bottom_5 font-size1">
							Always-on Filters
						</div>
						<div className="hp row flex flex-wrap h-center font-size_8">
							{filters}
						</div>
					</div>
					<div className="hp row flex-column margin-bottom_-5">
						<div className="hp row">
							<div className="hp bold font-size1">
								Options
							</div>
							<div className="hp row">
								{
									state === 'trial'
										? (
											<div className="hp row flex h-center v-center margin-top1">
												<div className="hp flex1">
													Daily Free Quota
												</div>
												<div className="">
													{10 - search_count} Left
												</div>
											</div>
										)
										: ''
								}
							</div>
							<div className="hp row flex h-center v-center margin-top1">
								<div className="hp row flex">
									<a
										target="_blank"
										rel="noopener noreferrer"
										href={HISTORY_ROUTE}>
										Search History
									</a>
								</div>
							</div>
							<div className="hp row flex h-center v-center margin-top1">
								<div className="hp row flex">
									<a
										target="_blank"
										rel="noopener noreferrer"
										href={BOOKMARKS_ROUTE}>
										Bookmarks
									</a>
								</div>
							</div>
							<div className="hp row flex h-center v-center margin-top1">
								<div className="hp row flex">
									<a
										target="_blank"
										rel="noopener noreferrer"
										href={SETTINGS_ROUTE}>
										Settings
									</a>
								</div>
							</div>
							<div className="hp row flex h-center v-center margin-top1">
								<button
									className="hp row padding1 btn-primary border-none white font-size1"
								>
									<a
										className="hp white"

										target="_blank"
										rel="noopener noreferrer"
										href={state === 'trial' ? GUMROAD_ROUTE : PROFILE_ROUTE}>
										{state === 'trial' ? 'Upgrade Your Account' : 'You are a Pro'}
									</a>
								</button>
							</div>
						</div>
					</div>
				</div>
			)
		}
		return active ? Active() : Inactive()
	}
	console.log(Content)
	return (
		<>
			<Header />
			<div className="hp row flex1 flex-column padding1">
				<div className="hp row switch flex v-center margin-bottom1">
					<div className="hp flex1">
						<div className="checkbox-container yellow">
							<input type="checkbox" id="toggle" className="toggle" defaultChecked={active} />
							<label htmlFor="toggle" className={active ? 'active' : ''}
								onClick={() => setActive(!active)}></label>
							<div className="active-circle"></div>
						</div>
					</div>
					<button
						type="button"
						className="logout"
						onClick={() => logout()}
					>
						<img className="small-icon" src="/logout.svg" alt="logout" />
					</button>
				</div>
				<div className="hp row flex flex1 h-center">
					<Content />
				</div>
			</div>
		</>
	)
}

Dashboard.propTypes = {
	active: PropTypes.bool,
	state: PropTypes.string,
	active_filter: PropTypes.string,
	search_count: PropTypes.number,
	setActive: PropTypes.func,
	setActiveFilter: PropTypes.func,
	logout: PropTypes.func,
}

export default Dashboard
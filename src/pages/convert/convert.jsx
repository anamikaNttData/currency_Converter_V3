// ====================================================
// IMPORTS
import React, { useEffect, useState } from 'react'
import styles from './convert.module.css'
import Select from '../../components/select/select'
import { useDispatch, useSelector } from 'react-redux'
import { sagaActions } from '../../sagas/sagaActions'
import { countTheNumberOfDecimalPlaces } from '../../utils/countTheNumberOfDecimalPlaces'


// ====================================================
// Component

const Convert = () => {
	// Variables
	const dispatch = useDispatch()	
	let [from, setFrom] = useState('USD')
	let [to, setTo] = useState('INR')
	let [fromForm, setFromForm] = useState(1)	
	
	// ====================================================
	// Side effects
	useEffect(() => {
		let fromCount = fromForm
		let firstCurrency = from
		let secondCurrency = to

		if (firstCurrency) {
			setFrom((from = firstCurrency))
		}
		if (secondCurrency) {
			setTo((to = secondCurrency))
		}
		if (secondCurrency) {
			setFromForm((fromForm = fromCount))
		}
		dispatch({type: sagaActions.FETCH_CONVERT_CURRENCY, from, to })
		
	}, [])
	
    // ====================================================
	// State
	const conversionRate = useSelector(
		state => state.data.conversionRate
	)
	
	// ====================================================
	// JSX
	return (
		<div className={styles.cardsWrap}>
			<div className={styles.card}>
				<Select
					onItemClick={currency => {
						setFrom((from = currency))
						dispatch({type: sagaActions.FETCH_CONVERT_CURRENCY, from, to })
					}}
					initialCurrency={from}
				/>
				<input
					type="number"
					className={styles.input}
					onChange={e => {
						setFromForm((fromForm = Number(e.target.value)))						
					}}
					value={fromForm === 0 ? '' : fromForm}
				/>
				<div
					onClick={() => {
						setFromForm((fromForm = ''))
					}}
					className={styles.clear}
				>
					clear
				</div>
			</div>
			<div className={styles.card}>
				<Select
					onItemClick={currency => {
						setTo((to = currency))	
						dispatch({type: sagaActions.FETCH_CONVERT_CURRENCY, from, to })
					}}
					initialCurrency={to}
				/>
				<input
					type="text"
					value={
						countTheNumberOfDecimalPlaces(conversionRate * fromForm) < 4
							? conversionRate * fromForm
							: (conversionRate * fromForm).toFixed(4)
					}
					className={styles.input}
				/>
			</div>
		</div>
	)
}

// ====================================================
// Exports

export default React.memo(Convert)

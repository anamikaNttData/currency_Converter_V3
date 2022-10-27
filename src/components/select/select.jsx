// ====================================================
// IMPORTS
import styles from './select.module.css'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { sagaActions } from '../../sagas/sagaActions'
// ====================================================
// Component

const Select = (props) => {
	// ====================================================
	// Variables
	const dispatch = useDispatch()
	let [isListVisible, setIsListVisible] = useState(false)
    useEffect(() => {
		dispatch({ type: sagaActions.GET_CODES })
	}, [])
	// State
	const codes = useSelector(state => state.data.codes)				
	
	// ====================================================
	// JSX
	return (
		<div className={styles.body}>
			<div
				onClick={() => {
					setIsListVisible((isListVisible = !isListVisible))
				}}
				className={styles.baseCurrency}
			>
				{props.initialCurrency}
			</div>
			{isListVisible && (
				<div className={styles.list}>
					{codes.map(item => (
						<div
							className={styles.item}
							onClick={() => {
								props.onItemClick(item[0])
								setIsListVisible(false)
							}}
						>
							{item[0]}
						</div>
					))}
				</div>
			)}
		</div>
	)
}

// ====================================================
// Exports

export default React.memo(Select)

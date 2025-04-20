import { useEffect } from 'react'

import ProgressBar from './ProgressBar.jsx'

const TIMER = 7000

export default function DeleteConfirmation({ onConfirm, onCancel }) {
	useEffect(() => {
		const timer = setTimeout(() => {
			onConfirm()
		}, TIMER)

		return () => {
			clearTimeout(timer)
		}
	}, [onConfirm])

	return (
		<div id='delete-confirmation'>
			<h2>Подтверждение действия</h2>
			<p>Вы уверены Вы действительно хотите убрать это место?</p>
			<div id='confirmation-actions'>
				<button onClick={onCancel} className='button-text'>
					Нет
				</button>
				<button onClick={onConfirm} className='button'>
					Да
				</button>
			</div>
			<ProgressBar timer={TIMER} />
		</div>
	)
}

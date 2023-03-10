const NavigationHint = ({ cssClass, fill = '#fff', stroke = '#fff' }) => {
	return (
		<svg
			className={cssClass}
			width='50'
			height='52'
			viewBox='0 0 119 52'
			fill='none'
			xmlns='http://www.w3.org/2000/svg'>
			<path
				d='M107.061 27.0607C107.646 26.4749 107.646 25.5251 107.061 24.9393L97.5147 15.3934C96.9289 14.8076 95.9792 14.8076 95.3934 15.3934C94.8076 15.9792 94.8076 16.9289 95.3934 17.5147L103.879 26L95.3934 34.4853C94.8076 35.0711 94.8076 36.0208 95.3934 36.6066C95.9792 37.1924 96.9289 37.1924 97.5147 36.6066L107.061 27.0607ZM80 27.5H106V24.5H80V27.5Z'
				fill={fill}
			/>
			<rect x='68.5' y='1.5' width='49' height='49' rx='5.5' stroke={stroke} strokeWidth='3' />
			<path
				d='M11.9393 24.9393C11.3536 25.5251 11.3536 26.4749 11.9393 27.0607L21.4853 36.6066C22.0711 37.1924 23.0208 37.1924 23.6066 36.6066C24.1924 36.0208 24.1924 35.0711 23.6066 34.4853L15.1213 26L23.6066 17.5147C24.1924 16.9289 24.1924 15.9792 23.6066 15.3934C23.0208 14.8076 22.0711 14.8076 21.4853 15.3934L11.9393 24.9393ZM39 24.5L13 24.5L13 27.5L39 27.5L39 24.5Z'
				fill={fill}
			/>
			<rect
				x='50.5'
				y='50.5'
				width='49'
				height='49'
				rx='5.5'
				transform='rotate(-180 50.5 50.5)'
				stroke={stroke}
				strokeWidth='3'
			/>
		</svg>
	);
};

export default NavigationHint;

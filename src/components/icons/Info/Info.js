const Info = ({ width = 20, height = 20, stroke = '#fff', cssClass }) => {
	return (
		<svg
			className={cssClass}
			xmlns='http://www.w3.org/2000/svg'
			width={width}
			height={height}
			viewBox='0 0 33 33'>
			<g id='Icon_feather-info' data-name='Icon feather-info' transform='translate(-1.5 -1.5)'>
				<path
					id='Path_70'
					data-name='Path 70'
					d='M33,18A15,15,0,1,1,18,3,15,15,0,0,1,33,18Z'
					fill='none'
					stroke={stroke}
					strokeLinecap='round'
					strokeLinejoin='round'
					strokeWidth='3'
				/>
				<path
					id='Path_71'
					data-name='Path 71'
					d='M18,24V18'
					fill='none'
					stroke={stroke}
					strokeLinecap='round'
					strokeLinejoin='round'
					strokeWidth='3'
				/>
				<path
					id='Path_72'
					data-name='Path 72'
					d='M18,12h0'
					fill='none'
					stroke={stroke}
					strokeLinecap='round'
					strokeLinejoin='round'
					strokeWidth='3'
				/>
			</g>
		</svg>
	);
};

export default Info;

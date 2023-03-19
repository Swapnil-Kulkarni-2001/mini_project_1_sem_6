import React from 'react'

const ProgressBar = ({ bgcolor, progress, height }) => {

	const Parentdiv = {
		height: height,
		width: '100%',
		borderRadius: 40,
	}

	const Childdiv = {
		height: '100%',
		width: `${progress}%`,
		backgroundColor: bgcolor,
		textAlign: 'right'
	}

	const progresstext = {

		color: 'white',
		fontWeight: 900
	}

	return (
		<div style={Parentdiv}>
			<h1 className="text-white text-sm font-semibold mb-2">Profile completed {progress}%</h1>
			<div style={Childdiv}>
				{/* <span style={progresstext}>{progress}</span> */}
			</div>
			<div className="bg-white h-[1px]">
			</div>
		</div>
	)
}

export default ProgressBar;

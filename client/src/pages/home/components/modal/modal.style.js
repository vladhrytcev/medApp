import styled from "styled-components";
import { makeStyles } from '@material-ui/core/styles';
import breakpoints from '../../../../theme/breakpoints';

const { values } = breakpoints;

export const modalStyles = makeStyles(theme => ({
	modal: {
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'center',
		outline: '0'
	},
	paper: {
		width: '100vw',
		height: '100vh',
		borderRadius: '0px',
		boxShadow: '0 15px 40px 0 rgba(51, 60, 77, 0.2)',
		backgroundColor: '#ffffff',
		outline: '0',
		position: 'relative',
		[theme.breakpoints.up('sm')]: {
			width: '544px',
			height: '640px',
			borderRadius: '6px'
		},
	},
	modalDiv:{
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'center'
	},
	closeModal: {
		cursor: 'pointer',
		width: '20px',
		height: '20px',
		objectFit: 'contain',
		top: '11px',
		right: '11px',
		position: 'absolute',
		[theme.breakpoints.up('sm')]: {
			top: '24px',
			right: '24px',
			width: '18px',
			height: '18px'
		},
	},
	content: {
		padding: '64px 16px',
		display: 'flex',
		flexDirection: 'column',
		alignItems: 'center',
		[theme.breakpoints.up('sm')]: {
			padding: '64px 96px'
		},
	},
	stepper: {
		display: 'flex',
		flexDirection: 'row',
		justifyContent: 'space-around'
	},
	modalTitle: {
		width: '288px',
		height: '96px',
		top: '38px',
		position: 'relative',
		fontFamily: 'Gilroy',
		fontSize: '25px',
		fontWeight: '600',
		fontStretch: 'normal',
		fontStyle: 'normal',
		lineHeight: '1.28',
		letterSpacing: '-0.43px',
		textAlign: 'center',
		color: '#000000',
		[theme.breakpoints.up('sm')]: {
			width: '416px',
			height: '64px',
			top: '39px'
		},
	},
	modalText: {
		position: 'relative',
		top: '17px',
		width: '288px',
		height: '208px',
		fontFamily: 'OpenSans',
		fontSize: '16px',
		fontWeight: 'normal',
		fontStretch: 'normal',
		fontStyle: 'normal',
		lineHeight: '1.56',
		letterSpacing: 'normal',
		textAlign: 'center',
		color: '#333c4d',
		[theme.breakpoints.up('sm')]: {
			width: '416px',
			height: '168px',
			top: '21px',
			fontSize: '18px'
		},
	},
	button: {
		top: '512px',
		position: 'absolute',
		fontFamily: 'Gilroy !important',
		fontSize: '18px !important',
		fontWeight: '600',
		fontStretch: 'normal',
		fontStyle: 'normal',
		lineHeight: 'normal !important',
		letterSpacing: 'normal',
		textAlign: 'center',
		[theme.breakpoints.up('sm')]: {
			top: '512px',
		},
	}
}));
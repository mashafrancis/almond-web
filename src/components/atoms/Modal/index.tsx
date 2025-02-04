import { ModalProps } from '@components/atoms/Modal/interfaces';
import { Close } from '@mui/icons-material';
import { LoadingButton } from '@mui/lab';
import {
	Button,
	Dialog,
	DialogActions,
	DialogContent,
	DialogContentText,
	DialogTitle,
	IconButton,
	styled,
} from '@mui/material';
import { alpha } from '@mui/material/styles';
import { ReactNode } from 'react';

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
	'& .MuDialogContent-root': {
		padding: theme.spacing(2),
	},
	'& .MuDialogActions-root': {
		padding: theme.spacing(1),
	},
	'& .MuiDialog-paper': {
		borderRadius: 12,
		border: `1px solid ${theme.palette.divider}`,
	},
}));

export interface DialogTitleProps {
	id: string;
	children?: ReactNode;
	onClose: () => void;
}

const BootstrapDialogTitle = ({
	children,
	onClose,
	...other
}: DialogTitleProps) => (
	<DialogTitle
		sx={{
			m: 0,
			p: 2,
			backgroundColor: (theme) => alpha(theme.palette.primary.main, 0.1),
			color: (theme) => theme.palette.primary.main,
		}}
		{...other}
	>
		{children}
		{onClose ? (
			<IconButton
				aria-label="close"
				onClick={onClose}
				sx={{
					position: 'absolute',
					right: 8,
					top: 8,
					color: (theme) => theme.palette.grey[500],
				}}
			>
				<Close />
			</IconButton>
		) : null}
	</DialogTitle>
);

const Modal = ({
	isModalOpen,
	renderContent,
	fullScreen,
	onClose,
	renderHeader,
	submitButtonName,
	onSubmit,
	onDismiss,
	disabled = false,
	renderDialogText = '',
	isRequesting,
	loadingText = 'Loading...',
	maxWidth = 'xs',
}: ModalProps): JSX.Element => {
	return (
		<BootstrapDialog
			onClose={onClose}
			aria-labelledby="modal-dialog-title"
			open={isModalOpen}
			fullScreen={fullScreen}
			maxWidth={maxWidth}
		>
			<BootstrapDialogTitle id="modal-dialog-title" onClose={onClose}>
				{renderHeader}
			</BootstrapDialogTitle>
			<DialogContent>
				<DialogContentText sx={{ paddingY: 2 }} gutterBottom>
					{renderDialogText}
				</DialogContentText>
				{renderContent}
			</DialogContent>
			<DialogActions>
				<Button variant="text" color="primary" onClick={onDismiss}>
					Dismiss
				</Button>
				{submitButtonName ? (
					<LoadingButton
						autoFocus
						variant="contained"
						color="primary"
						onClick={onSubmit}
						disabled={disabled}
						loading={isRequesting}
						loadingIndicator={loadingText}
					>
						{submitButtonName}
					</LoadingButton>
				) : null}
			</DialogActions>
		</BootstrapDialog>
	);
};

export default Modal;

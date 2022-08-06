import { KeyboardArrowUpRounded } from '@mui/icons-material';
import {
	AppBar,
	Box,
	Fab,
	Slide,
	Zoom,
	useScrollTrigger,
} from '@mui/material';
import { alpha, useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import Container from 'components/Container';
import {
	MouseEvent,
	ReactElement,
	ReactNode,
	cloneElement,
	useState,
} from 'react';

import Modal from '../../components/atoms/Modal';
import { Footer, Sidebar, Topbar } from './components';
import { ContactForm } from './components/Topbar/components';

interface Props {
	children: ReactNode;
	colorInvert?: boolean;
	bgcolor?: string;
}

interface AppBarOnScrollProps {
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	children: ReactElement<any, any>;
	window?: () => Window;
	isMobileView?: boolean;
}

interface ScrollTopProps {
	window?: () => Window;
	children: ReactElement;
}

function ElevationScroll({
	children,
	window,
	isMobileView,
}: AppBarOnScrollProps) {
	// Note that you normally won't need to set the window ref as useScrollTrigger
	// will default to window.
	// This is only being set here because the demo is in an iframe.
	const trigger = useScrollTrigger({
		disableHysteresis: true,
		threshold: 0,
		target: window ? window() : undefined,
	});

	return isMobileView ? (
		<Slide appear={false} direction="down" in={!trigger}>
			{children}
		</Slide>
	) : (
		cloneElement(children, {
			elevation: trigger ? 4 : 0,
		})
	);
}

const ScrollTop = ({ window, children }: ScrollTopProps) => {
	const trigger = useScrollTrigger({
		target: window ? window() : undefined,
		disableHysteresis: true,
		threshold: 100,
	});

	const handleClick = (event: MouseEvent<HTMLDivElement>) => {
		const anchor = (
			(event.target as HTMLDivElement).ownerDocument || document
		).querySelector('#back-to-top-anchor');

		if (anchor) {
			anchor.scrollIntoView({
				behavior: 'smooth',
				block: 'center',
			});
		}
	};

	return (
		<Zoom in={trigger}>
			<Box
				onClick={handleClick}
				role="presentation"
				sx={{ position: 'fixed', bottom: 16, right: 16 }}
			>
				{children}
			</Box>
		</Zoom>
	);
};

const Main = ({
	children,
	colorInvert = false,
	bgcolor = 'transparent',
}: Props): JSX.Element => {
	const theme = useTheme();
	const isMd = useMediaQuery(theme.breakpoints.up('md'), {
		defaultMatches: true,
	});
	const isSm = useMediaQuery(theme.breakpoints.down('sm'), {
		defaultMatches: true,
	});

	const [openSidebar, setOpenSidebar] = useState(false);
	const [openContactModal, setContactModalOpen] = useState<boolean>(false);

	const handleContactModal = () =>
		setContactModalOpen((prevState) => !prevState);

	const handleSidebarOpen = (): void => {
		setOpenSidebar(true);
	};

	const handleSidebarClose = (): void => {
		setOpenSidebar(false);
	};

	const open = isMd ? false : openSidebar;

	const trigger = useScrollTrigger({
		disableHysteresis: true,
		threshold: 38,
	});

	const renderContactModal = (): JSX.Element => (
		<Modal
			fullScreen={isSm}
			isModalOpen={openContactModal}
			renderHeader="Contact us"
			renderDialogText="Get in touch with us"
			renderContent={<ContactForm handleContactModal={handleContactModal} />}
			onClose={handleContactModal}
			onDismiss={handleContactModal}
		/>
	);

	return (
		<>
			<AppBar
				position={'sticky'}
				sx={{
					top: 0,
					backgroundColor: trigger ? 'hsla(0,0%,100%,.8)' : bgcolor,
					backdropFilter: trigger ? 'blur(15px)' : 'none',
					borderBottom: trigger
						? `1px solid ${alpha(theme.palette.divider, 0.1)}`
						: 'none',
				}}
				elevation={0}
			>
				<Container
					maxWidth={1}
					paddingY={{ xs: 2, md: 1 }}
					paddingX={{ xs: 1, md: 4 }}
				>
					<Topbar
						onSidebarOpen={handleSidebarOpen}
						handleContactModal={handleContactModal}
						colorInvert={trigger ? false : colorInvert}
					/>
				</Container>
			</AppBar>
			<div id="back-to-top-anchor" />
			<Sidebar
				onClose={handleSidebarClose}
				handleContactModal={handleContactModal}
				open={open}
				variant="temporary"
			/>
			<main>{children}</main>
			{renderContactModal()}
			<ScrollTop>
				<Fab color="secondary" size="small" aria-label="scroll back to top">
					<KeyboardArrowUpRounded />
				</Fab>
			</ScrollTop>
			<Container
				maxWidth={1}
				paddingX={4}
				paddingY={8}
				sx={{
					backgroundColor: 'common.black',
					color: 'common.white',
				}}
			>
				<Footer />
			</Container>
		</>
	);
};

export default Main;

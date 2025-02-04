import { Link } from '@components/atoms';
import Container from '@components/Container';
import { Box, Button, Typography, useMediaQuery } from '@mui/material';
import { alpha, useTheme } from '@mui/material/styles';
import { Device } from '@prisma/client';
import arrayIsEmpty from '@utils/arrayIsEmpty';
import { useSession } from 'next-auth/react';

const Hero = (): JSX.Element => {
	const theme = useTheme();
	const isMd = useMediaQuery(theme.breakpoints.up('md'), {
		defaultMatches: true,
	});
	const { data: session } = useSession();

	const LeftSide = () => (
		<>
			<Box marginBottom={2}>
				<Typography variant="h2" color="text.primary" sx={{ fontWeight: 600 }}>
					Grow your food{' '}
				</Typography>
				<Typography
					color={'primary'}
					component={'span'}
					variant="h2"
					sx={{ fontWeight: 600 }}
				>
					healthy.
				</Typography>
			</Box>
			<Box marginBottom={3}>
				<Typography
					variant="h6"
					component="p"
					color="text.secondary"
					sx={{ fontWeight: 400 }}
				>
					We design sustainable solutions for hydroponic farmers, empowering
					them to grow fresh, clean, and local food in their communities around
					the globe.
				</Typography>
			</Box>
			<Box
				display="flex"
				flexDirection={{ xs: 'column', sm: 'row' }}
				alignItems={{ xs: 'stretched', sm: 'flex-start' }}
				marginTop={4}
			>
				<Button
					component={Link}
					variant="contained"
					color="primary"
					size="large"
					href="/store"
				>
					Visit our store
				</Button>
				<Button
					component={Link}
					variant="outlined"
					color="primary"
					size="large"
					href={`${
						arrayIsEmpty(session?.user.devices as Array<Device>)
							? '/setup-device'
							: '/dashboard'
					}`}
					marginTop={{ xs: 2, sm: 0 }}
					marginLeft={{ sm: 2 }}
					width={{ xs: '100%', md: 'auto' }}
					sx={{
						backgroundColor: 'background.paper',
						'&:hover': {
							backgroundColor: (theme) =>
								alpha(theme.palette.primary.main, 0.1),
						},
					}}
				>
					{arrayIsEmpty(session?.user.devices as Array<Device>)
						? 'Setup new device'
						: 'Go to dashboard'}
				</Button>
			</Box>
		</>
	);

	const RightSide = (): JSX.Element => {
		return (
			<Box
				sx={{
					height: { xs: 'auto', md: 1 },
					'& img': {
						objectFit: 'cover',
					},
					'& .lazy-load-image-loaded': {
						height: 1,
						width: 1,
					},
				}}
			>
				<Box
					component={'img'}
					// effect="blur"
					src="/img/hydroponics.webp"
					srcSet="/img/hydroponics.webp 2x"
					alt="home-image"
					height={{ xs: 'auto', md: 1 }}
					maxHeight={{ xs: 300, md: 1 }}
					width={1}
					maxWidth={1}
				/>
			</Box>
		);
	};

	return (
		<Box
			sx={{
				width: 1,
				height: 1,
				overflow: 'hidden',
			}}
		>
			<Container paddingX={0} paddingY={0}>
				<Box
					display={'flex'}
					flexDirection={{ xs: 'column', md: 'row' }}
					position={'relative'}
					minHeight={{ md: 600 }}
				>
					<Box
						width={1}
						order={{ xs: 2, md: 1 }}
						display={'flex'}
						alignItems={'center'}
					>
						<Container>
							<LeftSide />
						</Container>
					</Box>
					<Box
						sx={{
							flex: { xs: '0 0 100%', md: '0 0 50%' },
							position: 'relative',
							maxWidth: { xs: '100%', md: '50%' },
							order: { xs: 1, md: 2 },
						}}
					>
						<Box
							sx={{
								width: { xs: 1, md: '50vw' },
								height: '100%',
								position: 'relative',
							}}
						>
							<Box
								sx={{
									width: '100%',
									height: '100%',
									overflow: 'hidden',
								}}
							>
								<Box
									sx={{
										overflow: 'hidden',
										left: '0%',
										width: 1,
										height: 1,
										position: { xs: 'relative', md: 'absolute' },
										clipPath: {
											xs: 'none',
											md: 'polygon(10% 0%, 100% 0, 100% 100%, 0% 100%)',
										},
										shapeOutside: {
											xs: 'none',
											md: 'polygon(10% 0%, 100% 0, 100% 100%, 0% 100%)',
										},
									}}
								>
									<RightSide />
								</Box>
							</Box>
						</Box>
					</Box>
				</Box>
			</Container>
		</Box>
	);
};

export default Hero;

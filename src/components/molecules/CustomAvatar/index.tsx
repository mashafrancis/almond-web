import { ComponentContext } from '@context/ComponentContext';
import {
	AccountCircleOutlined,
	AdminPanelSettingsTwoTone,
	CodeTwoTone,
	FaceTwoTone,
	HelpOutline,
	Logout,
	OpenInNew,
} from '@mui/icons-material';
import {
	Avatar,
	Button,
	Chip,
	ListItemIcon,
	ListItemText,
	Menu,
	MenuItem,
	Stack,
	Theme,
	Tooltip,
	useMediaQuery,
} from '@mui/material';
import { alpha, useTheme } from '@mui/material/styles';
import fancyId from '@utils/fancyId';
import { signOut, useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import { MouseEvent, useContext, useState } from 'react';

const CustomAvatar = (): JSX.Element => {
	const router = useRouter();
	const theme = useTheme();
	const isSm = useMediaQuery((theme: Theme) => theme.breakpoints.down('sm'));
	const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
	const { data: session } = useSession();
	const { setCurrentRoleBasedAccess, currentRoleBasedAccess } =
		useContext(ComponentContext);

	const { name, image, role } = session?.user || {
		name: 'Anonymous User',
		image: '/img/avatar_male.svg',
	};

	const handleToggleProfileMenu = (event: MouseEvent<HTMLElement>) => {
		setAnchorEl(event.currentTarget);
	};

	const handleProfileClose = () => setAnchorEl(null);

	const { toggleRoleChangeDialog } = useContext(ComponentContext);

	const handleRoleModal = () => {
		handleProfileClose();
		toggleRoleChangeDialog();
	};

	const logoutActiveUser = async (e): Promise<void> => {
		e.preventDefault();
		await signOut({
			callbackUrl: `${window.location.origin}`,
			redirect: false,
		});
		// await router.push('/');
	};

	const almondRolesBlah = [
		{ name: 'USER', icon: <FaceTwoTone fontSize="small" /> },
		{ name: 'ADMIN', icon: <AdminPanelSettingsTwoTone fontSize="small" /> },
		{ name: 'DEVELOPER', icon: <CodeTwoTone fontSize="small" /> },
	];

	const open = Boolean(anchorEl);

	let menuItems = [
		{
			name: 'Profile',
			icon: <AccountCircleOutlined fontSize="small" />,
			link: 'account',
			secondaryText: 'Account settings',
		},
		{
			name: 'Help',
			icon: <HelpOutline fontSize="small" />,
			link: 'help',
			secondaryText: 'Find support',
		},
		{
			name: 'Feedback',
			icon: <OpenInNew fontSize="small" />,
			link: 'send-feedback',
			secondaryText: 'Help improve almond',
		},
	];

	return (
		<>
			<Tooltip title={name ?? 'Anonymous User'}>
				{isSm ? (
					<Avatar
						onClick={handleToggleProfileMenu}
						alt={name ?? 'Anonymous User'}
						src={image ?? '/img/avatar_male.svg'}
						aria-describedby="menu-popover"
						aria-controls="menu-popover"
						aria-haspopup="true"
						typeof="button"
					/>
				) : (
					<Chip
						size="medium"
						label={name ?? 'Anonymous User'}
						variant="outlined"
						color="primary"
						onClick={handleToggleProfileMenu}
						avatar={
							<Avatar
								alt={name ?? 'Anonymous User'}
								src={image ?? '/img/avatar_male.svg'}
								aria-describedby="menu-popover"
								aria-controls="menu-popover"
								aria-haspopup="true"
								typeof="button"
							/>
						}
					/>
				)}
			</Tooltip>
			<Menu
				id="menu-popover"
				anchorEl={anchorEl}
				open={open}
				onClose={handleProfileClose}
				onClick={handleProfileClose}
				PaperProps={{
					elevation: 0,
					sx: {
						border: `0.6px solid ${alpha(theme.palette.divider, 0.3)}`,
						width: 270,
						maxWidth: '100%',
						zIndex: theme.zIndex.appBar + 1,
						overflow: 'visible',
						// filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
						mt: 1.5,
						'& .MuiAvatar-root': {
							width: 32,
							height: 32,
							ml: -0.5,
							mr: 1,
						},
						// '&:before': {
						// 	content: '""',
						// 	display: 'block',
						// 	position: 'absolute',
						// 	top: 0,
						// 	right: 14,
						// 	width: 10,
						// 	height: 10,
						// 	bgcolor: 'background.paper',
						// 	transform: 'translateY(-50%) rotate(45deg)',
						// 	zIndex: theme.zIndex.appBar + 1,
						// 	border: `0.6px solid ${alpha(theme.palette.divider, 0.3)}`,
						// },
					},
				}}
				transformOrigin={{ horizontal: 'right', vertical: 'top' }}
				anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
			>
				{router.pathname === '/dashboard' && role === 'ADMIN' && (
					<MenuItem
						key={fancyId()}
						sx={{
							borderBottom: `1px solid ${alpha(theme.palette.divider, 0.1)}`,
							paddingY: 1,
						}}
					>
						<Stack
							direction="row"
							justifyContent="center"
							alignItems="center"
							spacing={2}
							width={1}
						>
							{almondRolesBlah.map((role) => (
								<Tooltip key={role.name} title={role.name.toLowerCase()}>
									<Button
										onClick={() => setCurrentRoleBasedAccess(role.name)}
										variant={
											currentRoleBasedAccess === role.name && role.name
												? 'contained'
												: 'outlined'
										}
										aria-label={role.name}
										sx={{
											borderRadius: 1,
											minWidth: 'auto',
											// borderColor: alpha(theme.palette.divider, 0.2),
										}}
									>
										{role.icon}
									</Button>
								</Tooltip>
							))}
						</Stack>
					</MenuItem>
				)}
				{menuItems.map((item) => {
					const handleClick = async () => {
						handleProfileClose();
						await router.push(item.link);
					};
					return (
						<MenuItem
							key={fancyId()}
							onClick={handleClick}
							sx={{
								borderBottom: `1px solid ${alpha(theme.palette.divider, 0.1)}`,
								paddingY: 1,
							}}
						>
							<ListItemIcon sx={{ minWidth: 44, marginRight: 1 }}>
								<Avatar
									sx={{
										backgroundColor: alpha(theme.palette.primary.main, 0.1),
										color: theme.palette.primary.main,
									}}
								>
									{item.icon}
								</Avatar>
							</ListItemIcon>
							<ListItemText
								primary={item.name}
								secondary={item.secondaryText}
							/>
						</MenuItem>
					);
				})}

				<MenuItem>
					<Button
						fullWidth
						variant="contained"
						type="submit"
						color="primary"
						startIcon={<Logout />}
						onClick={logoutActiveUser}
					>
						Logout
					</Button>
				</MenuItem>
			</Menu>
		</>
	);
};

export default CustomAvatar;

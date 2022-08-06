import Box from '@mui/material/Box';
import Container from 'components/Container';
import Main from 'layouts/Main';

import {
	Categories,
	FeaturedProducts,
	Hero,
	LatestProducts,
	Overview,
	Products,
} from './components';

const StoreView = (): JSX.Element => {
	return (
		<Main>
			<Container>
				<Hero />
			</Container>
			<Container paddingY={'0 !important'}>
				<Overview />
			</Container>
			<Container>
				<Categories />
			</Container>
			<Box bgcolor={'secondary.main'}>
				<Container>
					<FeaturedProducts />
				</Container>
			</Box>
			<Container>
				<Products />
			</Container>
			<Container>
				<LatestProducts />
			</Container>
			<Box bgcolor={'alternate.main'}></Box>
			{/*<Container paddingTop={'0 !important'}>*/}
			{/*	<QuickSearch />*/}
			{/*</Container>*/}
			{/*<Box bgcolor={'alternate.main'}>*/}
			{/*	<Container>*/}
			{/*		<Reviews />*/}
			{/*	</Container>*/}
			{/*</Box>*/}
			{/*<Container>*/}
			{/*	<Newsletter />*/}
			{/*</Container>*/}
		</Main>
	);
};

export default StoreView;

// styles
import 'react-lazy-load-image-component/src/effects/blur.css';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import 'aos/dist/aos.css';
import 'assets/css/index.css';
import 'assets/css/fonts.css';

import { ApolloProvider } from '@apollo/client';
import { CacheProvider, EmotionCache } from '@emotion/react';
import { useApollo } from '@lib/apollo';
import { wrapper } from '@store/index';
import { pageview } from '@utils/gtag';
import { SessionProvider } from 'next-auth/react';
import { DefaultSeo } from 'next-seo';
import { AppProps } from 'next/app';
/* eslint-disable react/prop-types */
import Head from 'next/head';
import { useRouter } from 'next/router';
import { useEffect } from 'react';

// components
import Page from '../components/Page';
import createEmotionCache from '../createEmotionCache';

interface Props extends AppProps {
	emotionCache?: EmotionCache;
}

// Client-side cache, shared for the whole session of the user in the browser.
const clientSideEmotionCache = createEmotionCache();

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
const App = ({
	Component,
	pageProps,
	emotionCache = clientSideEmotionCache,
}: Props): JSX.Element => {
	const router = useRouter();

	useEffect(() => {
		const handleRouteChange = (url: URL) => {
			pageview(url);
		};
		router.events.on('routeChangeComplete', handleRouteChange);
		router.events.on('hashChangeComplete', handleRouteChange);
		return () => {
			router.events.off('routeChangeComplete', handleRouteChange);
			router.events.off('hashChangeComplete', handleRouteChange);
		};
	}, [router.events]);

	const apolloClient = useApollo(pageProps.initialApolloState);

	return (
		<CacheProvider value={emotionCache}>
			<Head>
				<meta
					name="viewport"
					content="width=device-width, initial-scale=1, shrink-to-fit=no"
				/>
				<title>Almond | growing your plants smart</title>
			</Head>
			<ApolloProvider client={apolloClient}>
				<SessionProvider session={pageProps.session}>
					<DefaultSeo
						defaultTitle="Almond Hydroponics"
						titleTemplate="%s • almond"
						description="We design sustainable solutions for hydroponic farmers, empowering them to grow fresh, clean, and local food in their communities around the globe."
					/>
					<Page>
						<Component {...pageProps} />
					</Page>
				</SessionProvider>
			</ApolloProvider>
		</CacheProvider>
	);
};

export default wrapper.withRedux(App);

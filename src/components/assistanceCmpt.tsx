import { observer } from 'mobx-react';
import React, { Suspense } from 'react';
import { editStore } from '@store/index';
import { socketStore } from '@store/socket';
const ReactEntry = React.lazy(() => import('../entries/mainEntry'));
const VueEntry = React.lazy(() => import('../entries/vueEntry'));
const AngularEntry = React.lazy(() => import('../entries/ngEntry'));
const SvelteEntry = React.lazy(() => import('../entries/svelteEntry'));
const EmberEntry = React.lazy(() => import('../entries/emberEntry'));
const KoEntry = React.lazy(() => import('../entries/koEntry'));
const LitEntry = React.lazy(() => import('../entries/litEntry'));
const SolidEntry = React.lazy(() => import('../entries/solidEntry'));

function assistanceCmpt() {
	const entryMap = {
		React: <ReactEntry />,
		Vue: <VueEntry />,
		AngularJS: <AngularEntry />,
		'Svelte 3': <SvelteEntry />,
		LitJs: <LitEntry />,
		Solid: <SolidEntry />,
		EmberJS: <EmberEntry />,
		KnockOutJs: <KoEntry />
	};
	return (
		<>
			{(editStore.assistanceTemplate && (
				<div id="assitance-root">
					<Suspense fallback={<>loading</>}>
						{entryMap[editStore.curType]}
					</Suspense>
				</div>
			)) || <>loading...</>}
		</>
	);
}
export default observer(assistanceCmpt);

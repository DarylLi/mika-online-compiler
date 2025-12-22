declare module '@/components/*' {
	const reactComponent: any;
	export default reactComponent;
}

declare interface Window {
	myCustomFunction: (arg: string) => void;
	_isAssistanceMode: boolean;
	_assistanceTempate: any;
	_canSelectTree: boolean;
}

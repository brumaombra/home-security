export const useGlobalStore = () => useState('global', () => ({
    busy: false,
    events: [],
    streams: []
}));
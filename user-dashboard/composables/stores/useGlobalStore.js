export const useGlobalStore = () => useState('global', () => ({
    events: [],
    streams: []
}));
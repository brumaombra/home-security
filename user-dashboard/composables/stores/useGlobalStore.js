export const useGlobalStore = () => useState('global', () => ({
    busy: false,

    // Message toast data
    toast: {
        visible: false,
        message: '',
        type: 'success'
    },

    // Message dialog data
    dialog: {
        visible: false,
        title: '',
        message: '',
        type: 'success'
    },

    // Confirm dialog data
    confirmDialog: {
        visible: false,
        title: '',
        message: '',
        themeColor: '',
        onConfirm: null,
        onCancel: null,
        confirmButton: null,
        cancelButton: null
    },

    // Events
    events: {
        results: [],
        pagination: {
            total: 0,
            currentPage: 1,
            totalPages: 1,
            limit: 10,
            hasMore: false
        }
    },

    // Streams
    streams: {
        results: [],
        pagination: {
            total: 0,
            currentPage: 1,
            totalPages: 1,
            limit: 10,
            hasMore: false
        }
    }
}));
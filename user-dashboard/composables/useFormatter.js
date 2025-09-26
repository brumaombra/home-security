// Format a number
export const formatNumber = number => {
    if (!number) return '0';
    return Number(number).toLocaleString('en-US', {
        minimumFractionDigits: 0,
        maximumFractionDigits: 2
    });
};

// Format a percentage
export const formatPercentage = (number, decimals = 2) => {
    if (!number) return '0';
    return Number(number).toLocaleString('en-US', {
        minimumFractionDigits: decimals,
        maximumFractionDigits: decimals
    });
};

// Format just the date (e.g. "19/07/2025")
export const formatDate = dateInput => {
    if (!dateInput) return '';

    let date;
    if (typeof dateInput === 'string' && /^\d+$/.test(dateInput)) {
        date = new Date(Number(dateInput)); // Handle milliseconds timestamp
    } else {
        date = new Date(dateInput); // Normal date parsing
    }

    // Check for valid date
    if (isNaN(date.getTime())) return '';

    // Format in Italian
    return new Intl.DateTimeFormat('it-IT', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit'
    }).format(date);
};

// Format just the date (e.g. "19 luglio 2025")
export const formatDateLong = dateInput => {
    if (!dateInput) return '';

    let date;
    if (typeof dateInput === 'string' && /^\d+$/.test(dateInput)) {
        date = new Date(Number(dateInput)); // Handle milliseconds timestamp
    } else {
        date = new Date(dateInput); // Normal date parsing
    }

    // Check for valid date
    if (isNaN(date.getTime())) return '';

    // Format in Italian
    return new Intl.DateTimeFormat('it-IT', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    }).format(date);
};

// Format just the time (e.g. "09:30")
export const formatTime = dateInput => {
    if (!dateInput) return '';

    let date;
    if (typeof dateInput === 'string' && /^\d+$/.test(dateInput)) {
        date = new Date(Number(dateInput)); // Handle milliseconds timestamp
    } else {
        date = new Date(dateInput); // Normal date parsing
    }

    // Check for valid date
    if (isNaN(date.getTime())) return '';

    // Format in Italian
    return new Intl.DateTimeFormat('it-IT', {
        hour: '2-digit',
        minute: '2-digit',
        hour12: false
    }).format(date);
};

// Format date and time
export const formatDateAndTime = dateInput => {
    if (!dateInput) return '';

    let date;
    if (typeof dateInput === 'string' && /^\d+$/.test(dateInput)) {
        date = new Date(Number(dateInput)); // Handle milliseconds timestamp
    } else {
        date = new Date(dateInput); // Normal date parsing
    }

    // Check for valid date
    if (isNaN(date.getTime())) return '';

    // Format in Italian
    return new Intl.DateTimeFormat('it-IT', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
        hour12: false
    }).format(date);
};

// Format just the date (e.g. "19 luglio 2025, 09:30")
export const formatDateAndTimeLong = dateInput => {
    if (!dateInput) return '';

    let date;
    if (typeof dateInput === 'string' && /^\d+$/.test(dateInput)) {
        date = new Date(Number(dateInput)); // Handle milliseconds timestamp
    } else {
        date = new Date(dateInput); // Normal date parsing
    }

    // Check for valid date
    if (isNaN(date.getTime())) return '';

    // Format in Italian
    return new Intl.DateTimeFormat('it-IT', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        hour12: false
    }).format(date);
};
interface ApiError {
    message?: string; // Custom error message if available
    status?: number; // HTTP status code
}

export const getErrorMessage = (error: unknown): string => {
    if (error instanceof Error) {
        // Handle standard JavaScript errors
        return error.message || 'An unexpected error occurred.';
    } 
    
    if (typeof error === 'object' && error !== null) {
        // Handle potential API errors
        const apiError = error as ApiError;
        if (apiError.message) {
            return apiError.message; // Return the custom error message
        }
    }

    // Fallback messages for specific known scenarios
    if (isFetchError(error)) {
        switch (error.status) {
            case 404:
                return 'Resource not found.';
            case 500:
                return 'Internal server error. Please try again later.';
            default:
                return 'An error occurred. Please try again later.';
        }
    }

    return 'An unexpected error occurred.';
};

// Type guard to check if the error has a status
function isFetchError(error: any): error is { status: number } {
    return typeof error === 'object' && error !== null && 'status' in error;
}

export const validateEmail = (email: string): boolean => {
    if (email.trim()) {
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return regex.test(email);
    }
    return false;
}

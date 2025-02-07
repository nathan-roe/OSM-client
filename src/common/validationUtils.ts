export const validateEmailAddress = (emailAddress: string) => {
    return /^\S+@\S+$/.test(emailAddress);
}

export const validatePassword = (password: string) => {
    return password.length >= 6;
}
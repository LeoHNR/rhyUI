export function SignUpFormValidator(
    email,
    password,
    confirmPassword,
    nombre,
    username
){

    const warnings = [];

    if (email.length === 0) {
        warnings.push('Email is required');
    }

    if (password.length === 0) {
        warnings.push('Password is required');
    }

    if (nombre.length === 0) {
        warnings.push('Name is required');
    }

    if (username.length === 0) {
        warnings.push('username is required');
    }

    if (password !== confirmPassword) {
        warnings.push('Passwords do not match');
    }

    const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
    if (!emailPattern.test(email)) {
        warnings.push('Invalid email format');
    }

    if (password.length < 6) {
        warnings.push('Password must be at least 6 characters');
    }

    if (!/[A-Z]/.test(password)) {
        warnings.push('Password must contain at least one uppercase letter');
    }

    if (!/[\W_]/.test(password)) {
        warnings.push('Password must contain at least one special character');
    }

    if (/(012|123|234|345|456|567|678|789|890)/.test(password)) {
        warnings.push('Password cannot contain sequences of three consecutive numbers');
    }

    return warnings;
}

export function LoginFormValidator(
    email,
    password
){

    const warnings = [];

    if (email.length === 0) {
        warnings.push('Email is required');
    }

    if (password.length === 0) {
        warnings.push('Password is required');
    }

    const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
    if (!emailPattern.test(email)) {
        warnings.push('Invalid email format');
    }

    if (password.length < 6) {
        warnings.push('Password must be at least 6 characters');
    }

    if (!/[A-Z]/.test(password)) {
        warnings.push('Password must contain at least one uppercase letter');
    }

    if (!/[\W_]/.test(password)) {
        warnings.push('Password must contain at least one special character');
    }

    if (/(012|123|234|345|456|567|678|789|890)/.test(password)) {
        warnings.push('Password cannot contain sequences of three consecutive numbers');
    }

    return warnings;
}
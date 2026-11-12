import { z } from "zod";

export const SignUp = z.object({
    firstName : z.string().trim().min(1, "First Name is Required"),
    lastName : z.string().trim().min(1, "Last Name is Required"),
    phoneNumber : z.string()
    .regex(/^\+?[1-9]\d{1,14}$/, {
    message: "Invalid phone number. Use E.164 format (e.g., +1234567890)."
    }),
    role: z.string().trim().min(1, "Role Required"),
    email : z.string().trim().toLowerCase().email("Invalid Email"),
    password: z.string().min(8, "Must Contain At Least 8 Letters")
    .regex(/[a-z]/, "Must Contain 1 Lowercase Letter")
    .regex(/[A-Z]/, "Must Contain 1 Uppercase Letter")
    .regex(/[0-9]/, "Must Contain 1 Number")
    .regex(/[^A-Za-z0-9]/, "Must contain at least one special character"),
    confirmPassword: z.string().min(8, "Must Contain At Least 8 Letters")
    .regex(/[a-z]/, "Must Contain 1 Lowercase Letter")
    .regex(/[A-Z]/, "Must Contain 1 Uppercase Letter")
    .regex(/[0-9]/, "Must Contain 1 Number")
    .regex(/[^A-Za-z0-9]/, "Must contain at least one special character")
    
});

export const Login = z.object({
    email : z.string().trim().toLowerCase().email("Invalid Email"),
    password : z.string().trim().min(1, "Password is Required")
});
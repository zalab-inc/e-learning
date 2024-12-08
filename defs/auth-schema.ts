import { z } from "zod";

/**
 * Schema for validating login form data
 * @property {string} email - User's email address
 * @property {string} password - User's password (minimum 1 character)
 */
export const LoginSchema = z.object({
	email: z.string().email({ message: "Format email tidak valid" }),
	password: z.string().min(1, { message: "Password harus diisi" }),
});

export type LoginFormData = z.infer<typeof LoginSchema>;

/**
 * Schema for validating register form data
 * @property {string} email - User's email address
 * @property {string} password - User's password (minimum 8 characters)
 * @property {string} confirmPassword - User's password confirmation
 */
export const RegisterSchema = z
	.object({
		email: z.string().email("Format email tidak valid"),
		name: z.string().min(1, "Nama harus diisi"),
		password: z.string().min(8, "Password minimal 8 karakter"),
		confirmPassword: z.string(),
	})
	.refine((data) => data.password === data.confirmPassword, {
		message: "Password tidak sama",
		path: ["confirmPassword"],
	});

export type RegisterFormData = z.infer<typeof RegisterSchema>;

/**
 * Schema for validating change password form data
 * @property {string} token - Password reset token
 * @property {string} password - User's new password (minimum 8 characters)
 * @property {string} confirmPassword - User's new password confirmation
 */
export const ChangePasswordSchema = z
	.object({
		token: z.string().min(1, "Token tidak valid"),
		password: z.string().min(8, "Password minimal 8 karakter"),
		confirmPassword: z.string(),
	})
	.refine((data) => data.password === data.confirmPassword, {
		message: "Password tidak sama",
		path: ["confirmPassword"],
	});

export type ChangePasswordFormData = z.infer<typeof ChangePasswordSchema>;

/**
 * Schema for validating forgot password form data
 * @property {string} email - User's email address
 */
export const ForgotSchema = z.object({
	email: z.string().email("Format email tidak valid"),
});

export type ForgotFormData = z.infer<typeof ForgotSchema>;

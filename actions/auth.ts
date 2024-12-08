"use server";

import { returnValidationErrors } from "next-safe-action";
import { actionClient } from "@/lib/safe-action";
import {
	LoginSchema,
	RegisterSchema,
	ChangePasswordSchema,
	ForgotSchema,
} from "@/defs/auth-schema";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export const loginAction = actionClient
	.schema(LoginSchema)
	.action(async ({ parsedInput }) => {
		try {
			const response = await auth.api.signInEmail({
				body: {
					email: parsedInput.email,
					password: parsedInput.password,
				},
			});
			if (!response.user) {
				return {
					success: true,
				};
			}
		} catch (error) {
			return returnValidationErrors(LoginSchema, {
				_errors: ["Email atau password tidak valid"],
			});
		}
	});

export const registerAction = actionClient
	.schema(RegisterSchema)
	.action(async ({ parsedInput }) => {
		try {
			// check if email already exists
			const user = await prisma.user.findUnique({
				where: { email: parsedInput.email },
			});
			if (user) {
				return returnValidationErrors(RegisterSchema, {
					email: {
						_errors: ["Email sudah terdaftar"],
					},
				});
			}

			await auth.api.signUpEmail({
				body: {
					email: parsedInput.email,
					password: parsedInput.password,
					name: parsedInput.name,
				},
				redirect: false,
			});
			return {
				success: true,
			};
		} catch (error: unknown) {
			return returnValidationErrors(RegisterSchema, {
				email: {
					_errors: ["Email sudah terdaftar"],
				},
			});
		}
	});

export const changePasswordAction = actionClient
	.schema(ChangePasswordSchema)
	.action(async ({ parsedInput }) => {
		try {
			await auth.api.resetPassword({
				body: {
					token: parsedInput.token,
					newPassword: parsedInput.password,
				},
			});

			return {
				success: true,
				message: "Password berhasil diubah",
			};
		} catch (error) {
			console.error("Error saat mengubah password:", error);
			return returnValidationErrors(ChangePasswordSchema, {
				_errors: ["Link sudah tidak valid atau kadaluarsa"],
			});
		}
	});

export const forgotAction = actionClient
	.schema(ForgotSchema)
	.action(async ({ parsedInput }) => {
		const user = await prisma.user.findUnique({
			where: { email: parsedInput.email },
		});

		if (!user) {
			return returnValidationErrors(ForgotSchema, {
				email: {
					_errors: ["Email tidak terdaftar"],
				},
			});
		}

		await auth.api.forgetPassword({
			body: {
				email: parsedInput.email,
			},
		});

		return {
			success: true,
			email: parsedInput.email,
		};
	});

export const logoutAction = actionClient.action(async () => {
	await auth.api.signOut({
		method: "POST",
		headers: new Headers({
			"Content-Type": "application/json",
		}),
	});
});

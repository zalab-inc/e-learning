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
import { redirect } from "next/navigation";

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
				_errors: ["Invalid email or password"],
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
						_errors: ["A user with this email already exists"],
					},
				});
			}

			await auth.api.signUpEmail({
				body: {
					email: parsedInput.email,
					password: parsedInput.password,
					name: parsedInput.email.split("@")[0],
				},
				redirect: false,
			});
			return {
				success: true,
			};
		} catch (error: unknown) {
			return returnValidationErrors(RegisterSchema, {
				email: {
					_errors: ["A user with this email already exists"],
				},
			});
		}
	});

export const changePasswordAction = actionClient
	.schema(ChangePasswordSchema)
	.action(async ({ parsedInput }) => {
		// Add your change password logic here
		return {
			message: "Password changed successfully",
		};
	});

export const forgotAction = actionClient
	.schema(ForgotSchema)
	.action(async ({ parsedInput }) => {
		await new Promise((resolve) => setTimeout(resolve, 1000));
		if (parsedInput.email !== "test@example.com") {
			return returnValidationErrors(ForgotSchema, {
				_errors: ["Invalid email or password"],
			});
		}

		return {
			successful: true,
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

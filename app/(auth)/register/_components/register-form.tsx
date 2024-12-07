"use client";

import Link from "next/link";
import { zodResolver } from "@hookform/resolvers/zod";
import { useHookFormAction } from "@next-safe-action/adapter-react-hook-form/hooks";
import { Loader2 } from "lucide-react";
import { useState } from "react";

import { registerAction } from "@/actions/auth";
import { RegisterSchema } from "@/defs/auth-schema";
import { Button } from "@/components/ui/button";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { PasswordInput } from "@/components/shared/password-input";
import { SuccessMessage } from "./success-message";

export function RegisterForm() {
	const [isSuccess, setIsSuccess] = useState(false);
	const { form, handleSubmitWithAction, resetFormAndAction } =
		useHookFormAction(registerAction, zodResolver(RegisterSchema), {
			actionProps: {
				onSuccess: () => {
					setIsSuccess(true);
					resetFormAndAction();
				},
				onError: () => {
					form.resetField("password");
					form.resetField("confirmPassword");
				},
			},
			formProps: {
				defaultValues: {
					email: "",
					password: "",
					confirmPassword: "",
				},
			},
			errorMapProps: {
				joinBy: " and ",
			},
		});

	if (isSuccess) {
		return <SuccessMessage />;
	}

	return (
		<div className="flex flex-col min-h-[50vh] h-full w-full items-center justify-center px-4">
			<Card className="max-w-sm mx-auto">
				<CardHeader>
					<CardTitle className="text-2xl">Daftar</CardTitle>
					<CardDescription>
						Masukkan email dan password untuk membuat akun Anda.
					</CardDescription>
				</CardHeader>
				<CardContent>
					<Form {...form}>
						<form onSubmit={handleSubmitWithAction} className="space-y-8">
							<div className="grid gap-4">
								<FormField
									control={form.control}
									name="email"
									render={({ field }) => (
										<FormItem className="grid gap-2">
											<FormLabel htmlFor="email">Email</FormLabel>
											<FormControl>
												<Input
													id="email"
													placeholder="johndoe@mail.com"
													type="email"
													autoComplete="email"
													{...field}
												/>
											</FormControl>
											<FormMessage />
										</FormItem>
									)}
								/>
								<FormField
									control={form.control}
									name="password"
									render={({ field }) => (
										<FormItem className="grid gap-2">
											<FormLabel htmlFor="password">Kata Sandi</FormLabel>
											<FormControl>
												<PasswordInput
													id="password"
													placeholder="******"
													autoComplete="new-password"
													{...field}
												/>
											</FormControl>
											<FormMessage />
										</FormItem>
									)}
								/>
								<FormField
									control={form.control}
									name="confirmPassword"
									render={({ field }) => (
										<FormItem className="grid gap-2">
											<FormLabel htmlFor="confirmPassword">
												Konfirmasi Kata Sandi
											</FormLabel>
											<FormControl>
												<PasswordInput
													id="confirmPassword"
													placeholder="******"
													autoComplete="new-password"
													{...field}
												/>
											</FormControl>
											<FormMessage />
										</FormItem>
									)}
								/>
								<Button type="submit" disabled={form.formState.isSubmitting}>
									{form.formState.isSubmitting ? (
										<>
											<Loader2 className="w-4 h-4 mr-2 animate-spin" />
											Memuat...
										</>
									) : (
										"Daftar"
									)}
								</Button>
							</div>
						</form>
					</Form>
					<div className="mt-4 text-sm text-center">
						Sudah punya akun?{" "}
						<Link href="/login" className="underline">
							Masuk
						</Link>
					</div>
				</CardContent>
			</Card>
		</div>
	);
}

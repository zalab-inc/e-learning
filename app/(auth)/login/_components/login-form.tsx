"use client";

import Link from "next/link";
import { zodResolver } from "@hookform/resolvers/zod";
import { useHookFormAction } from "@next-safe-action/adapter-react-hook-form/hooks";
import { Lightbulb, Loader2 } from "lucide-react";
import { useEffect, useState } from "react";

import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { PasswordInput } from "@/components/shared/password-input";
import { LoginSchema } from "@/defs/auth-schema";
import { loginAction } from "@/actions/auth";
import { useRouter } from "next/navigation";
import { LoginSuccess } from "./login-success";

export function LoginForm() {
	const router = useRouter();
	const [isSuccess, setIsSuccess] = useState(false);
	const { form, handleSubmitWithAction, resetFormAndAction } =
		useHookFormAction(loginAction, zodResolver(LoginSchema), {
			actionProps: {
				onSuccess: () => {
					resetFormAndAction();
					setIsSuccess(true);
					setTimeout(() => {
						router.replace("/dashboard");
					}, 2000);
				},
				onError: () => {
					form.resetField("password");
				},
			},
			formProps: {
				defaultValues: {
					email: "",
					password: "",
				},
			},
			errorMapProps: {
				joinBy: " and ",
			},
		});

	// Clear root error when form fields change
	useEffect(() => {
		const subscription = form.watch(() => {
			if (form.formState.errors.root) {
				form.clearErrors("root");
			}
		});

		return () => subscription.unsubscribe();
	}, [form]);

	if (isSuccess) {
		return <LoginSuccess />;
	}

	return (
		<div className="flex flex-col min-h-[50vh] h-full w-full items-center justify-center px-4">
			<Link href="/" className="flex flex-col items-center gap-2 mb-8">
				<div className="flex items-center justify-center w-12 h-12 rounded-lg bg-primary text-primary-foreground">
					<Lightbulb className="w-6 h-6" />
				</div>
				<span className="text-lg font-semibold">KelasInvotif.com</span>
			</Link>
			<Card className="max-w-sm mx-auto">
				<CardHeader>
					<CardTitle className="text-2xl">Masuk</CardTitle>
					<CardDescription>
						Masukkan email dan password untuk masuk ke akun Anda.{" "}
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
													disabled={form.formState.isSubmitting}
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
											<div className="flex items-center justify-between">
												<FormLabel htmlFor="password">Password</FormLabel>
												<Link
													href="/forgot"
													className="inline-block ml-auto text-sm underline"
												>
													Lupa password?
												</Link>
											</div>
											<FormControl>
												<PasswordInput
													id="password"
													placeholder="******"
													autoComplete="current-password"
													{...field}
													disabled={form.formState.isSubmitting}
												/>
											</FormControl>
											<FormMessage />
										</FormItem>
									)}
								/>

								{form.formState.errors.root && form.formState.isDirty ? (
									<p className="text-sm font-medium text-destructive">
										{form.formState.errors.root.message}
									</p>
								) : null}
								<Button type="submit" disabled={form.formState.isSubmitting}>
									{form.formState.isSubmitting ? (
										<>
											<Loader2 className="w-4 h-4 mr-2 animate-spin" />
											Memuat...
										</>
									) : (
										"Masuk"
									)}
								</Button>
							</div>
						</form>
					</Form>
					<div className="mt-4 text-sm text-center">
						Belum punya akun?{" "}
						<Link href="/register" className="underline">
							Daftar
						</Link>
					</div>
				</CardContent>
			</Card>
			<div className="mt-6 text-sm text-muted-foreground">
				<Link href="/" className="transition-colors hover:text-foreground">
					Kembali ke Beranda
				</Link>
			</div>
		</div>
	);
}

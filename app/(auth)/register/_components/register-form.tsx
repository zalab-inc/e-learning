"use client";

import Link from "next/link";
import { zodResolver } from "@hookform/resolvers/zod";
import { useHookFormAction } from "@next-safe-action/adapter-react-hook-form/hooks";
import { Lightbulb, Loader2 } from "lucide-react";
import { useState } from "react";

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
import { RegisterSchema } from "@/defs/auth-schema";
import { registerAction } from "@/actions/auth";
import { useRouter } from "next/navigation";

export function RegisterForm() {
	const router = useRouter();
	const [isSuccess, setIsSuccess] = useState(false);
	const { form, handleSubmitWithAction, resetFormAndAction } =
		useHookFormAction(registerAction, zodResolver(RegisterSchema), {
			actionProps: {
				onSuccess: () => {
					resetFormAndAction();
					setIsSuccess(true);
					setTimeout(() => {
						router.replace("/login");
					}, 2000);
				},
			},
			formProps: {
				defaultValues: {
					email: "",
					password: "",
					confirmPassword: "",
					name: "",
				},
			},
			errorMapProps: {
				joinBy: " dan ",
			},
		});

	if (isSuccess) {
		return (
			<Card className="w-[400px]">
				<CardHeader>
					<CardTitle className="text-2xl text-center">
						Pendaftaran Berhasil
					</CardTitle>
				</CardHeader>
				<CardContent className="space-y-4">
					<p className="text-center text-muted-foreground">
						Akun Anda telah berhasil dibuat. Anda akan dialihkan ke halaman
						login.
					</p>
					<Button asChild className="w-full">
						<Link href="/login">Ke Halaman Login</Link>
					</Button>
				</CardContent>
			</Card>
		);
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
					<CardTitle className="text-2xl">Daftar</CardTitle>
					<CardDescription>
						Buat akun baru untuk mengakses KelasInvotif.com
					</CardDescription>
				</CardHeader>
				<CardContent>
					<Form {...form}>
						<form onSubmit={handleSubmitWithAction} className="space-y-8">
							<div className="grid gap-4">
								<FormField
									control={form.control}
									name="name"
									render={({ field }) => (
										<FormItem className="grid gap-2">
											<FormLabel htmlFor="name">Nama</FormLabel>
											<FormControl>
												<Input
													id="name"
													placeholder="Nama Anda"
													type="text"
													autoComplete="name"
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
									name="email"
									render={({ field }) => (
										<FormItem className="grid gap-2">
											<FormLabel htmlFor="email">Email</FormLabel>
											<FormControl>
												<Input
													id="email"
													placeholder="alamat@email.com"
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
											<FormLabel htmlFor="password">Password</FormLabel>
											<FormControl>
												<PasswordInput
													id="password"
													placeholder="Masukkan password"
													autoComplete="new-password"
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
									name="confirmPassword"
									render={({ field }) => (
										<FormItem className="grid gap-2">
											<FormLabel htmlFor="confirmPassword">
												Konfirmasi Password
											</FormLabel>
											<FormControl>
												<PasswordInput
													id="confirmPassword"
													placeholder="Ulangi password"
													autoComplete="new-password"
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
			<div className="mt-6 text-sm text-muted-foreground">
				<Link href="/" className="transition-colors hover:text-foreground">
					Kembali ke Beranda
				</Link>
			</div>
		</div>
	);
}

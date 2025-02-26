import React from "react";
import Image from "next/image";
import Link from "next/link";

function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // variables
  const year = new Date().getFullYear();

  return (
    <main className="min-h-screen grid lg:grid-cols-2 gap-8 p-4 lg:p-0 relative">
      <div className="flex flex-col justify-between max-w-md mx-auto w-full">
        <div className="mb-16">
          <Link href="/auth/login">
            <Image
              src={"/images/logo.webp"}
              alt="Logo"
              width={200}
              height={200}
              className="absolute w-16 top-4 left-1/2 transform -translate-x-1/2 sm:left-10 sm:translate-x-0 lg:top-4 lg:left-10 lg:w-20 xl:w-32"
            />
          </Link>
        </div>

        <div className="space-y-6">{children}</div>

        <div className="pb-6 text-center text-xs md:text-sm text-muted-foreground">
          © {year}. All Right Reserved.
        </div>
      </div>

      {/* Right Column - Preview Image */}
      <div className="hidden lg:flex lg:flex-col h-screen bg-primary">
        <div className="flex-none px-8 pt-12 pb-8">
          <div className="space-y-4 text-white max-w-lg mx-auto text-center">
            <h2 className="text-2xl font-semibold">
              Manage Your HRIS Effectively
            </h2>
            <p className="text-blue-100">
              Easily access and manage employee information, track attendance,
              handle payroll, and streamline your HR processes all in one place.
            </p>
          </div>
        </div>
        <div className="flex-1 relative w-full">
          <Image
            src="/images/login-banner.webp"
            alt="HRIS Dashboard Preview"
            fill
            sizes="(min-width: 1024px) 50vw, 100vw"
            className="object-cover object-top"
            priority
          />
        </div>
      </div>
    </main>
  );
}

export default AuthLayout;

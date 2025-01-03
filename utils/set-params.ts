import { usePathname, useRouter, useSearchParams } from "next/navigation";

/**
 * Custom hook to update URL parameters
 * @param newParams New parameters to update or add
 */
export const useSetParams = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const pathname = usePathname();

  return <T extends Record<string, unknown>>(newParams: Partial<T>) => {
    const updatedSearchParams = new URLSearchParams(searchParams.toString());

    Object.entries(newParams).forEach(([key, value]) => {
      if (value !== null && value !== undefined) {
        updatedSearchParams.set(key, String(value));
      } else {
        updatedSearchParams.delete(key);
      }
    });

    router.push(`${pathname}?${updatedSearchParams.toString()}`);
  };
};

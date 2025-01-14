import * as React from "react";
import { Eye, EyeOff, Lock } from "lucide-react";

import { Button } from "../ui/button";
import { Label } from "../ui/label";

import { cn } from "@/utils/utils";

export interface InputPasswordProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  className?: string;
  showStrengthIndicator?: boolean;
  label?: string;
  required?: boolean;
}

const InputPassword = React.forwardRef<HTMLInputElement, InputPasswordProps>(
  (
    {
      className,
      showStrengthIndicator = false,
      label,
      required = false,
      value = "",
      ...props
    },
    ref,
  ) => {
    const [showPassword, setShowPassword] = React.useState(false);

    const togglePasswordVisibility = () => {
      setShowPassword(!showPassword);
    };

    const calculateStrength = (password: string) => {
      if (password.length === 0) return 0;

      let strength = 0;
      const criteria = {
        length: password.length >= 8,
        uppercase: /[A-Z]/.test(password),
        lowercase: /[a-z]/.test(password),
        numbers: /[0-9]/.test(password),
        symbols: /[!@#$%^&*(),.?":{}|<>]/.test(password),
      };

      // Add points based on criteria
      if (criteria.length) strength++;
      if (criteria.lowercase || criteria.uppercase) strength++;
      if (criteria.numbers) strength++;
      if (criteria.symbols) strength++;

      return strength;
    };

    const getStrengthMessage = (password: string) => {
      if (password.length === 0) {
        return "Use 8 or more characters with a mix of letters, numbers & symbols";
      }

      const missing = [];
      if (password.length < 8) missing.push("8+ characters");
      if (!/[A-Za-z]/.test(password)) missing.push("letters");
      if (!/[0-9]/.test(password)) missing.push("numbers");
      if (!/[!@#$%^&*(),.?":{}|<>]/.test(password)) missing.push("symbols");

      if (missing.length === 0) {
        return "Strong password";
      }

      return `Add ${missing.join(", ")} for a stronger password`;
    };

    const strength = calculateStrength(value as string);
    const strengthMessage = getStrengthMessage(value as string);

    const getStrengthColor = (strength: number) => {
      if (strength === 0) return "bg-muted";
      if (strength <= 2) return "bg-red-500";
      if (strength === 3) return "bg-yellow-500";
      return "bg-green-500";
    };

    return (
      <div className="w-full space-y-2">
        {label && (
          <div className="space-y-1">
            <Label htmlFor={props.id}>
              {label}
              {required && <span className="text-red-500">*</span>}
            </Label>
          </div>
        )}
        <div className="relative">
          <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
            <Lock className="h-5 w-5 text-primary" aria-hidden />
          </div>
          <input
            type={showPassword ? "text" : "password"}
            className={cn(
              "flex h-10 w-full rounded-full border border-input bg-background py-2 text-xs md:text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 px-10",
              className,
            )}
            ref={ref}
            value={value}
            {...props}
          />
          <Button
            type="button"
            onClick={togglePasswordVisibility}
            className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
            variant="ghost"
            size="icon"
          >
            {showPassword ? (
              <EyeOff className="h-4 w-4 text-muted-foreground" />
            ) : (
              <Eye className="h-4 w-4 text-muted-foreground" />
            )}
            <span className="sr-only">
              {showPassword ? "Hide password" : "Show password"}
            </span>
          </Button>
        </div>

        {/* Strength indicator */}
        {showStrengthIndicator && (
          <div className="space-y-2">
            <div className="flex gap-1">
              {Array.from({ length: 4 }).map((_, i) => (
                <div
                  key={i}
                  className={cn(
                    "h-1 w-full rounded-full transition-all duration-300",
                    i < strength ? getStrengthColor(strength) : "bg-muted",
                  )}
                />
              ))}
            </div>
            <p
              className={cn(
                "text-xs",
                strength === 4 ? "text-green-500" : "text-muted-foreground",
              )}
            >
              {strengthMessage}
            </p>
          </div>
        )}
      </div>
    );
  },
);

InputPassword.displayName = "InputPassword";

export { InputPassword };

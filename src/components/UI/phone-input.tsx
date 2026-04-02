"use client";

import React from "react";
import PhoneInput, {
  isValidPhoneNumber as libIsValidPhoneNumber,
  Country,
} from "react-phone-number-input";
import ar from "react-phone-number-input/locale/ar";
import "react-phone-number-input/style.css";
import { cn } from "@/lib/utils";

// قائمة الدول العربية المسموح بها
const ARAB_COUNTRIES: Country[] = [
  "EG",
  "SA",
  "AE",
  "KW",
  "QA",
  "BH",
  "OM",
  "JO",
  "LB",
  "PS",
  "IQ",
  "YE",
  "SY",
  "SD",
  "LY",
  "TN",
  "DZ",
  "MA",
  "MR",
  "SO",
  "DJ",
  "KM",
];

// 1. تحديث الـ Interface ليشمل onValidChange
interface PhoneInputProProps {
  value: string;
  onChange: (value: string) => void;
  className?: string;
  error?: string;
  // ✅ الإضافة الجديدة: دالة اختيارية لاستقبال حالة الصلاحية
  onValidChange?: (isValid: boolean) => void;
}

export default function PhoneInputPro({
  value,
  onChange,
  className,
  error,
  onValidChange,
}: PhoneInputProProps) {
  // 2. دالة التعامل مع التغيير
  const handleChange = (val: string | undefined) => {
    const stringVal = val || "";

    // تحديث القيمة
    onChange(stringVal);

    // إذا تم تمرير دالة التحقق، قم باستدعائها
    if (onValidChange) {
      const isValid = stringVal ? libIsValidPhoneNumber(stringVal) : false;
      onValidChange(isValid);
    }
  };

  return (
    <div className={cn("relative w-full", className)} dir="ltr">
      <PhoneInput
        international
        defaultCountry="EG"
        countries={ARAB_COUNTRIES}
        labels={ar}
        value={value}
        onChange={handleChange} // ✅ استخدام الدالة الجديدة
        error={error ? "true" : undefined}
        className={cn(
          "flex h-12 w-full rounded-xl border bg-[#F9F7F0] px-3 py-2 text-sm shadow-sm transition-colors",
          "placeholder:text-muted-foreground focus-within:outline-none focus-within:ring-1 focus-within:ring-[#D4AF37] focus-within:border-[#D4AF37]",
          error
            ? "border-red-500 focus-within:ring-red-500"
            : "border-[#E6E2D3]",
          "[&_.PhoneInputCountry]:mr-2 [&_.PhoneInputCountry]:ml-1",
          "[&_.PhoneInputInput]:bg-transparent [&_.PhoneInputInput]:outline-none [&_.PhoneInputInput]:text-[#3E2723] [&_.PhoneInputInput]:font-sans",
          "[&_.PhoneInputCountrySelect]:bg-[#F9F7F0]"
        )}
      />
      {error && (
        <p className="text-xs text-red-500 mt-1 text-right" dir="rtl">
          {error}
        </p>
      )}
    </div>
  );
}

export const isValidPhoneNumber = (val: string) => {
  return libIsValidPhoneNumber(val);
};

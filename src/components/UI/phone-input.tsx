"use client";

import { useState } from "react";
import { Check, X, ChevronDown, Info } from "lucide-react";
import { cn } from "@/lib/utils";
import { isValidPhoneNumber, CountryCode } from "libphonenumber-js";

// قائمة الدول العربية
const ARAB_COUNTRIES = [
  { code: "EG", name: "مصر", dial: "+20", flag: "🇪🇬" },
  { code: "SA", name: "السعودية", dial: "+966", flag: "🇸🇦" },
  { code: "AE", name: "الإمارات", dial: "+971", flag: "🇦🇪" },
  { code: "KW", name: "الكويت", dial: "+965", flag: "🇰🇼" },
  { code: "QA", name: "قطر", dial: "+974", flag: "🇶🇦" },
  { code: "BH", name: "البحرين", dial: "+973", flag: "🇧🇭" },
  { code: "OM", name: "عمان", dial: "+968", flag: "🇴🇲" },
  { code: "JO", name: "الأردن", dial: "+962", flag: "🇯🇴" },
  { code: "LB", name: "لبنان", dial: "+961", flag: "🇱🇧" },
  { code: "PS", name: "فلسطين", dial: "+970", flag: "🇵🇸" },
  { code: "IQ", name: "العراق", dial: "+964", flag: "🇮🇶" },
  { code: "YE", name: "اليمن", dial: "+967", flag: "🇾🇪" },
  { code: "SY", name: "سوريا", dial: "+963", flag: "🇸🇾" },
  { code: "SD", name: "السودان", dial: "+249", flag: "🇸🇩" },
  { code: "LY", name: "ليبيا", dial: "+218", flag: "🇱🇾" },
  { code: "TN", name: "تونس", dial: "+216", flag: "🇹🇳" },
  { code: "DZ", name: "الجزائر", dial: "+213", flag: "🇩🇿" },
  { code: "MA", name: "المغرب", dial: "+212", flag: "🇲🇦" },
  { code: "MR", name: "موريتانيا", dial: "+222", flag: "🇲🇷" },
  { code: "SO", name: "الصومال", dial: "+252", flag: "🇸🇴" },
  { code: "DJ", name: "جيبوتي", dial: "+253", flag: "🇩🇯" },
  { code: "KM", name: "جزر القمر", dial: "+269", flag: "🇰🇲" },
];

// الحد الأقصى للأرقام في كل دولة
const PHONE_LENGTHS: Record<string, number> = {
  EG: 10,
  SA: 9,
  AE: 9,
  KW: 8,
  QA: 8,
  BH: 8,
  OM: 8,
  JO: 9,
  LB: 8,
  PS: 9,
  IQ: 10,
  YE: 9,
  SY: 9,
  SD: 9,
  LY: 9,
  TN: 8,
  DZ: 9,
  MA: 9,
  MR: 8,
  SO: 9,
  DJ: 8,
  KM: 7,
};

interface PhoneInputProProps {
  value: string;
  onChange: (value: string) => void;
  onValidChange?: (isValid: boolean) => void;
}

export default function PhoneInputPro({
  value,
  onChange,
  onValidChange,
}: PhoneInputProProps) {
  const [selectedCountry, setSelectedCountry] = useState(ARAB_COUNTRIES[0]);
  const [localNumber, setLocalNumber] = useState("");
  const [isTouched, setIsTouched] = useState(false);

  // التحقق الحقيقي
  const checkValidity = (number: string, country: string) => {
    try {
      return isValidPhoneNumber(number, country as CountryCode);
    } catch {
      return false;
    }
  };

  const updateState = (
    dial: string,
    number: string,
    country: (typeof ARAB_COUNTRIES)[0]
  ) => {
    const isValid = checkValidity(number, country.code);

    if (onValidChange) onValidChange(isValid);

    if (number) {
      onChange(dial + number);
    } else {
      onChange("");
    }
  };

  const handleCountryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const country = ARAB_COUNTRIES.find((c) => c.code === e.target.value);
    if (!country) return;

    setSelectedCountry(country);
    updateState(country.dial, localNumber, country);
  };

  const handleNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let val = e.target.value;

    // إزالة الصفر الداخلي
    if (val.startsWith("0")) val = val.substring(1);

    // أرقام فقط
    if (!/^\d*$/.test(val)) return;

    // الحد الأقصى حسب الدولة
    const maxLength = PHONE_LENGTHS[selectedCountry.code] || 10;
    if (val.length > maxLength) return;

    setLocalNumber(val);
    if (!isTouched) setIsTouched(true);

    updateState(selectedCountry.dial, val, selectedCountry);
  };

  const isValid = checkValidity(localNumber, selectedCountry.code);

  return (
    <div className="space-y-2 w-full" dir="rtl">
      <label className="block text-sm font-medium text-muted-foreground">
        رقم الهاتف (واتساب)
      </label>

      <div
        className={cn(
          "flex items-center w-full h-[54px] rounded-xl border-2 bg-[#F9F7F0] transition-all duration-200 overflow-hidden",
          isTouched && !isValid && localNumber.length > 0
            ? "border-red-300 focus-within:border-red-400"
            : isValid
            ? "border-green-300 focus-within:border-green-500"
            : "border-[#E6E2D3] focus-within:border-[#2A5B68] focus-within:ring-1 focus-within:ring-[#2A5B68]/20"
        )}
        dir="ltr"
      >
        {/* اختيار الدولة */}
        <div className="relative h-full border-r border-[#E6E2D3] bg-[#EFECE2]/50 hover:bg-[#EFECE2] transition-colors">
          <select
            className="h-full pl-3 pr-8 appearance-none bg-transparent outline-none cursor-pointer font-sans text-[#3E2723] text-sm font-bold min-w-[90px]"
            value={selectedCountry.code}
            onChange={handleCountryChange}
          >
            {ARAB_COUNTRIES.map((c) => (
              <option key={c.code} value={c.code}>
                {c.flag} {c.dial}
              </option>
            ))}
          </select>
          <ChevronDown className="absolute right-2 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground pointer-events-none" />
        </div>

        {/* حقل الرقم */}
        <input
          type="tel"
          className="flex-1 h-full bg-transparent px-4 text-[#3E2723] text-base placeholder:text-muted-foreground/50 outline-none font-sans tracking-wide"
          placeholder={
            selectedCountry.code === "EG" ? "10xxxxxxx" : "xxxxxxxxx"
          }
          value={localNumber}
          onChange={handleNumberChange}
        />

        {/* أيقونة النجاح/الخطأ */}
        <div className="px-4">
          {localNumber.length > 0 &&
            (isValid ? (
              <Check className="w-5 h-5 text-green-600 animate-in zoom-in" />
            ) : localNumber.length >= 2 ? (
              <X className="w-5 h-5 text-red-400 animate-in zoom-in" />
            ) : null)}
        </div>
      </div>

      {/* رسالة توجيه */}
      {isTouched && !isValid && localNumber.length > 0 && (
        <p className="text-xs text-red-500 animate-in slide-in-from-top-1 flex items-center gap-1">
          <Info className="w-3 h-3" />
          {localNumber.length < (PHONE_LENGTHS[selectedCountry.code] || 8)
            ? "الرقم قصير جداً"
            : "الرقم غير صالح حسب نظام الدولة"}
        </p>
      )}
    </div>
  );
}

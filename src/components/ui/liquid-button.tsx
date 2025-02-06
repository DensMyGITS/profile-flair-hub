import React from "react";
import { cn } from "@/lib/utils";

interface LiquidButtonProps {
  text: string;
  color1: string;
  color2: string;
  color3: string;
  width: number;
  height: number;
  onClick?: () => void;
  className?: string;
}

export const LiquidButton = ({
  text,
  color1,
  color2,
  color3,
  width,
  height,
  onClick,
  className,
}: LiquidButtonProps) => {
  return (
    <button
      onClick={onClick}
      className={cn(
        "relative overflow-hidden transition-all duration-500",
        "before:absolute before:inset-0 before:translate-x-[60%] before:bg-primary/10",
        "before:transition-transform hover:before:translate-x-[-60%]",
        "before:rounded-full",
        "rounded-md font-medium",
        className
      )}
      style={{
        width,
        height,
        background: `linear-gradient(45deg, ${color1}, ${color2}, ${color3})`,
        color: "white",
      }}
    >
      {text}
    </button>
  );
};
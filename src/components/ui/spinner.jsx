import { TbLoader3 } from "react-icons/tb";
import { cn } from "@/lib/utils";

export const Spinner = ({ className, size = "default" }) => {
  const sizeClasses = {
    sm: "h-4 w-4",
    default: "h-8 w-8",
    lg: "h-12 w-12",
  };

  return (
    <div className="flex items-center justify-center min-h-screen">
      <TbLoader3 
        className={cn(
          "animate-spin text-riptide-500",
          sizeClasses[size],
          className
        )} 
      />
    </div>
  );
}; 
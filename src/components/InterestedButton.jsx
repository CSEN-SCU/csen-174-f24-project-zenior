"use client";

import { Button } from "@/components/ui/button";
import { Star } from "lucide-react";
import { useState } from "react";

export default function InterestedButton() {
  const [isClicked, setIsClicked] = useState(false);

  const handleClick = () => {
    setIsClicked(!isClicked);
  };

  return (
    <Button
      variant="custom"
      className="flex items-center space-x-2 bg-[#b30738] text-white hover:bg-[#9e1b32] transition-colors"
      onClick={handleClick}
    >
      <Star
        className={isClicked ? "text-yellow-500 fill-yellow-500" : "text-yellow-500"}
        size={20}
      />
      {!isClicked && <span>Interested In</span>}
    </Button>
  );
}

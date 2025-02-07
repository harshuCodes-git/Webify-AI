import Main from "@/components/custom/Main";
import Navbar from "@/components/custom/Navbar";
import { Button } from "@/components/ui/button";
import Image from "next/image";

export default function Home() {
  return (
    <div className="w-full" suppressHydrationWarning>
      <Navbar suppressHydrationWarning />
      <Main suppressHydrationWarning />
    </div>
  );
}

import Main from "@/components/custom/Main";
import Navbar from "@/components/custom/Navbar";
import { BackgroundBeams } from "@/components/ui/background-beams";
import { ContainerScroll } from "@/components/ui/container-scroll-animation";

export default function Home() {
  return (
    <div
      className="w-full flex items-center justify-center"
      suppressHydrationWarning
    >
      <div className="relative w-full min-h-screen">
        <BackgroundBeams className="absolute inset-0 -z-10 pointer-events-none" />
        <Navbar suppressHydrationWarning />
        <Main suppressHydrationWarning />
        <ContainerScroll className="bg-white" suppressHydrationWarning />
      </div>
    </div>
  );
}

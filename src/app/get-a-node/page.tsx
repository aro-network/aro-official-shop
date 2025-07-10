import AGetANode from "@/app/components/AGetANode";
import Header from "@/app/components/AHeader";

export default function Page() {
  return (
    <div className="Get A Node">
      <div className="z-[100000] lg:relative w-full min-h-screen bg-black">
        <Header />
        <AGetANode />
      </div>
    </div>
  );
}

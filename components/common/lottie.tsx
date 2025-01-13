import dynamic from "next/dynamic";
const Player = dynamic(() => import("lottie-react"), {
  ssr: false,
});

export default function Lottie({
  animation,
  height = 100,
  width = 100,
}: Readonly<{
  animation: object;
  height: number;
  width: number;
}>) {
  return (
    <Player
      autoplay
      loop
      animationData={animation}
      style={{ height: `${height}px`, width: `${width}px` }}
    />
  );
}

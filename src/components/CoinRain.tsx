"use client";

type CoinRainProps = {
  count?: number;
};

export default function CoinRain({ count: _count }: CoinRainProps) {
  void _count;

  return (
    <div aria-hidden="true" className="coin-rain-layer">
      <video
        className="coin-rain-video"
        src="/coin-rain.mp4"
        autoPlay
        loop
        muted
        playsInline
        preload="auto"
      />
    </div>
  );
}

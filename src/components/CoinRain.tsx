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
        autoPlay
        loop
        muted
        playsInline
        preload="auto"
      >
        <source src="/coin%20rain.mp4" type="video/mp4" />
      </video>
    </div>
  );
}

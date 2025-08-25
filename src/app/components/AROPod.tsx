
import { Fragment, useCallback, useState, useRef, useEffect } from "react";
import { AutoFlip } from "./AutoFlip";
import { MBtn } from "./Header";
import { cn } from "../utils/cn";
import { debounce } from "../utils/common";
import { useSearchParams } from "next/navigation";

const AROPod = () => {
  const sq = useSearchParams();

  const [isEnd, setIsEnd] = useState(false);
  const [couponCode, setCouponCode] = useState(sq.get("coupon") || "");
  const [resultInfo, setResultInfo] = useState<any>(null);
  const [errorInfo, setErrorInfo] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [isLoaded, setIsLoaded] = useState(true)
  const couponRef = useRef(couponCode);

  couponRef.current = couponCode;

  const DEFAULT_FORM_URL = 'https://aronetwork.fillout.com/t/ehsGwPuoVhus'
  const applyCoupon = useCallback(() => {
    if (loading) return;
    setLoading(true);
    setErrorInfo(null);
    setResultInfo(null);

    if (!couponRef.current) {
      setResultInfo({ code: 200, data: { formUrl: DEFAULT_FORM_URL } });
      setLoading(false);
      return;
    }

    fetch(`https://preview-api.aro.network/api/common/order/coupon/${couponRef.current}`)
      .then((res) => res.json())
      .then((data) => {
        if (data.code === 200) {
          setResultInfo(data);
        } else {
          setErrorInfo(data);
        }
      })
      .catch((err) => {
        setErrorInfo({ message: err.message || "Unknown error" });
      })
      .finally(() => setLoading(false));
  }, [loading]);


  useEffect(() => {
    if (sq.get("coupon")) {
      onApply()
    }

  }, [sq.get("coupon")])

  const onApply = useRef(debounce(applyCoupon, 500)).current;

  const showCheckmark = !!couponCode && resultInfo?.code === 200;
  const canPreOrder = !couponCode || resultInfo?.code === 200;

  const [videoUrl, setVideoUrl] = useState<string | null>(null);


  useEffect(() => {
    const loadVideo = async () => {
      try {
        const response = await fetch("/ARO-Pod-video.mp4");
        const blob = await response.blob();
        const blobUrl = URL.createObjectURL(blob);
        setVideoUrl(blobUrl);
      } catch (err) {
        console.error("load error:", err);
      }
    };

    loadVideo();
  }, []);




  return (
    <Fragment>
      <div className="relative h-screen w-full overflow-hidden">
        {isLoaded && (
          <div className="absolute inset-0 bg-gray-300 animate-pulse flex items-center justify-center">
            <div className="w-16 h-16 border-4 border-white border-t-transparent rounded-full animate-spin" />
          </div>
        )}
        <video
          playsInline
          webkit-playsinline="true"
          src={videoUrl || undefined}
          className={cn("absolute top-0 left-0 h-full w-full object-cover z-0")}
          preload="auto"
          autoPlay
          muted
          onLoadedData={() => setIsLoaded(false)}
          onEnded={() => setIsEnd(true)}
        />

        {isEnd && (
          <div className="absolute z-10 h-full w-full flex">
            <AutoFlip className="flex flex-col w-full h-full items-center justify-between bg-black/30 text-white mo:px-5">
              <div className="h-full flex flex-col justify-between py-[200px] mo:gap-20">
                <div>
                  <h1 className="text-[60px] font-bold mb-2.5 flip_item text-center">
                    ARO Pod
                  </h1>
                  <p className="text-lg mo:text-xl max-w-xl text-center flip_item">
                    A plug-and-play device that runs 24/7 with low energy use.
                    <br />
                    Best for household runners.
                  </p>
                </div>

                <div className="text-center flex flex-col gap-4">
                  <div className="text-lg flip_item">Got a Coupon Code? Enter it here.</div>
                  <div className="flex gap-2.5 items-center justify-center flip_item">
                    <div className="relative w-[230px]">
                      <input
                        value={couponCode}
                        onChange={(e) => {
                          setResultInfo(null);
                          setErrorInfo(null);
                          setCouponCode(e.target.value.replace(/[^a-zA-Z0-9]/g, ""));
                        }}
                        className={cn(
                          "w-full h-12 rounded-full text-base bg-white/10 border border-white backdrop-blur-sm px-4 pr-10 text-white placeholder:text-white/70 transition-colors duration-300",
                          { "border-red-700": !!errorInfo?.message }
                        )}
                        placeholder="Enter Code (optional) "
                        autoComplete="off"
                      />
                      {showCheckmark && (
                        <svg
                          className="absolute right-3 top-1/2 -translate-y-1/2 w-6 h-6 text-green-400 pointer-events-none"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth={3}
                          viewBox="0 0 24 24"
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                        </svg>
                      )}
                    </div>

                    <button
                      disabled={loading}
                      onClick={onApply}
                      className={cn(
                        "w-[100px] flip_item h-12 rounded-full bg-white/10 border border-white backdrop-blur-sm text-white font-semibold transition-colors duration-300 disabled:opacity-50 disabled:cursor-not-allowed",
                      )}
                    >
                      {loading ? "Applying..." : "Apply"}
                    </button>
                  </div>

                  {errorInfo?.message && (
                    <span className="text-red-700 text-sm mt-1">{errorInfo.message}</span>
                  )}

                  <MBtn
                    type="2"
                    onClick={() => {
                      const url = resultInfo?.data?.formUrl || DEFAULT_FORM_URL;
                      window.open(url, "_blank");
                      setErrorInfo(null);
                      setResultInfo(null);
                      setCouponCode("");
                    }}
                    content="Pre-order Now"
                    className={cn(
                      "mx-auto mb-[124px] mo:mb-16 font-Space_Grotesk",
                      {
                        "pointer-events-none cursor-not-allowed opacity-50": !canPreOrder,
                        "pointer-events-auto cursor-pointer opacity-100": canPreOrder,
                      }
                    )}
                  />
                </div>
              </div>
            </AutoFlip>
          </div>
        )}
      </div>
    </Fragment>
  );
};

export default AROPod;

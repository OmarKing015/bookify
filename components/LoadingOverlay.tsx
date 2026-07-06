import Image from "next/image";

function LoadingOverlay() {
  return (
    <div className="loading-wrapper" role="status" aria-live="polite">
      <div className="loading-shadow-wrapper bg-white">
        <div className="loading-shadow">
          <Image
            src="/assets/loader.png"
            alt=""
            width={72}
            height={72}
            className="loading-animation"
          />
          <h2 className="loading-title">Beginning synthesis</h2>
          <div className="loading-progress">
            <p className="loading-progress-item">
              <span className="loading-progress-status" />
              Preparing your book
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LoadingOverlay;

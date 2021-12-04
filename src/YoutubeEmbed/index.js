import './style.css';
import { useRef, useCallback, useState } from "preact/hooks";
import { memo } from "preact/compat";

const YoutubeEmbed = ({ embedId, title }) => {
  const [loading, setLoading] = useState(false);
  const ref = useRef(null);
  
  const onClick = useCallback(() => {
    const iframe = document.createElement('iframe');
    iframe.style.display = 'none';
    iframe.setAttribute('src', `https://www.youtube.com/embed/${embedId}?autoplay=1&rel=0`);
    iframe.setAttribute('frameborder', '0');
    iframe.setAttribute('allowfullscreen', '1');
    iframe.setAttribute('allow', 'accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture');
    iframe.onload = () => {
      setLoading('done');
      iframe.style.display = 'block';
    }

    ref.current.parentNode.appendChild(iframe);
    setLoading(true);
  }, []);
  
  return (
    <div className="wrapper">
      {loading !== 'done' && (
        <div ref={ref} onClick={loading ? undefined : onClick} className="youtube-player">
          <div>{title}</div>
          <img src={`//i.ytimg.com/vi/${embedId}/hqdefault.jpg`} />
          <PlayButton />
        </div>
      )}
    </div>
  );
}

const PlayButton = memo(() => (
  <button>
    <svg viewBox="0 0 68 48">
      <path d="M66.52,7.74c-0.78-2.93-2.49-5.41-5.42-6.19C55.79,.13,34,0,34,0S12.21,.13,6.9,1.55 C3.97,2.33,2.27,4.81,1.48,7.74C0.06,13.05,0,24,0,24s0.06,10.95,1.48,16.26c0.78,2.93,2.49,5.41,5.42,6.19 C12.21,47.87,34,48,34,48s21.79-0.13,27.1-1.55c2.93-0.78,4.64-3.26,5.42-6.19C67.94,34.95,68,24,68,24S67.94,13.05,66.52,7.74z" />
      <path d="M 45,24 27,14 27,34" fill="#fff" />
    </svg>
  </button>
));

export default YoutubeEmbed;

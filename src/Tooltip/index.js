import './style.css';
import {useRef, useState, useEffect, useCallback} from "preact/hooks";

const WithTooltip = ({ content, children }) => {
  const [active, setActive] = useState(false);
  const [positionSet, setPositionSet] = useState(false);
  const [timeoutId, setTimeoutId] = useState(null);
  const parentRef = useRef(null);
  const ref = useRef(null);
  
  const setPosition = useCallback(() => {
    const tooltip = ref.current;
    const parent = parentRef.current;

    const { innerHeight, innerWidth } = window;
    const { bottom, top, height, left, right } = parent.getBoundingClientRect();

    top >= innerHeight - bottom
      ? tooltip.style.bottom = `${height}px`
      : tooltip.style.top = `${height}px`;

    left >= innerWidth - right
      ? tooltip.style.right = '0'
      : tooltip.style.left = '0';
    
    setPositionSet(true);
  }, []);
  
  const startTimeout = useCallback(() => {
    const id = setTimeout(setPosition, 700);
    setTimeoutId(id);
  }, []);
  
  const stopTimeout = useCallback(() => {
    if (timeoutId !== null) {
      clearTimeout(timeoutId);
      setTimeoutId(null);
    }
  }, [timeoutId]);
  
  useEffect(() => {
    if (active) startTimeout();
    else {
      stopTimeout();
      setPositionSet(false);
    }
  }, [active]);
  
  useEffect(() => {
    const parent = parentRef.current;
    parent.addEventListener('mouseenter', () => setActive(true));
    parent.addEventListener('touchstart', () => setActive(true));
    parent.addEventListener('mouseleave', () => setActive(false))
    parent.addEventListener('touchend', () => setActive(false))
  }, []);

  return (
    <div ref={parentRef} className="with-tooltip">
      {active && <div ref={ref} className={`tooltip ${positionSet ? 'active' : ''}`}>{content}</div>}
      {children}
    </div>
  )
}

export default WithTooltip;

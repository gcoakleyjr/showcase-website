import { useEffect, useMemo, useState } from "react";
import debounce from "lodash/debounce";

export function useCarouselMotion(
  trackWidth: number,
  trackMinOffset: number,
  trackMaxOffset: number
) {
  const [mouseDownAt, setMouseDownAt] = useState(0);
  const [percentage, setPercentage] = useState(trackMinOffset);
  const [prevPercentage, setPrevPercentage] = useState(0);
  const [windowWidth, setWindowWidth] = useState(0);
  const [scrollPosition, setScrollPosition] = useState(0);

  //
  //
  //Mouse Wheel Event functions
  const debouncedEnd = useMemo(() => {
    return debounce((value) => handleWheelEnd(value), 15);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    return () => {
      debouncedEnd.cancel();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function handleWheelEnd(value: number) {
    setPrevPercentage(value);
  }

  function handleWheelScroll(event: WheelEvent) {
    const scrollDelta = (event.deltaY + event.deltaX) * 1.4;
    const newScrollPosition = scrollPosition + scrollDelta;

    // Ensure the newScrollPositionX remains within the box limits
    const clampedScrollPosition = Math.max(
      0,
      Math.min(newScrollPosition, trackWidth)
    );

    setScrollPosition(clampedScrollPosition);
    const scrollPercentage = (scrollPosition / trackWidth) * 100;

    const nextPercentage = Math.max(
      Math.min(scrollPercentage, trackMaxOffset),
      trackMinOffset
    );

    setPercentage(nextPercentage);
    debouncedEnd(nextPercentage);
  }

  //
  //
  //Mouse Click Event Handlers
  function handleMouseDown(e: any) {
    setMouseDownAt(e.clientX);
  }

  function handleMouseUp() {
    setMouseDownAt(0);
    setPrevPercentage(percentage);
  }

  function handleOnMove(e: any) {
    if (mouseDownAt === 0) {
      return;
    }
    const delta = mouseDownAt - e.clientX;
    const maxDelta = windowWidth / 1.5;

    const percentageRaw = (delta / maxDelta) * 100;
    const nextPercentageRaw = prevPercentage + percentageRaw;
    const nextPercentage = Math.max(
      Math.min(nextPercentageRaw, trackMaxOffset),
      trackMinOffset
    );
    setScrollPosition((trackWidth * nextPercentage) / 100);

    setPercentage(nextPercentage);
  }

  function handleTouchMove(e: TouchEvent) {
    handleOnMove(e.touches[0]);
  }

  //Event handlers ran once
  useEffect(() => {
    const handleWindowResize = () => {
      setWindowWidth(window.innerWidth);
    };
    handleWindowResize();
    function handleTouchStart(e: TouchEvent) {
      handleMouseDown(e.touches[0]);
    }
    window.addEventListener("resize", handleWindowResize);
    window.addEventListener("mousedown", handleMouseDown);
    window.addEventListener("touchstart", handleTouchStart);

    return () => {
      window.removeEventListener("resize", handleWindowResize);
      window.removeEventListener("mousedown", handleMouseDown);
      window.removeEventListener("touchstart", handleTouchStart);
    };
  }, []);

  //Event handler constant update
  useEffect(() => {
    window.addEventListener("mousemove", handleOnMove);
    window.addEventListener("mouseup", handleMouseUp);
    window.addEventListener("wheel", handleWheelScroll);
    window.addEventListener("touchmove", handleTouchMove);
    window.addEventListener("touchend", handleMouseUp);
    return () => {
      window.removeEventListener("mousemove", handleOnMove);
      window.removeEventListener("mouseup", handleMouseUp);
      window.removeEventListener("wheel", handleWheelScroll);
      window.removeEventListener("touchmove", handleTouchMove);
      window.removeEventListener("touchend", handleMouseUp);
    };
  });

  return { percentage, scrollPosition };
}

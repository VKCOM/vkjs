interface Bounds {
  top: number;
  left: number;
  width: number;
  height: number;
}

export function getOffsetRect(elem: HTMLElement | Text | null): Bounds {
  const isElement = elem instanceof HTMLElement;

  if (typeof window === 'undefined' || !isElement) {
    return {
      top: 0,
      left: 0,
      width: 0,
      height: 0,
    };
  }

  const el = elem as HTMLElement;
  const box = el.getBoundingClientRect();
  const body = document.body;
  const doc = document.documentElement;
  const scrollTop = window.pageYOffset || doc.scrollTop || body.scrollTop;
  const scrollLeft = window.pageXOffset || doc.scrollLeft || body.scrollLeft;
  const clientTop = doc.clientTop || body.clientTop || 0;
  const clientLeft = doc.clientLeft || body.clientLeft || 0;

  return {
    top: Math.round(box.top + scrollTop - clientTop),
    left: Math.round(box.left + scrollLeft - clientLeft),
    width: el.offsetWidth,
    height: el.offsetHeight,
  };
}

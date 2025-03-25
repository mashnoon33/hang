import React from "react";
import { useEffect, useRef, useState } from "react";

export function StaticHeaderScrollBody({ children, className }: { children: React.ReactNode, className?: string }) {
  const headerRef = useRef<HTMLDivElement>(null);
  const [headerHeight, setHeaderHeight] = useState(0);

  useEffect(() => {
    if (headerRef.current) {
      setHeaderHeight(headerRef.current.offsetHeight);
    }
  }, []);

  const [header, ...rest] = React.Children.toArray(children);

  return (
    <div className={className}>
      <div ref={headerRef}>
        {header}
      </div>
      <div className={`overflow-y-auto`} style={{ height: `calc(100% - ${headerHeight}px)` }}>
        {rest}
      </div>
    </div>
  );
}

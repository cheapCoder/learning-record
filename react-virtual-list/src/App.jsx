import { useEffect, useMemo, useRef, useState, useCallback } from "react";

const VIEW_HEIGHT = 700;
const ITEM_HEIGHT = 100;
const PAGR_ITEM_COUNT = VIEW_HEIGHT / ITEM_HEIGHT;
const PRELOAD_COUNT = PAGR_ITEM_COUNT;

export default function App() {
  const [sources, setSources] = useState([]);
  const [range, setRange] = useState({ start: 0, end: 10 });

  const outerRef = useRef(null);

  const sliceSource = useMemo(() => sources.slice(range.start, range.end + 1), [range, sources]);
  const listHeight = useMemo(() => ITEM_HEIGHT * sources.length, [sources]);

  useEffect(() => {
    setSources(Array.from(new Array(4000).keys()));
  }, [])
  // TODO: 不可这么写
  const marginTop = useMemo(() => {
    //NOTE: Math.floor(outerRef.current?.scrollTop / ITEM_HEIGHT) * ITEM_HEIGHT  为了解决滑动效果不出现的问题, 其实就相当于下方注释的写法
    let offset = Math.floor(outerRef.current?.scrollTop / ITEM_HEIGHT) * ITEM_HEIGHT - PAGR_ITEM_COUNT * ITEM_HEIGHT
    console.log(outerRef.current?.scrollTop - PAGR_ITEM_COUNT * ITEM_HEIGHT);
    return offset < 0 ? 0 : offset;
  }, [outerRef.current?.scrollTop]);
  // const marginTop = useMemo(() => {
  //   return range.start * ITEM_HEIGHT;
  // }, [range.start]);

  function handleScroll(e) {
    // e.preventDefault();
    if (!outerRef.current) { return; }
    // console.log(outerRef.current.scrollHeight, outerRef.current.scrollTop);
    let startIndex = Math.floor(outerRef.current.scrollTop / ITEM_HEIGHT) - PRELOAD_COUNT;
    let endIndex = startIndex + PAGR_ITEM_COUNT + PRELOAD_COUNT * 2 + 1;
    // let endIndex = Math.floor(outerRef.current.scrollTop / ITEM_HEIGHT) + Math.ceil(outerRef.current.clientHeight / ITEM_HEIGHT) + PRELOAD_COUNT;

    setRange({
      start: startIndex < 0 ? 0 : startIndex,
      end: endIndex >= sources.length ? sources.length - 1 : endIndex
    })
  }

  return (
    <div className="outer" ref={outerRef} style={{ height: VIEW_HEIGHT, overflow: "auto" }} onScroll={handleScroll}>
      {/* NOTE： marginTop必须是离散的点，一个点代表一个item的marginTop值。否则才让页面下滑时container会以相同距离往下translateY，视觉上就是页面没有滑动效果，item直接切换了；只有当marginTop在同一个item在页面内就不变时，页面才不会同时往下translateY，这样就有滑动效果*/}
      <div className="container" style={{ height: (listHeight - marginTop) + "px", transform: `translateY(${marginTop}px)` }} >
        {/* <div className="container" style={{ height: (listHeight - marginTop)+"px", marginTop: marginTop+"px" }} > */}
        {sliceSource.map(val => <div data-index={val + 1} style={{ height: ITEM_HEIGHT }} className="item" key={val}>current value: {val + 1}</div>)}
      </div>
    </div>
  );
}

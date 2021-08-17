import { useState, useEffect, useMemo, useRef } from "react"


const VIEW_HEIGHT = 700;
const ITEM_HEIGHT = 100;
const PRELOAD_COUNT = VIEW_HEIGHT / ITEM_HEIGHT;

export default function App() {
  const [sources, setSources] = useState([]);
  const [range, setRange] = useState({ start: 0, end: 10 });

  const outerRef = useRef(null);

  useEffect(() => {
    setSources(Array.from(new Array(4000).keys()));
  }, [])



  const sliceSource = useMemo(() => sources.slice(range.start, range.end), [range, sources]);
const listHeight = useMemo(() => ITEM_HEIGHT * sources.length, [sources]);


  function handleScroll(e) {
    // TODO: 用preventDefault要禁用什么？scroll事件不能用这个函数禁用默认事件
    // e.preventDefault();
    console.log(outerRef.current.scrollHeight, outerRef.current.scrollTop);
    // let startIndex = 
  }


  return (
    <div ref={outerRef} style={{ height: VIEW_HEIGHT, overflow: "scroll" }} onScroll={handleScroll}>
      <div style={{height: listHeight}} >
        {sliceSource.map(val => <div style={{ height: ITEM_HEIGHT }} className="item" key={val}>the value is {val} 0.0</div>)}
      </div>
    </div>
  );
}


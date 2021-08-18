1.  `Math.floor(outerRef.current?.scrollTop / ITEM_HEIGHT) ` ITEM_HEIGHT 为了解决滑动效果不出现的问题, 其实就相当于 `range.start * ITEM_HEIGHT;`

2.  marginTop 必须是离散的点，一个点代表一个 item 的 marginTop 值。否则才让页面下滑时 container 会以相同距离往下 translateY，视觉上就是页面没有滑动效果，item 直接切换了；只有当 marginTop 在同一个 item 在页面内就不变时，页面才不会同时往下 translateY，这样就有滑动效果

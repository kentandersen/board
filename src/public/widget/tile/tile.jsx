import React from 'react';
import './tile.less';

export default function({top=0, left=0, width=1, height=1, children}) {

  const className = `tile -top-${top} -left-${left} -width-${width} -height-${height}`;

  return (
    <section className={className}>
      {children}
    </section>
  );
}

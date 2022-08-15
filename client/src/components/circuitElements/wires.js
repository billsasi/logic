import { Item } from './basic';

export class Wire extends Item {
  constructor(shapes, ctx, x, y, w, h) {
    super(shapes, ctx, x, y, w, h);
    this.isPort = true;
    this.state = null;
    this.sourcePrev = null;
    this.source = null;
    this.connections = new Set();
  }
  refresh(src = null) {
    for (let conn of this.connections) {
      if (conn === src) continue;
      conn.state = this.state;
      conn.refresh(this);
      if (conn.parent && conn.isInput) conn.parent.setOut();
    }
  }
  setState() {}
}

export class Connection extends Wire {
  constructor(shapes, ctx, start, end) {
    super(shapes, ctx, start.x, start.y, 0, 0);
    this.start = start;
    this.end = end;
  }

  draw() {
    const { start, end, ctx } = this;
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(start.x, start.y);
    ctx.lineTo(end.x, end.y);
    ctx.stroke();
  }
}

export class Port extends Wire {
  constructor(
    shapes,
    ctx,
    x,
    y,
    par = null,
    isInput = false,
    isOutput = false
  ) {
    super(shapes, ctx, x, y, 10, 10);
    this.parent = par;
    this.isInput = isInput;
    this.isOutput = isOutput;
  }

  move(x, y) {
    this.x = x;
    this.y = y;
    this.connections = new Set();
  }

  draw() {
    let { x, y, ctx } = this;
    let temp = ctx.strokeStyle;
    ctx.lineWidth = 1;
    ctx.strokeStyle = '#FF0000';
    ctx.beginPath();
    if (this.source || this.connections.size > 0) ctx.fillRect(x, y, 5, 5);
    else ctx.strokeRect(x, y, 5, 5);
    ctx.strokeStyle = temp;
  }
}

// class Port extends Item {
//   constructor(x, y, par, isInput = false, idx = 0) {
//     super(x, y, 10, 10);
//     this.isPort = true;
//     this.idx = idx;
//     this.parent = par;
//     this.isInput = isInput;
//     this.connection = null;
//   }

//   refresh() {
//     if (!this.connection) return;
//     if (this.isInput) {
//       this.setState(this.connection.state);
//     } else {
//       this.connection.setState(this.state);
//     }
//   }

//   move(x, y) {
//     this.x = x;
//     this.y = y;
//     this.connection = null;
//   }

//   setState(newState) {
//     let { parent, idx } = this;
//     this.state = newState;
//     if (!this.isInput) return;
//     parent.setOut();
//   }

//   draw() {
//     let temp = ctx.strokeStyle;
//     let { x, y } = this;
//     ctx.lineWidth = 1;
//     ctx.strokeStyle = '#FF0000';
//     ctx.beginPath();
//     if (this.connection) ctx.fillRect(x, y, 5, 5);
//     else ctx.strokeRect(x, y, 5, 5);
//     ctx.strokeStyle = temp;
//   }
// }

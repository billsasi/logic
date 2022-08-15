import { Component } from './basic';
import { Port } from './wires';

export class Gate extends Component {
  constructor(shapes, ctx, x, y, numInputs = 2) {
    super(shapes, ctx, x, y, 60, 40);
    let offset = 10;
    for (let i = 0; i < numInputs; i++) {
      this.inputs.push(
        new Port(shapes, ctx, x - 8, y + offset - 2.5, this, true)
      );
      offset += 20;
    }
    this.output = new Port(shapes, ctx, x + 62.5, y + 17.5, this, false, true);
  }
}

export class Or extends Gate {
  setOut() {
    const { inputs } = this;
    for (let port of inputs) {
      if (port.state) {
        this.state = true;
        this.output.state = true;
        return;
      }
      this.state = false;
      this.output.state = false;
    }
  }

  draw() {
    const { x, y, ctx } = this;
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.bezierCurveTo(x, y, x + 20, y + 20, x, y + 40);
    ctx.moveTo(x, y + 40);
    ctx.lineTo(x + 40, y + 40);
    ctx.moveTo(x, y);
    ctx.lineTo(x + 40, y);
    ctx.moveTo(x + 40, y);
    ctx.bezierCurveTo(x + 40, y, x + 85, y + 20, x + 40, y + 40);
    ctx.moveTo(x + 60, y + 20);
    ctx.lineTo(x + 64, y + 20);
    ctx.moveTo(x - 4, y + 10);
    ctx.lineTo(x + 4, y + 10);
    ctx.moveTo(x - 4, y + 30);
    ctx.lineTo(x + 4, y + 30);
    ctx.stroke();
    ctx.stroke();
  }
}

export class And extends Gate {
  setOut() {
    const { inputs } = this;
    let cur = true;
    for (let port of inputs) {
      cur = cur && port.state;
    }
    this.state = cur;
    this.output.state = cur;
  }

  draw() {
    const { x, y, ctx } = this;
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(x, y);
    ctx.lineTo(x, y + 40);
    ctx.lineTo(x + 40, y + 40);
    ctx.moveTo(x, y);
    ctx.lineTo(x + 40, y);
    ctx.arc(x + 40, y + 20, 20, 1.5 * Math.PI, 0.5 * Math.PI);
    ctx.moveTo(x + 60, y + 20);
    ctx.lineTo(x + 64, y + 20);
    ctx.moveTo(x - 4, y + 10);
    ctx.lineTo(x, y + 10);
    ctx.moveTo(x - 4, y + 30);
    ctx.lineTo(x, y + 30);
    ctx.stroke();
  }
}

export class Switch extends Component {
  constructor(shapes, ctx, x, y) {
    super(shapes, ctx, x, y, 50, 20);
    this.clickable = true;
    this.state = false;
    this.output = new Port(shapes, ctx, x + 54, y + 7.5, this, false, true);
    this.output.state = false;
  }

  toggle() {
    this.state = !this.state;
    this.output.state = !this.output.state;
  }

  draw() {
    const { x, y, state, ctx } = this;
    ctx.strokeRect(x, y, 50, 20);
    ctx.font = '12px sans-serif';
    if (state === false) ctx.strokeText('OFF', x + 4, y + 12.5);
    else ctx.strokeText('ON', x + 4, y + 12.5);
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(x + 50, y + 10);
    ctx.lineTo(x + 54, y + 10);
    ctx.stroke();
  }
}

export class Not extends Component {
  constructor(shapes, ctx, x, y) {
    super(shapes, ctx, x, y, 20, 20);
    this.inputs = [new Port(shapes, ctx, x - 9, y - 2.5, this, true)];
    this.output = new Port(shapes, ctx, x + 27.5, y - 2.5, this, false, true);
  }

  setOut() {
    this.state = !this.inputs[0].state;
    this.output.state = !this.inputs[0].state;
  }

  draw() {
    const { x, y, ctx } = this;
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(x + 20, y);
    ctx.lineTo(x, y + 10);
    ctx.lineTo(x, y - 10);
    ctx.closePath();
    ctx.moveTo(x + 26, y);
    ctx.arc(x + 23, y, 3, 0, 2 * Math.PI);
    ctx.moveTo(x + 26, y);
    ctx.lineTo(x + 30, y);
    ctx.moveTo(x - 4, y);
    ctx.lineTo(x, y);
    ctx.stroke();
  }
}

export class VoltSrc extends Component {
  constructor(shapes, ctx, x, y) {
    super(shapes, ctx, x, y, 20, 15);
    this.output = new Port(shapes, ctx, x + 10, y + 15, this, false, true);
    this.output.state = true;
  }

  draw() {
    const { x, y, ctx } = this;
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(x, y);
    ctx.lineTo(x + 20, y);
    ctx.moveTo(x + 10, y);
    ctx.lineTo(x + 10, y + 15);
    ctx.stroke();
  }
}

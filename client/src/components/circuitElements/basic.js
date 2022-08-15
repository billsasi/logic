export class Item {
  constructor(shapes, ctx, x, y, w, h) {
    this.id = Math.floor(Math.random() * 10000000000);
    this.x = x;
    this.y = y;
    this.width = w;
    this.height = h;
    this.isPort = false;
    this.state = null;
    this.ctx = ctx;
    shapes.push(this);
  }
  move(x, y) {
    this.x = x;
    this.y = y;
  }

  draw() {}
}

export class Component extends Item {
  constructor(shapes, ctx, x, y, h, w) {
    super(shapes, ctx, x, y, h, w);
    this.inputs = [];
    this.output = null;
  }

  move(x, y) {
    const dx = x - this.x;
    const dy = y - this.y;
    this.x = x;
    this.y = y;
    for (let input of this.inputs) {
      input.move(input.x + dx, input.y + dy);
    }
    this.output.move(this.output.x + dx, this.output.y + dy);
  }

  draw() {}
}

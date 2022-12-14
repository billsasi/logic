import React, { useState, useEffect, useLayoutEffect, useRef } from 'react';
import { Connection, Port } from './circuitElements/wires';
import { And, Or, Not, Switch } from './circuitElements/components';
import { getNewShape } from './Utils';

let send = false;
const keyHandler = (e) => {
  console.log(e);
  if (e.key === 'Escape' && selected) {
    shapes.pop();
    selected = null;
    drawingWire = false;
  } else if (e.metaKey && e.key === 's') {
    e.preventDefault();
    send = true;
    console.log(send);
  }
};

let shapes = [];
let selected = null;
let curWire = null;
let drawingWire = false;
document.onkeydown = keyHandler;

const Canvas = ({
  setSavedShapes,
  newShape,
  setNewShape,
  proj,
  editProject,
}) => {
  const canvasRef = useRef(null);
  const ctxRef = useRef(null);

  function startWire(e) {
    const src = selected;
    const start = {
      x: selected.x + 2.5,
      y: selected.y + 2.5,
    };
    selected = new Connection(shapes, ctxRef.current, start, start);
    if (src != null) {
      src.connections.add(selected);
      selected.connections.add(src);
    }
    curWire = selected;
    drawingWire = true;
  }

  function endWire(e) {
    console.log(selected);
    const pt = new Port(
      shapes,
      ctxRef.current,
      curWire.end.x - 2.5,
      curWire.end.y - 2.5,
      null
    );
    curWire.connections.add(pt);
    if (curWire.state != null) {
      pt.source = curWire;
    }
    pt.connections.add(curWire);
    drawingWire = false;
    selected = null;
  }

  function connectWire() {
    console.log('hi');
    if (selected.state != null) {
      curWire.source = selected;
    } else if (curWire.state != null) {
      selected.source = curWire;
    } else if (selected.state != null && curWire.state != null) {
      console.log('error: contention');
    }
    curWire.connections.add(selected);
    selected.connections.add(curWire);
    drawingWire = false;
    curWire = null;
  }

  function getPressedShape(e) {
    const rect = e.target.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY;
    for (let shape of shapes) {
      let off = shape.isPort ? 5 : 0;
      if (
        x + off >= shape.x &&
        x - off <= shape.x + shape.width &&
        y + off >= shape.y &&
        y - off <= shape.y + shape.height
      ) {
        return shape;
      }
    }
    return null;
  }

  function handleMouseDown(e) {
    const rect = e.target.getBoundingClientRect();
    let { clientX, clientY } = e;
    clientX -= rect.left;
    if (selected && !selected.isPort) {
      selected = null;
      return;
    }
    selected = getPressedShape(e);
    console.log(selected);

    if (!drawingWire && selected && selected.isPort) {
      startWire(e);
      return;
    }
    if (drawingWire) {
      if (!selected) endWire(e);
      else if (selected.isPort) connectWire();
      return;
    }
    if (!selected) return;
    if (selected.clickable && e.metaKey) {
      selected.toggle();
      selected = null;
      return;
    }
    selected.offset = {
      x: clientX - selected.x,
      y: clientY - selected.y,
    };
  }

  function handleMouseMove(e) {
    const rect = e.target.getBoundingClientRect();
    let { clientX, clientY } = e;
    clientX -= rect.left;
    if (drawingWire) {
      const { x, y } = selected.start;
      selected.end =
        Math.abs(clientX - x) > Math.abs(clientY - y)
          ? { x: clientX, y: y }
          : { x: x, y: clientY };
      return;
    }
    if (!selected || selected.isPort) return;
    selected.move(clientX - selected.offset.x, clientY - selected.offset.y);
  }

  const drawGrid = () => {
    ctxRef.current.save();
    ctxRef.current.globalAlpha = 0.05;
    ctxRef.current.beginPath();
    for (let x = 0; x < ctxRef.current.canvas.width; x += 50) {
      ctxRef.current.moveTo(x, 0);
      ctxRef.current.lineTo(x, ctxRef.current.canvas.height);
    }
    for (let y = 0; y < ctxRef.current.canvas.height; y += 50) {
      ctxRef.current.moveTo(0, y);
      ctxRef.current.lineTo(ctxRef.current.canvas.width, y);
    }
    ctxRef.current.stroke();
    ctxRef.current.restore();
  };

  const update = () => {
    ctxRef.current.clearRect(
      0,
      0,
      canvasRef.current.width,
      canvasRef.current.height
    );
    drawGrid();

    for (let shape of shapes) {
      if (shape === selected) ctxRef.current.strokeStyle = 'blue';
      if (shape.isOutput) {
        shape.refresh();
      }
      if (shape.isPort) {
        if (shape.state === true) ctxRef.current.strokeStyle = 'red';
      }
      shape.draw();
      ctxRef.current.strokeStyle = 'black';
    }
    if (send) {
      setSavedShapes([...shapes]);
      editProject(proj);
      send = false;
    }

    requestAnimationFrame(update);
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    ctxRef.current = ctx;

    update();
  }, []);

  useEffect(() => {
    if (newShape !== '') {
      selected = getNewShape(shapes, ctxRef.current, newShape);
      selected.offset = { x: 0, y: 0 };
      setNewShape('');
    }
  }, [newShape, setNewShape]);

  useEffect(() => {
    shapes = proj.shapes;
  }, [proj]);

  return (
    <canvas
      ref={canvasRef}
      width={window.innerWidth * 0.9}
      height={window.innerHeight}
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onKeyDown={keyHandler}
    ></canvas>
  );
};

export default Canvas;

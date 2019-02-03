import '@/styles/main.scss';

import * as math from 'mathjs';
import * as dat from 'dat.gui';

class Sketch {
  constructor(selector) {
    this.canvas = document.createElement('canvas');
    this.ctx = this.canvas.getContext('2d');

    this.vw = window.innerWidth;
    this.vh = window.innerHeight;

    this.container = document.querySelector(selector);
    this.container.appendChild(this.canvas);

    this.dpi = window.devicePixelRatio;

    this.time = 0;

    this.resize = this.resize.bind(this);
    this.animate = this.animate.bind(this);

    this.points = new Array(16);
    this.projected2D = new Array(16);

    this.setupSettings();
    this.setupResize();
    this.addObjects();


    this.resize();
    this.animate();
  }

  setupResize() {
    window.addEventListener('resize', this.resize);
  }

  setupSettings() {
    this.settings = {
      size: Math.min(Math.min(this.vw, this.vh) / 2, 500),
      distance: 2,
      color: true,
      rotationX: false,
      rotationY: true,
      rotationZ: false,
      rotationXW: false,
      rotationYW: false,
      rotationZW: true,
    };
    this.gui = new dat.GUI();
    this.gui.add(this.settings, 'size', 20, 500);
    this.gui.add(this.settings, 'distance', 1.2, 10);
    this.gui.add(this.settings, 'color');
    this.gui.add(this.settings, 'rotationX');
    this.gui.add(this.settings, 'rotationY');
    this.gui.add(this.settings, 'rotationZ');
    this.gui.add(this.settings, 'rotationXW');
    this.gui.add(this.settings, 'rotationYW');
    this.gui.add(this.settings, 'rotationZW');
  }


  resize() {
    this.vw = window.innerWidth;
    this.vh = window.innerHeight;
    this.canvas.width = this.vw * this.dpi;
    this.canvas.height = this.vh * this.dpi;
    this.canvas.style.width = `${this.vw}px`;
    this.canvas.style.height = `${this.vh}px`;
  }

  addObjects() {
    this.points[0] = [-0.5, -0.5, -0.5, 0.5];
    this.points[1] = [0.5, -0.5, -0.5, 0.5];
    this.points[2] = [0.5, 0.5, -0.5, 0.5];
    this.points[3] = [-0.5, 0.5, -0.5, 0.5];
    this.points[4] = [-0.5, -0.5, 0.5, 0.5];
    this.points[5] = [0.5, -0.5, 0.5, 0.5];
    this.points[6] = [0.5, 0.5, 0.5, 0.5];
    this.points[7] = [-0.5, 0.5, 0.5, 0.5];
    this.points[8] = [-0.5, -0.5, -0.5, -0.5];
    this.points[9] = [0.5, -0.5, -0.5, -0.5];
    this.points[10] = [0.5, 0.5, -0.5, -0.5];
    this.points[11] = [-0.5, 0.5, -0.5, -0.5];
    this.points[12] = [-0.5, -0.5, 0.5, -0.5];
    this.points[13] = [0.5, -0.5, 0.5, -0.5];
    this.points[14] = [0.5, 0.5, 0.5, -0.5];
    this.points[15] = [-0.5, 0.5, 0.5, -0.5];
  }


  animate() {
    this.time += 0.01;

    requestAnimationFrame(this.animate);

    this.render();
  }

  connectPoints(offset, i, j, color) {
    this.ctx.strokeStyle = this.settings.color ? color : '#fff';
    this.ctx.beginPath();
    const a = this.projected2D[i + offset];
    const b = this.projected2D[j + offset];

    this.ctx.moveTo(a[0] * this.dpi * this.settings.size, a[1] * this.dpi * this.settings.size);
    this.ctx.lineTo(b[0] * this.dpi * this.settings.size, b[1] * this.dpi * this.settings.size);
    this.ctx.closePath();
    this.ctx.stroke();
  }

  render() {
    const rotationX = [
      [1, 0, 0],
      [0, Math.cos(this.time), -Math.sin(this.time)],
      [0, Math.sin(this.time), Math.cos(this.time)],
    ];

    const rotationY = [
      [Math.cos(this.time), 0, -Math.sin(this.time)],
      [0, 1, 0],
      [Math.sin(this.time), 0, Math.cos(this.time)],

    ];

    const rotationZ = [
      [Math.cos(this.time), -Math.sin(this.time), 0],
      [Math.sin(this.time), Math.cos(this.time), 0],
      [0, 0, 1],
    ];

    const rotationXW = [
      [Math.cos(this.time), 0, 0, -Math.sin(this.time)],
      [0, 1, 0, 0],
      [0, 0, 1, 0],
      [Math.sin(this.time), 0, 0, Math.cos(this.time)],
    ];

    const rotationYW = [
      [1, 0, 0, 0],
      [0, Math.cos(this.time), 0, -Math.sin(this.time)],
      [0, 0, 1, 0],
      [0, Math.sin(this.time), 0, Math.cos(this.time)],
    ];

    const rotationZW = [
      [1, 0, 0, 0],
      [0, 1, 0, 0],
      [0, 0, Math.cos(this.time), -Math.sin(this.time)],
      [0, 0, Math.sin(this.time), Math.cos(this.time)],
    ];


    this.ctx.clearRect(0, 0, this.vw * this.dpi, this.vh * this.dpi);
    this.ctx.save();
    this.ctx.translate(this.vw * this.dpi / 2, this.vh * this.dpi / 2);
    this.ctx.fillStyle = '#fff';

    for (let i = 0; i < this.points.length; i += 1) {
      let rotated4D = this.points[i];

      rotated4D = this.settings.rotationXW ? math.multiply(rotationXW, rotated4D) : rotated4D;
      rotated4D = this.settings.rotationYW ? math.multiply(rotationYW, rotated4D) : rotated4D;
      rotated4D = this.settings.rotationZW ? math.multiply(rotationZW, rotated4D) : rotated4D;

      const w = 1 / (this.settings.distance - rotated4D[3]);


      const projection3D = [
        [w, 0, 0, 0],
        [0, w, 0, 0],
        [0, 0, w, 0],
      ];

      const projected3D = math.multiply(projection3D, rotated4D);

      let rotated3D = projected3D;

      rotated3D = this.settings.rotationX ? math.multiply(rotationX, rotated3D) : rotated3D;
      rotated3D = this.settings.rotationY ? math.multiply(rotationY, rotated3D) : rotated3D;
      rotated3D = this.settings.rotationZ ? math.multiply(rotationZ, rotated3D) : rotated3D;
      //
      const z = 1 / (this.settings.distance - rotated3D[2]);

      const projection = [
        [z, 0, 0],
        [0, z, 0],
      ];

      const projected2D = math.multiply(projection, rotated3D);
      this.projected2D[i] = projected2D;

      const [x, y] = projected2D;
      this.ctx.beginPath();
      this.ctx.arc(x * this.dpi * this.settings.size, y * this.dpi * this.settings.size, 2, 0, 2 * Math.PI);
      this.ctx.closePath();
      this.ctx.fill();
    }

    for (let i = 0; i < 4; i += 1) {
      this.connectPoints(0, i, i + 4, '#fff');
      this.connectPoints(0, i, (i + 1) % 4, '#fff');
      this.connectPoints(0, i + 4, (i + 1) % 4 + 4, '#fff');
    }

    for (let i = 0; i < 4; i += 1) {
      this.connectPoints(8, i, i + 4, '#f0f');
      this.connectPoints(8, i, (i + 1) % 4, '#f0f');
      this.connectPoints(8, i + 4, (i + 1) % 4 + 4, '#f0f');
    }

    for (let i = 0; i < 8; i += 1) {
      this.connectPoints(0, i, i + 8, '#0f0');
    }

    this.ctx.restore();
  }
}

// eslint-disable-next-line no-new
new Sketch('#container');

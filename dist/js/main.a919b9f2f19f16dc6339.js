(window.webpackJsonp=window.webpackJsonp||[]).push([[0],{153:function(t,i,s){"use strict";var e=function(){function t(t,i){for(var s=0;s<i.length;s++){var e=i[s];e.enumerable=e.enumerable||!1,e.configurable=!0,"value"in e&&(e.writable=!0),Object.defineProperty(t,e.key,e)}}return function(i,s,e){return s&&t(i.prototype,s),e&&t(i,e),i}}();s(580);var n=a(s(154)),h=a(s(579));function a(t){if(t&&t.__esModule)return t;var i={};if(null!=t)for(var s in t)Object.prototype.hasOwnProperty.call(t,s)&&(i[s]=t[s]);return i.default=t,i}new(function(){function t(i){!function(t,i){if(!(t instanceof i))throw new TypeError("Cannot call a class as a function")}(this,t),this.canvas=document.createElement("canvas"),this.ctx=this.canvas.getContext("2d"),this.vw=window.innerWidth,this.vh=window.innerHeight,this.container=document.querySelector(i),this.container.appendChild(this.canvas),this.dpi=window.devicePixelRatio,this.time=0,this.resize=this.resize.bind(this),this.animate=this.animate.bind(this),this.points=new Array(8),this.projected2D=new Array(8),this.size=100,this.distance=2,this.setupSettings(),this.setupResize(),this.addObjects(),this.resize(),this.animate()}return e(t,[{key:"setupResize",value:function(){window.addEventListener("resize",this.resize)}},{key:"setupSettings",value:function(){this.settings={size:100,distance:2,orthographic:!1},this.gui=new h.GUI,this.gui.add(this.settings,"size",20,500),this.gui.add(this.settings,"distance",1,10),this.gui.add(this.settings,"orthographic")}},{key:"resize",value:function(){this.vw=window.innerWidth,this.vh=window.innerHeight,this.canvas.width=this.vw*this.dpi,this.canvas.height=this.vh*this.dpi,this.canvas.style.width=this.vw+"px",this.canvas.style.height=this.vh+"px"}},{key:"addObjects",value:function(){this.points[0]=[-.5,-.5,-.5],this.points[1]=[.5,-.5,-.5],this.points[2]=[.5,.5,-.5],this.points[3]=[-.5,.5,-.5],this.points[4]=[-.5,-.5,.5],this.points[5]=[.5,-.5,.5],this.points[6]=[.5,.5,.5],this.points[7]=[-.5,.5,.5]}},{key:"animate",value:function(){this.time+=.01,requestAnimationFrame(this.animate),this.render()}},{key:"connectPoints",value:function(t,i){this.ctx.strokeStyle="#fff",this.ctx.beginPath();var s=this.projected2D[t],e=this.projected2D[i];this.ctx.moveTo(s[0]*this.dpi*this.settings.size,s[1]*this.dpi*this.settings.size),this.ctx.lineTo(e[0]*this.dpi*this.settings.size,e[1]*this.dpi*this.settings.size),this.ctx.closePath(),this.ctx.stroke()}},{key:"render",value:function(){var t=[[1,0,0],[0,Math.cos(this.time),-Math.sin(this.time)],[0,Math.sin(this.time),Math.cos(this.time)]],i=[[Math.cos(this.time),0,-Math.sin(this.time)],[0,1,0],[Math.sin(this.time),0,Math.cos(this.time)]],s=[[Math.cos(this.time),-Math.sin(this.time),0],[Math.sin(this.time),Math.cos(this.time),0],[0,0,1]];this.ctx.clearRect(0,0,this.vw*this.dpi,this.vh*this.dpi),this.ctx.save(),this.ctx.translate(this.vw*this.dpi/2,this.vh*this.dpi/2),this.ctx.fillStyle="#fff";for(var e=0;e<this.points.length;e+=1){var h=n.multiply(s,this.points[e]);h=n.multiply(t,h),h=n.multiply(i,h);var a=1/(this.settings.distance-h[2]),o=this.settings.orthographic?[[1/this.settings.distance,0,0],[0,1/this.settings.distance,0],[0,0,1/this.settings.distance]]:[[a,0,0],[0,a,0],[0,0,a]],c=n.multiply(o,h);this.projected2D[e]=c}for(var r=0;r<4;r+=1)this.connectPoints(r,r+4),this.connectPoints(r,(r+1)%4),this.connectPoints(r+4,(r+1)%4+4);this.ctx.restore()}}]),t}())("#container")},580:function(t,i){}},[[153,1,2]]]);
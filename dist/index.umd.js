!function(t,e){"object"==typeof exports&&"undefined"!=typeof module?module.exports=e(require("konva")):"function"==typeof define&&define.amd?define(["konva"],e):t.streamchart=e(t.konva)}(this,function(t){return t=t&&t.hasOwnProperty("default")?t.default:t,function(e,i){var a=this;void 0===i&&(i={}),this.viewDuration=5e3,this.values=[],this.options={limit:"auto"},this.limits=[0,1],this.loop=function(){var t=[],e=performance.now();a.values.forEach(function(i,o){var s=1-(e-i.time)/a.viewDuration;0!=o&&(t.push(s*a.stage.width()),t.push(a.lastValue)),t.push(s*a.stage.width());var n=(i.value-a.limits[0])/a.limits[1];a.lastValue=a.stage.height()-n*a.stage.height(),t.push(a.lastValue)}),t.push(a.stage.width()),t.push(a.lastValue),a.line.setPoints(t),a.layer.draw(),requestAnimationFrame(a.loop)},this.addValue=function(t){var e=performance.now();if(a.values.push({time:e,value:t}),a.values=a.values.filter(function(t){return e-t.time<a.viewDuration+1e3}),"auto"==a.options.limit){var i=Math.max.apply(Math,a.values.map(function(t){return t.value})),o=Math.min.apply(Math,a.values.map(function(t){return t.value}));a.limits=[o,i]}a.limTop.setText(a.limits[1].toFixed(2)),a.limBot.setText(a.limits[0].toFixed(2)),a.textLayer.draw()},this.options=Object.assign({},this.options,{options:i});var o=this.stage=new t.Stage({container:e,width:e.offsetWidth,height:100}),s=this.layer=new t.Layer;this.line=new t.Line({x:0,y:0,points:[],stroke:"red"}),s.add(this.line),o.add(s),s.draw(),this.textLayer=new t.Layer,this.limTop=new t.Text({x:o.width()/2,y:0,text:"1.00",points:[],fontSize:14,fontFamily:"Roboto",fill:"gray"}),this.limBot=new t.Text({x:o.width()/2,y:o.height()-14,text:"0.00",points:[],fontSize:14,fontFamily:"Roboto",fill:"gray"}),this.textLayer.add(this.limTop),this.textLayer.add(this.limBot),o.add(this.textLayer),requestAnimationFrame(this.loop)}});
//# sourceMappingURL=index.umd.js.map

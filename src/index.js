import Konva from "konva";

export default class StreamChart {
  viewDuration = 5000
  values = []
  options = {
    limit: 'auto'
  }
  limits = [0,1]

  constructor(divref, options = {}) {

    this.options = {
      ...this.options,
      options
    }
    // first we need to create a stage
    var stage = this.stage = new Konva.Stage({
      container: divref, // id of container <div>
      width: divref.offsetWidth,
      height: 100
    });

    var layer = this.layer = new Konva.Layer();

    // create our shape
    
    this.line = new Konva.Line({
      x: 0,
      y: 0,
      points: [],
      stroke: 'red',
    });
    
    // add the shape to the layer
    layer.add(this.line);

    // add the layer to the stage
    stage.add(layer);

    // draw the image
    layer.draw();

    this.textLayer = new Konva.Layer();

    this.limTop = new Konva.Text({
      x: stage.width()/2,
      y: 0,
      text: "1.00",
      points: [],
      fontSize: 14,
      fontFamily: 'Roboto',
      fill: 'gray'
    });

    this.limBot = new Konva.Text({
      x: stage.width()/2,
      y: stage.height() - 14,
      text: "0.00",
      points: [],
      fontSize: 14,
      fontFamily: 'Roboto',
      fill: 'gray'
    });
    this.textLayer.add(this.limTop);
    this.textLayer.add(this.limBot);
    stage.add(this.textLayer);

    requestAnimationFrame(this.loop)

  }

  loop = () => {
    
    const points = []
    const now = performance.now()
    this.values.forEach((v ,i)=> {
      const timesince = now - v.time
      const timeprogress = 1 - (timesince / this.viewDuration)
      if (i != 0) {
        points.push(timeprogress * this.stage.width())
        points.push(this.lastValue)
      }
      points.push(timeprogress * this.stage.width())
      const heightProgress = (v.value - this.limits[0]) / this.limits[1]
      this.lastValue = this.stage.height() - (heightProgress * this.stage.height())
      points.push(this.lastValue)
    })

    points.push(this.stage.width())
    points.push(this.lastValue)
    
    this.line.setPoints(points)

    this.layer.draw();
    requestAnimationFrame(this.loop)
  }

  addValue = (value) => {
    const time = performance.now()

    this.values.push({ time, value })
    this.values = this.values.filter(v => time - v.time < this.viewDuration + 1000)
    if (this.options.limit == 'auto') {
      const max = Math.max(...this.values.map(v => v.value))
      const min = Math.min(...this.values.map(v => v.value))
      this.limits = [min, max]
    }
    this.limTop.setText(this.limits[1].toFixed(2))
    this.limBot.setText(this.limits[0].toFixed(2))
    this.textLayer.draw()
  }
}

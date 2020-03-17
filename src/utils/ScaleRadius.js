import { max} from "d3-array"
import {scaleSqrt} from "d3-scale"

class ScaleRadius {
  constructor(dataArr, maxRange=40) {
    this.dataArr = dataArr
    this.maxVal = max(dataArr) 
    this.maxRange = maxRange
  }

  radius(num) {
    const processingFunc = scaleSqrt()
      .domain([0, this.maxVal])
      .range([0, this.maxRange]);
    return processingFunc(num)
  }
}

export default ScaleRadius
import * as THREE from 'three';
import SunCalc from 'suncalc'
import moment from 'moment-timezone'

const SunPositions = (lat, lon, start) => {
  let arr = []
  let time = new Date(start)
  arr.push(time)

  for (let i = 0; i < 47; i++) {
  time = moment(time).add(30, 'm').toDate()
  arr.push(time)
  }

  let sunPos = arr.map(time => SunCalc.getPosition(time, lat, lon))
  
  let sunAzimuths = []
  for (let i = 0; i < sunPos.length; i++) {
    sunAzimuths.push(sunPos[i]['azimuth'])
  }

  let sunAltitudes = []
  for (let i = 0; i < sunPos.length; i++) {
    sunAltitudes.push(sunPos[i]['altitude'])
  }

  let phi = sunAltitudes.map(angle => (Math.PI / 2) - angle)

  let sunPositions = []
  sunPositions = phi.map(function (x, i) {
    return new THREE.Vector3().setFromSphericalCoords(8, x, -sunAzimuths[i])
  }
  )

  return (
    sunPositions
  )
  }
  
  export default SunPositions
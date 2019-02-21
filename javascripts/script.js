const body = document.querySelector('body')

const cameraRadios = Array.from(document.querySelectorAll('.camera-list input'))
const cameraImages = Array.from(document.querySelectorAll('.street-view .image-container .item'))

const mapContainer = document.querySelector('.map .image-container')
const mapImages = Array.from(document.querySelectorAll('.map .image-container .item'))
const mapLength = mapImages.length - 1

let scrollTimer = undefined
let currentMap = 0
let mouseIsInMap = false

function changeCamera () {
  const checked = cameraRadios.find(radio => radio.checked)
  
  if (checked) {
    cameraImages.forEach(camera => camera.style.opacity = 0)
    document.querySelector(`.${checked.value}`).style.opacity = 1
  }
}

function nextMap (current) {
  return current < mapLength ? current + 1 : 0
}

function previousMap (current) {
  return current > 0 ? current - 1 : mapLength 
}

function changeMap (event) {
  console.log({x: event.x})
  const isScrollUp = event.deltaY < 0
  const isScrollDown = event.deltaY > 0

  if ((currentMap === 0 && isScrollUp) || (currentMap === mapLength && isScrollDown)) {
    mapContainer.addEventListener('mouseleave', function () {
      window.removeEventListener('wheel', changeMap)
    })

    return
  }

  event.preventDefault()
  
  clearTimeout(scrollTimer)

  scrollTimer = setTimeout(function () {
    const current = mapImages.findIndex(image => image.classList.contains('active')) || 0
    currentMap = isScrollDown ? nextMap(current) : previousMap(current)
    const newImage = mapImages[currentMap]
    
    mapImages.forEach(image => image.classList.remove('active'))
    newImage.classList.add('active')
  }, 200)
}

cameraRadios.forEach(camera => camera.addEventListener('change', changeCamera))
mapContainer.addEventListener('mouseover', function () {
  window.addEventListener('wheel', changeMap)
})
mapContainer.addEventListener('mouseleave', function () {
  window.removeEventListener('wheel', changeMap)
})

document.querySelector('label[for="camera-1"]').click()
changeCamera()

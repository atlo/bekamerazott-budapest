const body = document.querySelector('body')

const cameraRadios = Array.from(document.querySelectorAll('.camera-list input'))
const cameraImages = Array.from(document.querySelectorAll('.street-view .image-container .item'))

const mapContainer = document.querySelector('.map .image-container')
const mapImages = Array.from(document.querySelectorAll('.map .image-container .item'))
const mapLength = mapImages.length - 1

let lastScrollPosition = undefined
let scrollTimer = undefined

function findChecked (inputs) {
  return inputs.find(input => input.checked)
}

function changeCamera () {
  const checked = findChecked(cameraRadios)
  
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
  event.preventDefault()
  
  clearTimeout(scrollTimer)

  scrollTimer = setTimeout(function () {
    const {deltaY} = event
    const current = mapImages.findIndex(image => image.classList.contains('active')) || 0
    const newImage = deltaY > 0 ? mapImages[nextMap(current)] : mapImages[previousMap(current)]
    
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
const body = document.querySelector('body')

const cameraRadios = Array.from(document.querySelectorAll('.camera-list input'))
const cameraImages = Array.from(document.querySelectorAll('.street-view .image-container .item'))

const mapContainer = document.querySelector('.map .image-container')
const mapImages = Array.from(document.querySelectorAll('.map .image-container .item'))
const mapDescriptions = Array.from(document.querySelectorAll('.map-description > li'))
const mapLength = mapImages.length - 1

const nextMapButtons = Array.from(document.querySelectorAll('.next-map'))
const previousMapButtons = Array.from(document.querySelectorAll('.previous-map'))

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

function scrollNext (current) {
  return current < mapLength ? current + 1 : 0
}

function scrollPrevious (current) {
  return current > 0 ? current - 1 : mapLength 
}

function getActiveMapIndex () {
  return mapImages.findIndex(image => image.classList.contains('active')) || 0
}

function handleWheel (event) {
  const isScrollUp = event.deltaY < 0
  const isScrollDown = event.deltaY > 0

  if ((currentMap === 0 && isScrollUp) || (currentMap === mapLength && isScrollDown)) {
    mapContainer.addEventListener('mouseleave', function () {
      window.removeEventListener('wheel', handleWheel)
    })

    return
  }

  event.preventDefault()
  
  clearTimeout(scrollTimer)

  scrollTimer = setTimeout(function () {
    currentMap = isScrollDown ? scrollNext(currentMap) : scrollPrevious(currentMap)
    
    setMap(currentMap)
  }, 200)
}

function previousMap () {
  console.log('pre')
  if (currentMap > 0) {
    console.log('lol')
    currentMap -= 1
    setMap()
  }
}

function nextMap () {
  if (currentMap < mapLength) {
    currentMap += 1
    setMap()
  }
}

function setMap () {
  const newImage = mapImages[currentMap]
  const newDescription = mapDescriptions[currentMap]
  console.log({currentMap, newImage, newDescription})
  mapImages.forEach(removeActive)
  mapDescriptions.forEach(removeActive)

  addActive(newImage)
  addActive(newDescription)
}

function removeActive (element) {
  element.classList.remove('active')
}

function addActive (element) {
  element.classList.add('active')
}

cameraRadios.forEach(camera => camera.addEventListener('change', changeCamera))
mapContainer.addEventListener('mouseover', function () {
  window.addEventListener('wheel', handleWheel)
})
mapContainer.addEventListener('mouseleave', function () {
  window.removeEventListener('wheel', handleWheel)
})
nextMapButtons.forEach(button => button.addEventListener('click', nextMap))
previousMapButtons.forEach(button => button.addEventListener('click', previousMap))

document.querySelector('label[for="camera-1"]').click()
changeCamera()

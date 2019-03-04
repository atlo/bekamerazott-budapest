const titleContainer = document.querySelector('.title')
const highlighted = document.querySelector('.highlighted')
const titleContainerWidth = titleContainer.offsetWidth
const titleContainerHeight = titleContainer.offsetHeight

function getRelativeCoordinates (event, element){

  const position = {
    x: event.pageX,
    y: event.pageY
  }

  const offset = {
    left: element.offsetLeft,
    top: element.offsetTop
  }

  let reference = element.offsetParent

  while (reference != null) {
    offset.left += reference.offsetLeft
    offset.top += reference.offsetTop
    reference = reference.offsetParent
  }

  return { 
    x: position.x - offset.left,
    y: position.y - offset.top,
  }

}

function calculatePercentage (x, y) {
  let xPercentage = x / titleContainerWidth * 100
  let yPercentage = y / titleContainerHeight * 100

  if (xPercentage > 89.5) {
    xPercentage = 89.5
  } else if (xPercentage < 10.5) {
    xPercentage = 10.5
  }

  if (yPercentage > 55) {
    yPercentage = 55
  } else if (yPercentage < 45) {
    yPercentage = 45
  }

  return [xPercentage, yPercentage]
}

function moveHighlight (event) {
  const {x, y} = getRelativeCoordinates(event, titleContainer)
  const [xPercentage, yPercentage] = calculatePercentage(x, y)
  
  highlighted.style.clipPath = `circle(14% at ${xPercentage}% ${yPercentage}%)`
}

titleContainer.addEventListener('mousemove', moveHighlight)

/* -webkit-clip-path: circle(12% at 50% 50%);
  clip-path: circle(12% at 50% 50%); */
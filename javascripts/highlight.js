const titleContainer = document.querySelector('.title')
const highlighted = document.querySelector('.highlighted')
const titleContainerWidth = titleContainer.offsetWidth

function getRelativeCoordinates (event, element){

  const position = {
    x: event.pageX,
    y: event.pageY
  };

  const offset = {
    left: element.offsetLeft,
    top: element.offsetTop
  };

  let reference = element.offsetParent;

  while(reference != null){
    offset.left += reference.offsetLeft;
    offset.top += reference.offsetTop;
    reference = reference.offsetParent;
  }

  return { 
    x: position.x - offset.left,
    y: position.y - offset.top,
  }; 

}

function calculatePercentage (x) {
  const percentage = x / titleContainerWidth * 100

  if (percentage > 84) {
    return 84
  } else if (percentage < 16) {
    return 16
  } else {
    return percentage
  }
}

function moveHighlight (event) {
  const {x} = getRelativeCoordinates(event, titleContainer)
  const xPercentage = calculatePercentage(x)
  
  highlighted.style.clipPath = `circle(21.5% at ${xPercentage}% 50%)`
}

titleContainer.addEventListener('mousemove', moveHighlight)

/* -webkit-clip-path: circle(12% at 50% 50%);
  clip-path: circle(12% at 50% 50%); */
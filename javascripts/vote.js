const voteListRadios = document.querySelector('.vote-list.radios')
const voteListResults = document.querySelector('.vote-list.results')
const voteRadios = Array.from(document.querySelectorAll('.vote-list input'))
const resultElements = Array.from(document.querySelectorAll('.results li div'))

const resultsMock = [
  {
    "id": 1,
    "vote": 3
  },
  {
    "id": 2,
    "vote": 4
  },
  {
    "id": 3,
    "vote": 3
  },
  {
    "id": 4,
    "vote": 10
  },
  {
    "id": 5,
    "vote": 3
  },
  {
    "id": 6,
    "vote": 10
  },
  {
    "id": 7,
    "vote": 8
  },
  {
    "id": 8,
    "vote": 10
  },
  {
    "id": 9,
    "vote": 7
  },
  {
    "id": 10,
    "vote": 1
  },
  {
    "id": 11,
    "vote": 6
  },
  {
    "id": 12,
    "vote": 1
  },
  {
    "id": 13,
    "vote": 2
  },
  {
    "id": 14,
    "vote": 3
  },
  {
    "id": 15,
    "vote": 2
  },
  {
    "id": 16,
    "vote": 4
  },
  {
    "id": 17,
    "vote": 10
  },
  {
    "id": 18,
    "vote": 6
  },
  {
    "id": 19,
    "vote": 4
  },
  {
    "id": 20,
    "vote": 3
  },
  {
    "id": 21,
    "vote": 8
  },
  {
    "id": 22,
    "vote": 3
  },
  {
    "id": 23,
    "vote": 5
  },
  {
    "id": 24,
    "vote": 4
  },
  {
    "id": 25,
    "vote": 1
  },
  {
    "id": 26,
    "vote": 7
  },
  {
    "id": 27,
    "vote": 10
  },
  {
    "id": 28,
    "vote": 6
  },
  {
    "id": 29,
    "vote": 6
  },
  {
    "id": 30,
    "vote": 9
  },
  {
    "id": 31,
    "vote": 4
  },
  {
    "id": 32,
    "vote": 7
  },
  {
    "id": 33,
    "vote": 10
  },
  {
    "id": 34,
    "vote": 10
  },
  {
    "id": 35,
    "vote": 9
  },
  {
    "id": 36,
    "vote": 10
  },
  {
    "id": 37,
    "vote": 9
  },
  {
    "id": 38,
    "vote": 10
  },
  {
    "id": 39,
    "vote": 8
  },
  {
    "id": 40,
    "vote": 5
  },
  {
    "id": 41,
    "vote": 10
  },
  {
    "id": 42,
    "vote": 5
  },
  {
    "id": 43,
    "vote": 7
  },
  {
    "id": 44,
    "vote": 2
  },
  {
    "id": 45,
    "vote": 3
  },
  {
    "id": 46,
    "vote": 3
  },
  {
    "id": 47,
    "vote": 1
  },
  {
    "id": 48,
    "vote": 10
  },
  {
    "id": 49,
    "vote": 10
  },
  {
    "id": 50,
    "vote": 7
  }
]
let userVote = undefined

function countVotes (results) {
  const resultsCount = {
    1: 0,
    2: 0,
    3: 0,
    4: 0,
    5: 0,
    6: 0,
    7: 0,
    8: 0,
    9: 0,
    10: 0
  }
  
  return results.reduce(function (accumulator, result) {
    accumulator[result.vote] += 1

    return accumulator
  }, resultsCount)
}

function vote () {
  const selected = voteRadios
    .find(radio => radio.checked)
    .value

  userVote = {id: 51, vote: parseInt(selected)}
  resultsMock.push({id: 51, vote: parseInt(selected)})

  showResults(resultsMock, resultsMock.length)
}

function countPercentage (number, total) {
  return number / total
}

function showResults (results, total) {
  const votes = countVotes(results)
  
  resultElements.map(function (element, index) {
    const opacity = countPercentage(votes[index + 1], total)
    element.style.background = `rgba(115, 58, 132, ${opacity})`

    return element
  })

  voteListRadios.classList.remove('active')
  voteListResults.classList.add('active')

  showUsersVote()
  showMostVoted(votes)
}

function createElement (tag, text, classNames) {
  const element = document.createElement(tag)
  const textNode = document.createTextNode(text)

  element.appendChild(textNode)
  element.classList.add(...classNames)

  return element
}

function showUsersVote () {
  const element = resultElements.find(function (element, index) {
    return index + 1 === userVote.vote
  })

  const textElement = createElement('span', 'A te véleményed', ['result-text', 'user-result'])
  element.parentNode.appendChild(textElement)
}

function showMostVoted (results) {
  const mostVoted = Object.keys(results).reduce((a, b) => results[a] > results[b] ? a : b)

  const element = resultElements.find(function (element, index) {
    return index + 1 === parseInt(mostVoted)
  })
  
  const textElement = createElement('span', 'Olvasóink átlaga', ['result-text', 'average-result'])
  element.parentNode.appendChild(textElement)
}

voteRadios.forEach(radio => radio.addEventListener('change', vote))
const voteListRadios = document.querySelector('.vote-list.radios')
const voteListResults = document.querySelector('.vote-list.results')
const voteRadios = Array.from(document.querySelectorAll('.vote-list input'))
const resultElements = Array.from(document.querySelectorAll('.results li div'))
const apiUrl = '<API-URL>'

let poll = undefined

function setUserCookie (userId) {
  document.cookie = `poll-user=${userId}`
}

function getUserVoteFromCookie () {
  const userId = document.cookie
    .split('; ')
    .find(cookie => cookie.match('poll-user'))
    .split('=')[1]
    
  return poll.votes.find(vote => vote.user === userId)
}

function didUserVote () {
  return document.cookie.includes('poll-user')
}

function showError (message) {
  console.log(message)
}

function getPoll () {
  return fetch(apiUrl)
    .then(response => response.json())
    .then(function (data) {
      poll = data.poll

      return poll
    })
    .then(function (poll) {
      setVoteValues(poll)

      if (didUserVote()) {
        showResults()
      }
    })
    .catch(error => error)
}

function setVoteValues (poll) {
  voteRadios.map(function (vote, index) {
    vote.value = poll.answers[index]._id
    resultElements[index].dataset.value = poll.answers[index]._id
    resultElements[index].dataset.count = 0
  })
}

function countVotes () {
  poll.votes.forEach(function (vote) {
    const result = resultElements.find(result => result.dataset.value === vote.answer)
    if (result) {
      result.dataset.count++
    }
  })
}

function vote () {
  const selected = voteRadios.find(radio => radio.checked).value

  if (selected) {
    const body = JSON.stringify({answer: selected})

    return fetch(apiUrl, {
      body: body, 
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      }
    })
    .then(response => response.json())
    .then(data => showResults(data.vote))
    .catch(error => error)
  } else {
    showError('No answer found.')
  }
}

function countColorLevel (number, mostVoted) {
  const percentage = number / mostVoted.dataset.count
  return Math.floor((percentage * 100) / 5) * 5
}

function showResults (vote) {
  if (vote) {
    poll.votes = [...poll.votes, vote]
    setUserCookie(vote.user)
  } else {
    vote = getUserVoteFromCookie()
  }

  countVotes()

  const mostVoted = resultElements.reduce((a, b) => a.dataset.count > b.dataset.count ? a : b)
  
  resultElements.forEach(function (element) {
    const colorLevel = countColorLevel(element.dataset.count, mostVoted)
    element.classList.add(`vote-${colorLevel}`)
  })

  voteListRadios.classList.remove('active')
  voteListResults.classList.add('active')

  showUsersVote(vote)
  showMostVoted(mostVoted)
}

function createElement (tag, text, classNames) {
  const element = document.createElement(tag)
  const textNode = document.createTextNode(text)

  element.appendChild(textNode)
  element.classList.add(...classNames)

  return element
}

function showUsersVote (userVote) {
  const element = resultElements.find(result => result.dataset.value === userVote.answer)

  const textElement = createElement('span', 'A te véleményed', ['result-text', 'user-result'])
  element.parentNode.appendChild(textElement)
}

function showMostVoted (mostVoted) {
  const textElement = createElement('span', 'Legtöbbet választott', ['result-text', 'average-result'])
  mostVoted.parentNode.appendChild(textElement)
}

voteRadios.forEach(radio => radio.addEventListener('change', vote))

getPoll()
didUserVote()

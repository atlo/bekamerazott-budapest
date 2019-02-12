const facebookShareButton = document.querySelector('.social-button.facebook')
const tumblrShareButton = document.querySelector('.social-button.tumblr')
const twitterShareButton = document.querySelector('.social-button.twitter')
const {URL} = document
const windowSize = 'height=350,width=600'
const tags = ''

function shareOnFacebook () {
  const popup = window.open(`https://www.facebook.com/sharer/sharer.php?u=${URL}`, 'facebook-popup', windowSize);
  if (popup.focus) popup.focus()
}

function shareOnTumblr () {
  const popup = window.open(`https://tumblr.com/widgets/share/tool?canonicalUrl=${URL}&posttype=link`, 'tumblr-popup', windowSize)
  if (popup.focus) popup.focus()
}

function shareOnTwitter () {
  const popup = window.open(`https://twitter.com/share?url=${URL}`, 'twitter-popup', windowSize);
  if (popup.focus) popup.focus()
}

facebookShareButton.addEventListener('click', shareOnFacebook)
tumblrShareButton.addEventListener('click', shareOnTumblr)
twitterShareButton.addEventListener('click', shareOnTwitter)

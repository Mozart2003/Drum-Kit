function playSoundFromKeyCode(keyCode) {
  const audio = document.querySelector(`audio[data-key="${keyCode}"]`);
  const key = document.querySelector(`.key[data-key="${keyCode}"]`);
  if (!audio) return;

  audio.currentTime = 0;
  audio.play();
  key.classList.add('playing');
}

function playSound(e) {
  playSoundFromKeyCode(e.keyCode);
}

function removeTransition(e) {
  if (e.propertyName !== 'transform') return;
  this.classList.remove('playing');
}

const keys = document.querySelectorAll('.key');

keys.forEach(key => {
  key.addEventListener('transitionend', removeTransition);

  const keyCode = key.getAttribute('data-key');

  key.addEventListener('click', () => playSoundFromKeyCode(keyCode));

  key.addEventListener('touchstart', e => {
    e.preventDefault(); // avoid double fire on mobile
    playSoundFromKeyCode(keyCode);
  });
});

window.addEventListener('keydown', playSound);

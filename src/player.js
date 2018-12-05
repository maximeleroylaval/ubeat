import globalStore from '@/main';

export function clear() {
  if (globalStore.currentSong != null) {
    globalStore.currentSong.audioPreview.pause();
    globalStore.currentSong = null;
  }
}

export function isPlaying() {
  if (globalStore.currentSong !== null && !globalStore.currentSong.audioPreview.paused) {
    return true;
  }
  return false;
}

export function setVolume(intensity) {
  if (intensity <= 100 && intensity >= 0 && globalStore.currentSong !== null) {
    globalStore.currentSong.audioPreview.volume = intensity / 100;
  }
}

export function updateUI() {
  globalStore.currentSong.changeButtonPlay();
  const button = document.getElementById('globalPlay');
  if (isPlaying()) {
    button.classList.remove('fa-play');
    button.classList.add('fa-pause');
  } else {
    button.classList.remove('fa-pause');
    button.classList.add('fa-play');
  }
  if (globalStore.currentSong != null) {
    const songName = document.getElementById('globalSongName');
    songName.innerHTML = `${globalStore.currentSong.song.artistName} - ${globalStore.currentSong.song.trackName}`;
  }
}

export function play() {
  if (globalStore.currentSong !== null) {
    globalStore.currentSong.audioPreview.play();
    updateUI();
  }
}

export function pause() {
  if (globalStore.currentSong !== null) {
    globalStore.currentSong.audioPreview.pause();
    updateUI();
  }
}

export function change(songComponent) {
  if (globalStore.currentSong != null) {
    if (globalStore.currentSong.audioPreview.src === songComponent.audioPreview.src) {
      if (globalStore.currentSong.audioPreview.paused) {
        play();
      } else {
        pause();
      }
      globalStore.currentSong = songComponent;
    } else {
      if (!globalStore.currentSong.audioPreview.paused) {
        pause();
      }
      globalStore.currentSong = songComponent;
      play();
    }
  } else {
    globalStore.currentSong = songComponent;
    play();
  }
}

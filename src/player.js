import globalStore from '@/main';

export function clear() {
  if (globalStore.currentSong != null) {
    globalStore.currentSong.audioPreview.pause();
    globalStore.currentSong = null;
  }
}

export function change(songComponent) {
  if (globalStore.currentSong != null) {
    if (globalStore.currentSong.audioPreview.src === songComponent.audioPreview.src) {
      if (globalStore.currentSong.audioPreview.paused) {
        globalStore.currentSong.audioPreview.play();
      } else {
        globalStore.currentSong.audioPreview.pause();
      }
      globalStore.currentSong = songComponent;
      globalStore.currentSong.changeButtonPlay();
    } else {
      if (!globalStore.currentSong.audioPreview.paused) {
        globalStore.currentSong.audioPreview.pause();
        globalStore.currentSong.changeButtonPlay();
      }
      globalStore.currentSong = songComponent;
      globalStore.currentSong.audioPreview.play();
      globalStore.currentSong.changeButtonPlay();
    }
  } else {
    globalStore.currentSong = songComponent;
    globalStore.currentSong.audioPreview.play();
    globalStore.currentSong.changeButtonPlay();
  }
}

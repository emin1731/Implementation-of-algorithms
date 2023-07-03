var audioCtx = new(window.AudioContext || window.webkitAudioContext)();

export default function playNote(frequency, duration) {
  // create Oscillator node
  var oscillator = audioCtx.createOscillator();

  oscillator.type = 'square';
  oscillator.frequency.value = frequency; // value in hertz
  oscillator.connect(audioCtx.destination);
  oscillator.start();

  setTimeout(
    function() {
      oscillator.stop();
    //   playMelody();
    }, duration);
}

// playNote(659, 1000)



// function playMelody() {
//   if (notes.length > 0) {
//     note = notes.shift();   // pop
//     playNote(note[0], 1000 * 256 / (note[1] * tempo));
//   }
// }

// notes = [
//   [659, 4],
//   [659, 4],
//   [659, 4],
//   [523, 8],
//   [0, 16],
//   [783, 16],
//   [659, 4],
//   [523, 8],
//   [0, 16],
//   [783, 16],
//   [659, 4],
//   [0, 4],
//   [987, 4],
//   [987, 4],
//   [987, 4],
//   [1046, 8],
//   [0, 16],
//   [783, 16],
//   [622, 4],
//   [523, 8],
//   [0, 16],
//   [783, 16],
//   [659, 4]
// ];



// notes.reverse();
// tempo = 100;

// playMelody();
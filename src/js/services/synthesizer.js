const audioCtx = new (window.AudioContext || window.webkitAudioContext)();

export default function () {
  // carrier node
  this.oscCarrier = audioCtx.createOscillator();
  this.oscCarrier.type = 'sine';
  this.oscCarrier.frequency.value = 220;

  this.carrierGain = audioCtx.createGain();
  this.oscCarrier.connect(this.carrierGain);
  this.carrierGain.gain.value = 0.5;
  this.carrierGain.connect(audioCtx.destination);

  // modulator node
  this.oscModulator = audioCtx.createOscillator();
  this.oscModulator.type = 'sine';
  this.oscModulator.frequency.value = 220;

  this.modulatorGain = audioCtx.createGain();
  this.oscModulator.connect(this.modulatorGain);
  this.modulatorGain.gain.value = 0.5;
  this.modulatorGain.connect(audioCtx.destination);

  this.oscCarrier.start();
  this.oscModulator.start();

  const carrierWave = {
    amplitude: 0,
    frequency: 0
  };

  return {
    carrierWave: {
      amplitude: this.carrierGain.gain,
      frequency: this.oscCarrier.frequency
    },
    modulatorWave: {
      amplitude: this.modulatorGain.gain,
      frequency: this.oscModulator.frequency
    },
    outputWave: {
      amplitude: { value: 0 }
    }
  };
}

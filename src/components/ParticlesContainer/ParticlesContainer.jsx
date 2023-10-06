import Particles from "react-tsparticles";
import React from "react";
import { loadStarsPreset } from "tsparticles-preset-stars";

export class ParticlesContainer extends React.PureComponent {
  async customInit(engine) {
    await loadStarsPreset(engine);
  }

  render() {
    const options = {
      preset: "stars",
      particles: {
        move: {
          speed: 1,
        },
      },
      fullScreen: {
        enable: true,
        zIndex: -1,
      },
    };

    return <Particles options={options} init={this.customInit} />;
  }
}

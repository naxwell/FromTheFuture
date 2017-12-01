/* global AFRAME */

/**
 * Component that listens to an event, fades out an entity, swaps the texture, and fades it
 * back in.
 */
AFRAME.registerComponent('set-image', {
  schema: {
    on: {type: 'string'},
    target: {type: 'selector'},
    src: {type: 'string'},
    scene: {type: 'number', default: 1},
    dur: {type: 'number', default: 300}
  },

  init: function () {
    var data = this.data;
    var el = this.el;

    this.setupFadeAnimation();

    el.addEventListener(data.on, function () {
      // Fade out image.
      data.target.emit('set-image-fade');
      // Wait for fade to complete.
      setTimeout(function () {
        // Set image.
        data.target.setAttribute('material', 'src', data.src);
        // Set scene UI to inactive
        var scenes = document.querySelectorAll('.scene');
        scenes.forEach(scene => scene.setAttribute('visible', 'false'));
        // Disable links
        var links = document.querySelectorAll('.link');
        links.forEach(link => link.setAttribute('class', 'unlink'));
        var texts = document.querySelectorAll('.text');
        texts.forEach(text => text.setAttribute('visible', 'false'));
        // Enable UI for current scene
        var sceneName = '#scene' + data.scene;
        document.querySelector(sceneName).setAttribute('visible', 'true');
        var currentScene = document.querySelector(sceneName);
        currentScene.setAttribute('visible', 'true');
        var sceneLinks = currentScene.querySelectorAll('.unlink')
        sceneLinks.forEach(link => link.setAttribute('class', 'link'));
      }, data.dur);
    });
  },

  /**
   * Setup fade-in + fade-out.
   */
  setupFadeAnimation: function () {
    var data = this.data;
    var targetEl = this.data.target;

    // Only set up once.
    if (targetEl.dataset.setImageFadeSetup) { return; }
    targetEl.dataset.setImageFadeSetup = true;

    // Create animation.
    targetEl.setAttribute('animation__fade', {
      property: 'material.color',
      startEvents: 'set-image-fade',
      dir: 'alternate',
      dur: data.dur,
      from: '#FFF',
      to: '#000'
    });
  }
});
// AFRAME.registerComponent('alpha-test', {
//     dependencies: ['material'],
//     init: function () {
//       this.el.getObject3D('mesh').material.alphaTest = 0.5;
//     }
//   });
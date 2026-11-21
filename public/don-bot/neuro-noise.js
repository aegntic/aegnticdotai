/*
 * NeuroNoise WebGL2 Backdrop for don.aegntic.ai
 * Adapted from Paper Shaders (@paper-design/shaders@0.0.82) — Apache-2.0 License
 * https://github.com/paper-design/shaders
 */
(() => {
  'use strict';

  const SPEED = 0.32;
  const INITIAL_FRAME = 193726.059;
  const SCALE = 2.0;
  const BRIGHTNESS = 0.02;
  const CONTRAST = 0.66;
  const COLOR_FRONT = [1.0, 1.0, 1.0, 1.0];
  const COLOR_MID = [71 / 255, 166 / 255, 255 / 255, 1.0]; // #47A6FF
  const COLOR_BACK = [0.0, 0.0, 0.0, 0.0]; // #00000000
  const MAX_PIXEL_COUNT = 1920 * 1080 * 1.5;

  const VERTEX_SHADER = `#version 300 es
precision mediump float;

layout(location = 0) in vec2 a_position;

uniform vec2 u_resolution;
uniform float u_pixelRatio;
uniform float u_scale;

out vec2 v_patternUV;

void main() {
  gl_Position = vec4(a_position, 0.0, 1.0);
  vec2 uv = a_position * 0.5;
  v_patternUV = (uv * u_resolution / u_pixelRatio) / u_scale * 0.01;
}
`;

  const FRAGMENT_SHADER = `#version 300 es
precision mediump float;

uniform float u_time;
uniform vec4 u_colorFront;
uniform vec4 u_colorMid;
uniform vec4 u_colorBack;
uniform float u_brightness;
uniform float u_contrast;

in vec2 v_patternUV;
out vec4 fragColor;

vec2 rotate(vec2 uv, float th) {
  return mat2(cos(th), sin(th), -sin(th), cos(th)) * uv;
}

float neuroShape(vec2 uv, float t) {
  vec2 sine_acc = vec2(0.0);
  vec2 res = vec2(0.0);
  float scale = 8.0;

  for (int j = 0; j < 15; j++) {
    uv = rotate(uv, 1.0);
    sine_acc = rotate(sine_acc, 1.0);
    vec2 layer = uv * scale + float(j) + sine_acc - t;
    sine_acc += sin(layer);
    res += (0.5 + 0.5 * cos(layer)) / scale;
    scale *= 1.2;
  }
  return res.x + res.y;
}

void main() {
  vec2 shape_uv = v_patternUV * 0.13;
  float t = 0.5 * u_time;

  float noise = neuroShape(shape_uv, t);
  noise = (1.0 + u_brightness) * noise * noise;
  noise = pow(noise, 0.7 + 6.0 * u_contrast);
  noise = min(1.4, noise);

  float blend = smoothstep(0.7, 1.4, noise);

  vec4 frontC = u_colorFront;
  frontC.rgb *= frontC.a;
  vec4 midC = u_colorMid;
  midC.rgb *= midC.a;
  vec4 blendFront = mix(midC, frontC, blend);

  float safeNoise = max(noise, 0.0);
  vec3 color = blendFront.rgb * safeNoise;
  float opacity = clamp(blendFront.a * safeNoise, 0.0, 1.0);

  vec3 bgColor = u_colorBack.rgb * u_colorBack.a;
  color = color + bgColor * (1.0 - opacity);
  opacity = opacity + u_colorBack.a * (1.0 - opacity);

  color += 1.0 / 256.0 * (fract(sin(dot(0.014 * gl_FragCoord.xy, vec2(12.9898, 78.233))) * 43758.5453123) - 0.5);

  fragColor = vec4(color, opacity);
}
`;

  function init() {
    const container = document.getElementById('don-neuro-bg');
    const canvas = document.getElementById('don-neuro-canvas');
    if (!container || !canvas) return;

    const motionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    let userPaused = motionQuery.matches || document.body.classList.contains('motion-paused');
    if (userPaused) {
      document.body.classList.add('motion-paused');
    }

    const gl = canvas.getContext('webgl2', {
      alpha: true,
      antialias: false,
      depth: false,
      stencil: false,
      premultipliedAlpha: true,
      powerPreference: 'low-power',
    });

    const activateFallback = () => {
      container.classList.add('is-fallback');
    };

    if (!gl) {
      activateFallback();
      window.donNeuroNoise = {
        pause: () => {
          userPaused = true;
          document.body.classList.add('motion-paused');
          window.dispatchEvent(new CustomEvent('don-motion-change', { detail: { paused: true } }));
        },
        play: () => {
          userPaused = false;
          document.body.classList.remove('motion-paused');
          window.dispatchEvent(new CustomEvent('don-motion-change', { detail: { paused: false } }));
        },
        toggle: () => {
          if (userPaused) window.donNeuroNoise.play();
          else window.donNeuroNoise.pause();
          return userPaused;
        },
        isPaused: () => userPaused,
      };
      return;
    }

    let program = null;
    let positionBuffer = null;
    let locations = {};
    let currentFrame = INITIAL_FRAME;
    let lastTime = performance.now();
    let rafId = null;
    let renderScale = 1;
    let contextLost = false;

    const compileShader = (type, source) => {
      const shader = gl.createShader(type);
      if (!shader) return null;
      gl.shaderSource(shader, source);
      gl.compileShader(shader);
      if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
        gl.deleteShader(shader);
        return null;
      }
      return shader;
    };

    const setupGL = () => {
      const vert = compileShader(gl.VERTEX_SHADER, VERTEX_SHADER);
      const frag = compileShader(gl.FRAGMENT_SHADER, FRAGMENT_SHADER);
      if (!vert || !frag) {
        if (vert) gl.deleteShader(vert);
        if (frag) gl.deleteShader(frag);
        return false;
      }

      const prog = gl.createProgram();
      if (!prog) {
        gl.deleteShader(vert);
        gl.deleteShader(frag);
        return false;
      }

      gl.attachShader(prog, vert);
      gl.attachShader(prog, frag);
      gl.linkProgram(prog);
      gl.deleteShader(vert);
      gl.deleteShader(frag);

      if (!gl.getProgramParameter(prog, gl.LINK_STATUS)) {
        gl.deleteProgram(prog);
        return false;
      }

      program = prog;
      gl.useProgram(program);

      positionBuffer = gl.createBuffer();
      gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
      gl.bufferData(
        gl.ARRAY_BUFFER,
        new Float32Array([-1, -1, 1, -1, -1, 1, -1, 1, 1, -1, 1, 1]),
        gl.STATIC_DRAW
      );

      const posLoc = gl.getAttribLocation(program, 'a_position');
      if (posLoc >= 0) {
        gl.enableVertexAttribArray(posLoc);
        gl.vertexAttribPointer(posLoc, 2, gl.FLOAT, false, 0, 0);
      }

      locations = {
        u_time: gl.getUniformLocation(program, 'u_time'),
        u_resolution: gl.getUniformLocation(program, 'u_resolution'),
        u_pixelRatio: gl.getUniformLocation(program, 'u_pixelRatio'),
        u_scale: gl.getUniformLocation(program, 'u_scale'),
        u_brightness: gl.getUniformLocation(program, 'u_brightness'),
        u_contrast: gl.getUniformLocation(program, 'u_contrast'),
        u_colorFront: gl.getUniformLocation(program, 'u_colorFront'),
        u_colorMid: gl.getUniformLocation(program, 'u_colorMid'),
        u_colorBack: gl.getUniformLocation(program, 'u_colorBack'),
      };

      gl.uniform1f(locations.u_scale, SCALE);
      gl.uniform1f(locations.u_brightness, BRIGHTNESS);
      gl.uniform1f(locations.u_contrast, CONTRAST);
      gl.uniform4fv(locations.u_colorFront, COLOR_FRONT);
      gl.uniform4fv(locations.u_colorMid, COLOR_MID);
      gl.uniform4fv(locations.u_colorBack, COLOR_BACK);
      gl.clearColor(0, 0, 0, 0);
      return true;
    };

    const updateSize = () => {
      const rect = container.getBoundingClientRect();
      const cssW = Math.max(1, Math.round(rect.width || window.innerWidth || 1280));
      const cssH = Math.max(1, Math.round(rect.height || window.innerHeight || 720));
      const dpr = Math.min(window.devicePixelRatio || 1, 1.5);

      let targetW = Math.max(1, Math.round(cssW * dpr));
      let targetH = Math.max(1, Math.round(cssH * dpr));
      const pixelCount = targetW * targetH;
      if (pixelCount > MAX_PIXEL_COUNT) {
        const capScale = Math.sqrt(MAX_PIXEL_COUNT / pixelCount);
        targetW = Math.max(1, Math.round(targetW * capScale));
        targetH = Math.max(1, Math.round(targetH * capScale));
      }

      const nextScale = targetW / cssW;
      if (canvas.width !== targetW || canvas.height !== targetH || renderScale !== nextScale) {
        canvas.width = targetW;
        canvas.height = targetH;
        renderScale = nextScale;
        if (!contextLost && program) {
          gl.viewport(0, 0, canvas.width, canvas.height);
          gl.useProgram(program);
          gl.uniform2f(locations.u_resolution, canvas.width, canvas.height);
          gl.uniform1f(locations.u_pixelRatio, renderScale);
        }
        return true;
      }
      return false;
    };

    const drawFrame = () => {
      if (contextLost || !program) return;
      gl.useProgram(program);
      gl.viewport(0, 0, canvas.width, canvas.height);
      gl.uniform2f(locations.u_resolution, canvas.width, canvas.height);
      gl.uniform1f(locations.u_pixelRatio, renderScale);
      gl.uniform1f(locations.u_time, currentFrame * 1e-3);
      gl.clear(gl.COLOR_BUFFER_BIT);
      gl.drawArrays(gl.TRIANGLES, 0, 6);
    };

    const stopRaf = () => {
      if (rafId !== null) {
        cancelAnimationFrame(rafId);
        rafId = null;
      }
    };

    const tick = (now) => {
      rafId = null;
      if (contextLost || userPaused || document.hidden) return;
      const dt = Math.min(100, Math.max(0, now - lastTime));
      lastTime = now;
      currentFrame += dt * SPEED;
      drawFrame();
      rafId = requestAnimationFrame(tick);
    };

    const startRaf = () => {
      if (rafId !== null || contextLost || userPaused || document.hidden) return;
      lastTime = performance.now();
      rafId = requestAnimationFrame(tick);
    };

    const emitChange = () => {
      document.body.classList.toggle('motion-paused', userPaused);
      window.dispatchEvent(new CustomEvent('don-motion-change', { detail: { paused: userPaused } }));
    };

    const api = {
      pause: () => {
        userPaused = true;
        stopRaf();
        emitChange();
      },
      play: () => {
        userPaused = false;
        emitChange();
        drawFrame();
        startRaf();
      },
      toggle: () => {
        if (userPaused) api.play();
        else api.pause();
        return userPaused;
      },
      isPaused: () => userPaused,
    };
    window.donNeuroNoise = api;

    if (!setupGL()) {
      activateFallback();
      return;
    }

    updateSize();
    drawFrame();
    if (!userPaused && !document.hidden) {
      startRaf();
    }

    if ('ResizeObserver' in window) {
      const ro = new ResizeObserver(() => {
        if (updateSize()) {
          drawFrame();
        }
      });
      ro.observe(container);
    }
    window.addEventListener('resize', () => {
      if (updateSize()) {
        drawFrame();
      }
    }, { passive: true });

    document.addEventListener('visibilitychange', () => {
      if (document.hidden) {
        stopRaf();
      } else if (!userPaused && !contextLost) {
        lastTime = performance.now();
        drawFrame();
        startRaf();
      }
    });

    const onReducedMotionChange = (e) => {
      if (e.matches) api.pause();
      else api.play();
    };
    if (typeof motionQuery.addEventListener === 'function') {
      motionQuery.addEventListener('change', onReducedMotionChange);
    } else if (typeof motionQuery.addListener === 'function') {
      motionQuery.addListener(onReducedMotionChange);
    }

    canvas.addEventListener('webglcontextlost', (e) => {
      e.preventDefault();
      contextLost = true;
      stopRaf();
    });

    canvas.addEventListener('webglcontextrestored', () => {
      contextLost = false;
      if (setupGL()) {
        container.classList.remove('is-fallback');
        updateSize();
        drawFrame();
        if (!userPaused && !document.hidden) {
          startRaf();
        }
      } else {
        activateFallback();
      }
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init, { once: true });
  } else {
    init();
  }
})();

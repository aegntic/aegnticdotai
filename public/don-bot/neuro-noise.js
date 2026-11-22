/*
 * NeuroNoise Resilient WebGL2 / WebGL1 / Canvas2D Backdrop for don.aegntic.ai
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
  const COLOR_BACK = [4 / 255, 6 / 255, 10 / 255, 1.0]; // #04060a
  const FRAME_PERIOD = 4000 * Math.PI;
  const INITIAL_PHASE_FRAME = ((INITIAL_FRAME % FRAME_PERIOD) + FRAME_PERIOD) % FRAME_PERIOD;
  const DESKTOP_MAX_PIXEL_COUNT = 1920 * 1080 * 1.5;
  const MOBILE_MAX_PIXEL_COUNT = 260000;

  const VERTEX_SHADER_300 = `#version 300 es
precision highp float;

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

  const FRAGMENT_SHADER_300 = `#version 300 es
#ifdef GL_FRAGMENT_PRECISION_HIGH
precision highp float;
#else
precision mediump float;
#endif

uniform float u_time;
uniform vec4 u_colorFront;
uniform vec4 u_colorMid;
uniform vec4 u_colorBack;
uniform float u_brightness;
uniform float u_contrast;

in vec2 v_patternUV;
out vec4 fragColor;

const mat2 ROT1 = mat2(0.5403023059, 0.8414709848, -0.8414709848, 0.5403023059);

float neuroShape(vec2 uv, float t) {
  vec2 sine_acc = vec2(0.0);
  vec2 res = vec2(0.0);
  float scale = 8.0;

  for (int j = 0; j < 15; j++) {
    uv = ROT1 * uv;
    sine_acc = ROT1 * sine_acc;
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
  vec3 color = clamp(blendFront.rgb * safeNoise, 0.0, 1.0);
  float opacity = clamp(blendFront.a * safeNoise, 0.0, 1.0);

  color *= 0.92;
  opacity *= 0.92;
  vec3 bgColor = u_colorBack.rgb * u_colorBack.a;
  color = color + bgColor * (1.0 - opacity);

  float dither = (fract(52.9829189 * fract(dot(gl_FragCoord.xy, vec2(0.06711056, 0.00583715)))) - 0.5) / 255.0;
  fragColor = vec4(clamp(color + dither, 0.0, 1.0), 1.0);
}
`;

  const VERTEX_SHADER_100 = `
precision highp float;

attribute vec2 a_position;

uniform vec2 u_resolution;
uniform float u_pixelRatio;
uniform float u_scale;

varying vec2 v_patternUV;

void main() {
  gl_Position = vec4(a_position, 0.0, 1.0);
  vec2 uv = a_position * 0.5;
  v_patternUV = (uv * u_resolution / u_pixelRatio) / u_scale * 0.01;
}
`;

  const FRAGMENT_SHADER_100 = `
#ifdef GL_FRAGMENT_PRECISION_HIGH
precision highp float;
#else
precision mediump float;
#endif

uniform float u_time;
uniform vec4 u_colorFront;
uniform vec4 u_colorMid;
uniform vec4 u_colorBack;
uniform float u_brightness;
uniform float u_contrast;

varying vec2 v_patternUV;

float neuroShape(vec2 uv, float t) {
  mat2 rot1 = mat2(0.5403023059, 0.8414709848, -0.8414709848, 0.5403023059);
  vec2 sine_acc = vec2(0.0);
  vec2 res = vec2(0.0);
  float scale = 8.0;

  for (int j = 0; j < 15; j++) {
    uv = rot1 * uv;
    sine_acc = rot1 * sine_acc;
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
  vec3 color = clamp(blendFront.rgb * safeNoise, 0.0, 1.0);
  float opacity = clamp(blendFront.a * safeNoise, 0.0, 1.0);

  color *= 0.92;
  opacity *= 0.92;
  vec3 bgColor = u_colorBack.rgb * u_colorBack.a;
  color = color + bgColor * (1.0 - opacity);

  float dither = (fract(52.9829189 * fract(dot(gl_FragCoord.xy, vec2(0.06711056, 0.00583715)))) - 0.5) / 255.0;
  gl_FragColor = vec4(clamp(color + dither, 0.0, 1.0), 1.0);
}
`;

  function computeEffectiveScale(cssW) {
    return SCALE * Math.min(1, Math.max(0.46, cssW / 900));
  }

  function init() {
    const container = document.getElementById('don-neuro-bg');
    let canvas = document.getElementById('don-neuro-canvas');
    if (!container || !canvas) return;

    const motionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    let userPaused = motionQuery.matches || document.body.classList.contains('motion-paused');
    if (userPaused) {
      document.body.classList.add('motion-paused');
    }

    const coarseQuery = window.matchMedia('(pointer: coarse)');
    const isMobileViewport = () => coarseQuery.matches || Math.min(window.innerWidth, window.innerHeight) < 768;

    let currentFrame = INITIAL_PHASE_FRAME;
    let lastTime = null;
    let rafId = null;
    let activeRenderer = null; // { kind: 'webgl2' | 'webgl1' | '2d', resize(force), draw(), destroy() }

    const stopRaf = () => {
      if (rafId !== null) {
        cancelAnimationFrame(rafId);
        rafId = null;
      }
    };

    const emitChange = () => {
      document.body.classList.toggle('motion-paused', userPaused);
      window.dispatchEvent(new CustomEvent('don-motion-change', { detail: { paused: userPaused } }));
    };

    const replaceCanvasElement = () => {
      const fresh = document.createElement('canvas');
      fresh.id = 'don-neuro-canvas';
      canvas.replaceWith(fresh);
      canvas = fresh;
      return fresh;
    };

    const activateCssFallback = () => {
      stopRaf();
      if (activeRenderer) {
        activeRenderer.destroy();
        activeRenderer = null;
      }
      container.classList.remove('is-2d');
      container.classList.add('is-fallback');
    };

    const createCanvas2DRenderer = () => {
      const targetCanvas = replaceCanvasElement();
      const ctx = targetCanvas.getContext('2d', { alpha: false });
      if (!ctx) return null;

      const COS1 = 0.5403023059;
      const SIN1 = 0.8414709848;
      const OCTAVES = 10;
      const OCTAVE_SCALES = new Float64Array(OCTAVES);
      const OCTAVE_INV = new Float64Array(OCTAVES);
      let s = 8.0;
      for (let j = 0; j < OCTAVES; j++) {
        OCTAVE_SCALES[j] = s;
        OCTAVE_INV[j] = 1.0 / s;
        s *= 1.2;
      }
      // Analytical DC mean for octaves 10..14 so brightness matches the 15-octave GPU shader.
      const TAIL_MEAN = 0.0725;
      const EXP = 0.7 + 6.0 * CONTRAST;
      const BRIGHT_MULT = 1.0 + BRIGHTNESS;
      const MID_R = COLOR_MID[0];
      const MID_G = COLOR_MID[1];
      const MID_B = COLOR_MID[2];
      const BACK_R = COLOR_BACK[0];
      const BACK_G = COLOR_BACK[1];
      const BACK_B = COLOR_BACK[2];

      let width = 160;
      let height = 90;
      let cssW = 1280;
      let cssH = 720;
      let lastCssW = 0;
      let lastCssH = 0;
      let imageData = null;
      let last2DDraw = 0;

      const resize = (force = false) => {
        const rect = container.getBoundingClientRect();
        const nextCssW = Math.max(1, Math.round(rect.width || window.innerWidth || 1280));
        const nextCssH = Math.max(1, Math.round(rect.height || window.innerHeight || 720));
        const mobile = isMobileViewport();

        if (!force && mobile && lastCssW === nextCssW && Math.abs(nextCssH - lastCssH) < 160) {
          return false;
        }
        lastCssW = nextCssW;
        lastCssH = nextCssH;
        cssW = nextCssW;
        cssH = nextCssH;

        const aspect = cssW / cssH;
        const maxCells = mobile ? 14000 : 18000;
        const nextW = Math.max(80, Math.min(180, Math.round(Math.sqrt(maxCells * aspect))));
        const nextH = Math.max(64, Math.min(160, Math.round(nextW / aspect)));

        if (force || targetCanvas.width !== nextW || targetCanvas.height !== nextH || !imageData) {
          width = nextW;
          height = nextH;
          targetCanvas.width = width;
          targetCanvas.height = height;
          imageData = ctx.createImageData(width, height);
          return true;
        }
        return false;
      };

      const draw = (forceNow = false) => {
        if (!imageData) resize(true);
        const perfNow = performance.now();
        if (!forceNow && last2DDraw > 0 && perfNow - last2DDraw < 38) {
          return;
        }
        last2DDraw = perfNow;

        const data = imageData.data;
        const effScale = computeEffectiveScale(cssW);
        const uvScaleX = (cssW / effScale) * 0.0013;
        const uvScaleY = (cssH / effScale) * 0.0013;
        const t = 0.5 * currentFrame * 1e-3;

        let ptr = 0;
        for (let py = 0; py < height; py++) {
          // Flip Y to match WebGL clip-space orientation
          const ny = 0.5 - (py + 0.5) / height;
          const baseY = ny * uvScaleY;

          for (let px = 0; px < width; px++) {
            const nx = (px + 0.5) / width - 0.5;
            let uvx = nx * uvScaleX;
            let uvy = baseY;
            let sax = 0.0;
            let say = 0.0;
            let res = TAIL_MEAN;

            for (let j = 0; j < OCTAVES; j++) {
              const rux = COS1 * uvx - SIN1 * uvy;
              const ruy = SIN1 * uvx + COS1 * uvy;
              uvx = rux;
              uvy = ruy;

              const rsx = COS1 * sax - SIN1 * say;
              const rsy = SIN1 * sax + COS1 * say;
              sax = rsx;
              say = rsy;

              const sc = OCTAVE_SCALES[j];
              const lx = uvx * sc + j + sax - t;
              const ly = uvy * sc + j + say - t;

              sax += Math.sin(lx);
              say += Math.sin(ly);
              res += (1.0 + 0.5 * (Math.cos(lx) + Math.cos(ly))) * OCTAVE_INV[j];
            }

            let noise = BRIGHT_MULT * res * res;
            noise = Math.pow(noise, EXP);
            if (noise > 1.4) noise = 1.4;
            if (noise < 0.0) noise = 0.0;

            let blend = (noise - 0.7) / 0.7;
            if (blend < 0.0) blend = 0.0;
            else if (blend > 1.0) blend = 1.0;
            blend = blend * blend * (3.0 - 2.0 * blend);

            const fr = MID_R + (1.0 - MID_R) * blend;
            const fg = MID_G + (1.0 - MID_G) * blend;
            const fb = MID_B + (1.0 - MID_B) * blend;

            let r = fr * noise;
            let g = fg * noise;
            let b = fb * noise;
            if (r > 1.0) r = 1.0;
            if (g > 1.0) g = 1.0;
            if (b > 1.0) b = 1.0;
            let op = noise > 1.0 ? 1.0 : noise;

            r = r * 0.92 + BACK_R * (1.0 - op * 0.92);
            g = g * 0.92 + BACK_G * (1.0 - op * 0.92);
            b = b * 0.92 + BACK_B * (1.0 - op * 0.92);

            data[ptr] = (r * 255) | 0;
            data[ptr + 1] = (g * 255) | 0;
            data[ptr + 2] = (b * 255) | 0;
            data[ptr + 3] = 255;
            ptr += 4;
          }
        }

        ctx.putImageData(imageData, 0, 0);
      };

      container.classList.remove('is-fallback');
      container.classList.add('is-2d');

      return {
        kind: '2d',
        resize,
        draw,
        destroy: () => {
          imageData = null;
        },
      };
    };

    const createWebGLRenderer = (useFreshCanvas = false) => {
      const targetCanvas = useFreshCanvas ? replaceCanvasElement() : canvas;
      const glOpts = {
        alpha: false,
        antialias: false,
        depth: false,
        stencil: false,
        premultipliedAlpha: false,
        powerPreference: 'default',
        failIfMajorPerformanceCaveat: false,
      };

      let isWebGL2 = true;
      let gl = targetCanvas.getContext('webgl2', glOpts);
      if (!gl) {
        isWebGL2 = false;
        gl = targetCanvas.getContext('webgl', glOpts) || targetCanvas.getContext('experimental-webgl', glOpts);
      }
      if (!gl) return null;

      let program = null;
      let positionBuffer = null;
      let locations = {};
      let renderScale = 1;
      let lastCssW = 0;
      let lastCssH = 0;
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
        const vertSrc = isWebGL2 ? VERTEX_SHADER_300 : VERTEX_SHADER_100;
        const fragSrc = isWebGL2 ? FRAGMENT_SHADER_300 : FRAGMENT_SHADER_100;
        const vert = compileShader(gl.VERTEX_SHADER, vertSrc);
        const frag = compileShader(gl.FRAGMENT_SHADER, fragSrc);
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
        gl.clearColor(COLOR_BACK[0], COLOR_BACK[1], COLOR_BACK[2], 1.0);
        return true;
      };

      if (!setupGL()) {
        return null;
      }

      const resize = (force = false) => {
        if (contextLost || gl.isContextLost()) {
          contextLost = true;
          return false;
        }
        const rect = container.getBoundingClientRect();
        const cssW = Math.max(1, Math.round(rect.width || window.innerWidth || 1280));
        const cssH = Math.max(1, Math.round(rect.height || window.innerHeight || 720));
        const mobile = isMobileViewport();

        if (!force && mobile && lastCssW === cssW && Math.abs(cssH - lastCssH) < 160) {
          return false;
        }

        lastCssW = cssW;
        lastCssH = cssH;

        const maxDpr = mobile ? 0.75 : 1.5;
        const dpr = Math.min(window.devicePixelRatio || 1, maxDpr);
        const maxPixels = mobile ? MOBILE_MAX_PIXEL_COUNT : DESKTOP_MAX_PIXEL_COUNT;

        let targetW = Math.max(1, Math.round(cssW * dpr));
        let targetH = Math.max(1, Math.round(cssH * dpr));
        const pixelCount = targetW * targetH;
        if (pixelCount > maxPixels) {
          const capScale = Math.sqrt(maxPixels / pixelCount);
          targetW = Math.max(1, Math.round(targetW * capScale));
          targetH = Math.max(1, Math.round(targetH * capScale));
        }

        const nextScale = targetW / cssW;
        const effectiveScale = computeEffectiveScale(cssW);
        if (force || targetCanvas.width !== targetW || targetCanvas.height !== targetH || Math.abs(renderScale - nextScale) > 1e-4) {
          targetCanvas.width = targetW;
          targetCanvas.height = targetH;
          renderScale = nextScale;
          if (!contextLost && program) {
            gl.viewport(0, 0, targetCanvas.width, targetCanvas.height);
            gl.useProgram(program);
            gl.uniform2f(locations.u_resolution, targetCanvas.width, targetCanvas.height);
            gl.uniform1f(locations.u_pixelRatio, renderScale);
            gl.uniform1f(locations.u_scale, effectiveScale);
          }
          return true;
        }
        return false;
      };

      const draw = () => {
        if (contextLost || !program || gl.isContextLost()) {
          contextLost = true;
          fallbackTo2D();
          return;
        }
        gl.useProgram(program);
        gl.viewport(0, 0, targetCanvas.width, targetCanvas.height);
        gl.uniform1f(locations.u_time, currentFrame * 1e-3);
        gl.clear(gl.COLOR_BUFFER_BIT);
        gl.drawArrays(gl.TRIANGLES, 0, 6);
      };

      const onContextLost = (e) => {
        e.preventDefault();
        contextLost = true;
        fallbackTo2D();
      };

      targetCanvas.addEventListener('webglcontextlost', onContextLost);

      container.classList.remove('is-fallback');
      container.classList.remove('is-2d');

      return {
        kind: isWebGL2 ? 'webgl2' : 'webgl1',
        resize,
        draw,
        destroy: () => {
          targetCanvas.removeEventListener('webglcontextlost', onContextLost);
          if (program && !gl.isContextLost()) {
            gl.deleteProgram(program);
          }
          if (positionBuffer && !gl.isContextLost()) {
            gl.deleteBuffer(positionBuffer);
          }
          program = null;
          positionBuffer = null;
        },
      };
    };

    const tick = (now) => {
      rafId = null;
      if (!activeRenderer || userPaused || document.hidden) return;
      if (lastTime === null) lastTime = now;
      const dt = Math.min(50, Math.max(0, now - lastTime));
      lastTime = now;
      currentFrame = (currentFrame + dt * SPEED) % FRAME_PERIOD;
      activeRenderer.draw(false);
      rafId = requestAnimationFrame(tick);
    };

    const startRaf = () => {
      if (rafId !== null || !activeRenderer || userPaused || document.hidden) return;
      lastTime = null;
      rafId = requestAnimationFrame(tick);
    };

    function fallbackTo2D() {
      stopRaf();
      if (activeRenderer) {
        activeRenderer.destroy();
        activeRenderer = null;
      }
      const cpuRenderer = createCanvas2DRenderer();
      if (!cpuRenderer) {
        activateCssFallback();
        return;
      }
      activeRenderer = cpuRenderer;
      activeRenderer.resize(true);
      activeRenderer.draw(true);
      if (!userPaused && !document.hidden) {
        startRaf();
      }
    }

    const bootRenderer = (preferFreshCanvas = false) => {
      stopRaf();
      if (activeRenderer) {
        activeRenderer.destroy();
        activeRenderer = null;
      }
      const glRenderer = createWebGLRenderer(preferFreshCanvas);
      if (glRenderer) {
        activeRenderer = glRenderer;
        activeRenderer.resize(true);
        activeRenderer.draw(true);
        if (!userPaused && !document.hidden) {
          startRaf();
        }
        return;
      }
      fallbackTo2D();
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
        if (!activeRenderer) {
          bootRenderer(true);
        } else {
          activeRenderer.draw(true);
          startRaf();
        }
      },
      toggle: () => {
        if (userPaused) api.play();
        else api.pause();
        return userPaused;
      },
      isPaused: () => userPaused,
      getBackend: () => (activeRenderer ? activeRenderer.kind : 'css-fallback'),
    };
    window.donNeuroNoise = api;

    bootRenderer(false);

    if ('ResizeObserver' in window) {
      const ro = new ResizeObserver(() => {
        if (activeRenderer && activeRenderer.resize(false)) {
          activeRenderer.draw(true);
        }
      });
      ro.observe(container);
    }

    window.addEventListener('resize', () => {
      if (activeRenderer && activeRenderer.resize(false)) {
        activeRenderer.draw(true);
      }
    }, { passive: true });

    document.addEventListener('visibilitychange', () => {
      if (document.hidden) {
        stopRaf();
      } else if (!userPaused) {
        if (!activeRenderer) {
          bootRenderer(true);
        } else {
          lastTime = null;
          activeRenderer.draw(true);
          startRaf();
        }
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
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init, { once: true });
  } else {
    init();
  }
})();

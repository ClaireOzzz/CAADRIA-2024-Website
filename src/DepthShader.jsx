import { useFrame, extend } from '@react-three/fiber'
import * as THREE from "three";
import { shaderMaterial } from '@react-three/drei'
import glsl from "babel-plugin-glsl/macro";

export const WaveShaderMaterial = shaderMaterial(
    // Uniform
    {
      uTime: 0,
      uColor: new THREE.Color(0.0, 0.0, 0.0),
      uTexture: new THREE.Texture()
    },
    // Vertex Shader
    glsl`
      precision mediump float;
   
      #include <common>
      #include <batching_pars_vertex>
      #include <uv_pars_vertex>
      #include <displacementmap_pars_vertex>
      #include <morphtarget_pars_vertex>
      #include <skinning_pars_vertex>
      #include <logdepthbuf_pars_vertex>
      #include <clipping_planes_pars_vertex>
  
      // This is used for computing an equivalent of gl_FragCoord.z that is as high precision as possible.
      // Some platforms compute gl_FragCoord at a lower precision which makes the manually computed value better for
      // depth-based postprocessing effects. Reproduced on iPad with A10 processor / iPadOS 13.3.1.
      varying vec2 vHighPrecisionZW;
  
      void main() {
  
        #include <uv_vertex>
  
        #include <batching_vertex>
        #include <skinbase_vertex>
  
        #include <morphinstance_vertex>
  
        #ifdef USE_DISPLACEMENTMAP
  
          #include <beginnormal_vertex>
          #include <morphnormal_vertex>
          #include <skinnormal_vertex>
  
        #endif
  
        #include <begin_vertex>
        #include <morphtarget_vertex>
        #include <skinning_vertex>
        #include <displacementmap_vertex>
        #include <project_vertex>
        #include <logdepthbuf_vertex>
        #include <clipping_planes_vertex>
  
        vHighPrecisionZW = gl_Position.zw ;
  
      }
    `,
    // Fragment Shader
    glsl`
      precision mediump float;

      uniform float opacity;
  
      #include <common>
      #include <packing>
      #include <uv_pars_fragment>
      #include <map_pars_fragment>
      #include <alphamap_pars_fragment>
      #include <alphatest_pars_fragment>
      #include <alphahash_pars_fragment>
      #include <logdepthbuf_pars_fragment>
      #include <clipping_planes_pars_fragment>
  
      varying vec2 vHighPrecisionZW;
  
      void main() {
  
        vec4 diffuseColor = vec4( 1.0 );
        #include <clipping_planes_fragment>
  
        diffuseColor.a = 1.0;
  
        #include <map_fragment>
        #include <alphamap_fragment>
        #include <alphatest_fragment>
        #include <alphahash_fragment>
  
        #include <logdepthbuf_fragment>
  
        // Higher precision equivalent of gl_FragCoord.z. This assumes depthRange has been left to its default values.
        float fragCoordZ =  vHighPrecisionZW[0]+ 0.2 / vHighPrecisionZW[1] + 0.2 ;
  
        //rgba values
        gl_FragColor = vec4( vec3( 1.0 - (fragCoordZ-0.5) ), 1.0 );
  
      }
    `
  );
  
  extend({ WaveShaderMaterial });
  


import * as BABYLON from 'babylonjs';
import "@babylonjs/loaders/STL";
import { useMemo, useEffect, useState, useRef } from 'react';
import _ from 'lodash';

export interface PreviewProps {}

import Robot0OBJ from '../../../assets/models/robot0.obj';

export const Preview = ({}: PreviewProps): any => {
  const [width, setWidth] = useState<number>(0);
  const [height, setHeight] = useState<number>(0);

  const canvasRef = useRef<any>(undefined);
  const containerRef = useRef<any>(undefined);

  useEffect(() => {
    const canvas: HTMLCanvasElement = canvasRef.current;

    // Creates the engine, and the scene.
    const engine: BABYLON.Engine = new BABYLON.Engine(canvas);
    const scene: BABYLON.Scene = new BABYLON.Scene(engine);

    BABYLON.SceneLoader.Append(Robot0OBJ, "", scene);

    // Creates the camera, and attaches control to the canvas.
    const camera: BABYLON.ArcRotateCamera = new BABYLON.ArcRotateCamera(
      'camera',
      -Math.PI / 2,
      Math.PI / 2.5,
      15,
      new BABYLON.Vector3(0, 0, 0),
      scene
    );
    camera.attachControl(canvas, true);

    // Creates the light.
    const light = new BABYLON.HemisphericLight("light", new BABYLON.Vector3(1, 1, 0), scene);

    // The on resize callback.
    const onResize = (_event: any): void => {
      // Get an reference to the current container.
      const container: HTMLDivElement = containerRef.current!;

      // Sets the new width and height.
      setWidth(container.clientWidth);
      setHeight(container.clientHeight);

      // Resizes the engine.
      engine.resize();
    };

    // Adds the event listener.
    window.addEventListener('resize', onResize);

    // Triggers the onresize by default, since we want to set the size of the canvas.
    onResize(undefined);

    // Runs the render loop.
    engine.runRenderLoop((): void => {
      scene.render();
    });

    // Returns the cleanup method which unregisters the event listener, and we stop the render loop.
    return (): void => {
      window.removeEventListener('resize', onResize);
      engine.stopRenderLoop();
    };
  }, []);

  return (
    <div
      ref={containerRef}
      style={{
        width: '100%',
        height: '100%',
        margin: 0,
        padding: 0,
      }}
    >
      <canvas style={{
        margin: 0,
        padding: 0
      }} width={width} height={height} ref={canvasRef}></canvas>
    </div>
  );
};

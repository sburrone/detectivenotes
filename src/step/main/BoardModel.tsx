import { FC, useEffect } from 'react'
import * as THREE from 'three'
import { GLTFLoader } from 'three/examples/jsm/Addons.js'
import { Canvas, useLoader } from '@react-three/fiber'
import { OrbitControls } from '@react-three/drei'
import { Button, useTheme } from '@mui/material'
import { useIntl } from 'react-intl'

export const BoardModel: FC<{
    hideUI: boolean
    setHideUI: (hideUI: boolean) => any
}> = ({ hideUI, setHideUI }) => {
    const cameraPositions = [
        [0, 60, 0],
        [10, 15, 10],
        [0, 0, 40],
        [40, 15, 40],
        [15, 50, 15],
        [15, 50, 50],
        [30, 30, 30],
    ]

    function getCameraPosition() {
        return cameraPositions[Math.floor(Math.random() * cameraPositions.length)]
    }

    const gltf = useLoader(GLTFLoader, './3d/scene.gltf')

    useEffect(() => {
        gltf.scene.scale.set(0.05, 0.05, 0.05)
        gltf.scene.traverse((c) => (c.castShadow = true))
    }, [gltf.scene])

    const theme = useTheme()
    const { formatMessage } = useIntl()

    return (
        <>
            <Canvas
                shadows={{ enabled: true, type: THREE.PCFShadowMap }}
                gl={{
                    toneMapping: THREE.ACESFilmicToneMapping,
                    antialias: true,
                    alpha: true,
                }}
                camera={{
                    fov: 60,
                    near: 1.0,
                    far: 1000.0,
                    position: new THREE.Vector3(...getCameraPosition()),
                }}
                style={{
                    height: '100dvh',
                    width: '100dvw',
                    position: 'fixed',
                    top: 0,
                    left: 0,
                    zIndex: -1,
                    backgroundColor: theme.palette.background.default,
                }}
            >
                <directionalLight color={0xffffff} position={[20, 100, 10]} castShadow intensity={5} />
                <ambientLight color={0xffffff} />
                <OrbitControls
                    target={[0, 10, 0]}
                    maxDistance={80}
                    minDistance={1}
                    autoRotate
                    autoRotateSpeed={2}
                    enableDamping
                />
                <primitive object={gltf.scene} />
            </Canvas>
            {hideUI && (
                <Button
                    sx={{
                        position: 'absolute',
                        bottom: 0,
                        width: '100dvw',
                        borderRadius: 0,
                    }}
                    onClick={() => setHideUI(false)}
                >
                    {formatMessage({ id: 'returnToMainMenu' })}
                </Button>
            )}
        </>
    )
}

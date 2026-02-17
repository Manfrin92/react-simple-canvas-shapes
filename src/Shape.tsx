import { useEffect, useRef } from "react";
import { createRender } from "simple-canvas-shapes";

export interface ShapeProps {
    shape: "circle" | "square" | "triangle";
    size: number;
    color: string;
    width?: number;
    height?: number;
    x?: number;
    y?: number;
}

export function Shape({
    shape,
    size,
    color,
    x,
    y,
    width = 300,
    height = 300
}: ShapeProps) {
    const canvasRef = useRef<HTMLCanvasElement | null>(null);
    const rendererRef = useRef<ReturnType<typeof createRender> | null>(null);

    useEffect(() => {
        if (!canvasRef.current) return;

        if (!rendererRef.current) {
            rendererRef.current = createRender(canvasRef.current);
        }

        const renderer = rendererRef.current;

        renderer.clear();
        renderer.draw({
            shape,
            size,
            color, x, y
        });

    }, [shape, size, color]);

    return (
        <canvas
            ref={canvasRef}
            width={width}
            height={height}
        />
    );
}

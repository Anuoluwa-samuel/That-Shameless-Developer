"use client";

import { useEffect, useRef, useState, type PointerEvent } from "react";
import {
  geoGraticule,
  geoOrthographic,
  geoPath,
  type GeoPermissibleObjects,
} from "d3-geo";
import { select } from "d3-selection";
import { feature } from "topojson-client";
import type { GeometryCollection, Topology } from "topojson-specification";
import worldTopology from "world-atlas/countries-110m.json";
import { cn } from "@/lib/utils";

type WorldTopology = Topology & { objects: { countries: GeometryCollection } };

// Bundled with this (lazy) chunk instead of fetched from a CDN at runtime.
const world = worldTopology as unknown as WorldTopology;
const countries = feature(world, world.objects.countries).features;

export interface GlobeWireframeProps {
  className?: string;
  strokeColor?: string;
  strokeWidth?: number;
  graticuleColor?: string;
  graticuleOpacity?: number;
  sphereOutlineColor?: string;
  sphereOutlineWidth?: number;
  autoRotate?: boolean;
  /** Degrees per frame at 60fps. */
  autoRotateSpeed?: number;
  initialRotation?: [number, number];
  enableInteraction?: boolean;
  showGraticule?: boolean;
  countryFillColor?: string;
  countryHoverColor?: string;
  variant?: "wireframe" | "wireframesolid" | "solid";
  scale?: number;
  backgroundColor?: string;
}

export default function GlobeWireframe({
  className = "",
  strokeColor = "currentColor",
  strokeWidth = 1,
  graticuleColor = "currentColor",
  graticuleOpacity = 0.2,
  sphereOutlineColor = "currentColor",
  sphereOutlineWidth = 1,
  autoRotate = true,
  autoRotateSpeed = 0.5,
  initialRotation = [0, 0],
  enableInteraction = true,
  showGraticule = true,
  countryFillColor,
  countryHoverColor,
  variant = "wireframesolid",
  scale = 1,
  backgroundColor,
}: GlobeWireframeProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const svgRef = useRef<SVGSVGElement>(null);
  const rotation = useRef<[number, number]>(initialRotation);
  const dragging = useRef(false);
  const lastPointer = useRef<[number, number]>([0, 0]);
  const redraw = useRef<(() => void) | null>(null);
  const [size, setSize] = useState(0);
  const [visible, setVisible] = useState(false);
  const [grabbing, setGrabbing] = useState(false);

  // Track the container's width, and pause everything while it is off screen.
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const measure = () => setSize(el.offsetWidth);
    measure();
    const resize = new ResizeObserver(measure);
    resize.observe(el);
    const io = new IntersectionObserver(
      ([entry]) => setVisible(entry?.isIntersecting ?? false),
      {
        threshold: 0.1,
      },
    );
    io.observe(el);
    return () => {
      resize.disconnect();
      io.disconnect();
    };
  }, []);

  // Build the SVG once per size/style change, then only update path geometry per frame.
  useEffect(() => {
    const svgEl = svgRef.current;
    if (!svgEl || size === 0) return;

    const solid = variant === "solid";
    const withGraticule =
      variant === "wireframe" && showGraticule && graticuleOpacity > 0;
    const countryFill = solid ? (countryFillColor ?? "currentColor") : "none";
    const countryStroke = solid ? strokeWidth * 0.5 : strokeWidth;
    const countryOpacity = solid ? 0.3 : 1;
    const outlineWidth = variant === "wireframe" ? sphereOutlineWidth : 1.5;
    const outlineOpacity = variant === "wireframe" ? 1 : 0.8;

    const projection = geoOrthographic()
      .scale((size / 2) * scale * 0.9)
      .translate([size / 2, size / 2])
      .precision(0.6);
    const path = geoPath(projection);

    const svg = select(svgEl);
    svg.selectAll("*").remove();

    if (backgroundColor) {
      svg
        .append("circle")
        .attr("cx", size / 2)
        .attr("cy", size / 2)
        .attr("r", (size / 2) * scale * 0.9)
        .attr("fill", backgroundColor);
    }
    const graticulePath = withGraticule
      ? svg
          .append("path")
          .attr("fill", "none")
          .attr("stroke", graticuleColor)
          .attr("stroke-width", 1)
          .attr("opacity", graticuleOpacity)
      : null;
    const countryPaths = svg
      .selectAll<SVGPathElement, (typeof countries)[number]>("path.country")
      .data(countries)
      .enter()
      .append("path")
      .attr("class", "country")
      .attr("fill", countryFill)
      .attr("stroke", strokeColor)
      .attr("stroke-width", countryStroke)
      .attr("opacity", countryOpacity);
    if (solid && countryHoverColor) {
      countryPaths
        .on("mouseenter", function () {
          select(this).attr("fill", countryHoverColor);
        })
        .on("mouseleave", function () {
          select(this).attr("fill", countryFill);
        });
    }
    const outline = svg
      .append("path")
      .attr("fill", "none")
      .attr("stroke", sphereOutlineColor)
      .attr("stroke-width", outlineWidth)
      .attr("opacity", outlineOpacity);

    const draw = () => {
      projection.rotate([rotation.current[0], rotation.current[1]]);
      graticulePath?.attr("d", path(geoGraticule()()));
      countryPaths.attr("d", (d) => path(d as GeoPermissibleObjects) ?? "");
      outline.attr("d", path({ type: "Sphere" }));
    };
    redraw.current = draw;
    draw();

    // ~30fps is plenty for a slow spin and halves the main-thread cost.
    const FRAME_MS = 32;
    let frame = 0;
    let last = performance.now();
    const tick = (now: number) => {
      frame = requestAnimationFrame(tick);
      const dt = now - last;
      if (dt < FRAME_MS || dragging.current) return;
      last = now;
      rotation.current = [
        (rotation.current[0] + autoRotateSpeed * (Math.min(dt, 100) / 16.67)) % 360,
        rotation.current[1],
      ];
      draw();
    };
    if (autoRotate && visible) frame = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(frame);
      redraw.current = null;
    };
  }, [
    size,
    visible,
    autoRotate,
    autoRotateSpeed,
    variant,
    showGraticule,
    graticuleOpacity,
    graticuleColor,
    strokeColor,
    strokeWidth,
    sphereOutlineColor,
    sphereOutlineWidth,
    countryFillColor,
    countryHoverColor,
    scale,
    backgroundColor,
  ]);

  const onPointerDown = (e: PointerEvent<SVGSVGElement>) => {
    if (!enableInteraction) return;
    dragging.current = true;
    setGrabbing(true);
    lastPointer.current = [e.clientX, e.clientY];
    e.currentTarget.setPointerCapture(e.pointerId);
  };
  const onPointerMove = (e: PointerEvent<SVGSVGElement>) => {
    if (!dragging.current) return;
    const dx = e.clientX - lastPointer.current[0];
    const dy = e.clientY - lastPointer.current[1];
    lastPointer.current = [e.clientX, e.clientY];
    rotation.current = [
      rotation.current[0] + dx * 0.5,
      Math.max(-90, Math.min(90, rotation.current[1] - dy * 0.5)),
    ];
    redraw.current?.();
  };
  const endDrag = () => {
    dragging.current = false;
    setGrabbing(false);
  };

  return (
    <div ref={containerRef} className={cn("relative aspect-square w-full", className)}>
      <svg
        ref={svgRef}
        width={size}
        height={size}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={endDrag}
        onPointerCancel={endDrag}
        style={{
          cursor: enableInteraction ? (grabbing ? "grabbing" : "grab") : "default",
          touchAction: "pan-y", // horizontal drag spins the globe; vertical swipes still scroll the page
        }}
      />
    </div>
  );
}

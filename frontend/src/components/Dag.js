import React, { useRef, useEffect } from "react";
import * as d3 from "d3";
import { dagStratify, sugiyama, decrossOpt } from "d3-dag";

function isReady(node, nodes) {
  for (const parentId of node.parentIds) {
    for (const n of nodes) {
      if (n.id === parentId) {
        if (!n.isDone) {
          return false;
        }
      }
    }
  }
  return true;
}

function getColor(node, nodes) {
  if (node.isDone) {
    return "grey";
  }
  if (isReady(node, nodes)) {
    return "green";
  }
  return "black";
}

/* Component */
export const Dag = (props) => {
  /* The useRef Hook creates a variable that "holds on" to a value across rendering
       passes. In this case it will hold our component's SVG DOM element. It's
       initialized null and React will assign it later (see the return statement) */
  const d3Container = useRef(null);

  /* The useEffect Hook is for running side effects outside of React,
       for instance inserting elements into the DOM using D3 */
  useEffect(
    () => {
      if (props.data && d3Container.current) {
        const dag = dagStratify()(props.data);
        const nodeRadius = 20;
        const layout = sugiyama() // base layout
          .decross(decrossOpt()) // minimize number of crossings
          .nodeSize((node) => [
            (node ? 3.6 : 0.25) * nodeRadius,
            3 * nodeRadius,
          ]); // set node size instead of constraining to fit
        const { width, height } = layout(dag);

        // --------------------------------
        // This code only handles rendering
        // --------------------------------
        const svgSelection = d3.select("svg");
        // Prevent stale els on rerender
        svgSelection.selectChildren().remove();
        svgSelection.attr("viewBox", [0, 0, width, height].join(" "));
        const defs = svgSelection.append("defs"); // For gradients

        // How to draw edges
        const line = d3
          .line()
          .curve(d3.curveCatmullRom)
          .x((d) => d.x)
          .y((d) => d.y);

        // Plot edges
        svgSelection
          .append("g")
          .selectAll("path")
          .data(dag.links())
          .enter()
          .append("path")
          .attr("d", ({ points }) => line(points))
          .attr("fill", "none")
          .attr("stroke-width", 3)
          .attr("stroke", ({ source, target }) => {
            // encodeURIComponents for spaces, hope id doesn't have a `--` in it
            const gradId = encodeURIComponent(
              `${source.data.id}--${target.data.id}`
            );
            const grad = defs
              .append("linearGradient")
              .attr("id", gradId)
              .attr("gradientUnits", "userSpaceOnUse")
              .attr("x1", source.x)
              .attr("x2", target.x)
              .attr("y1", source.y)
              .attr("y2", target.y);
            grad
              .append("stop")
              .attr("offset", "0%")
              .attr("stop-color", getColor(source.data, props.data));
            grad
              .append("stop")
              .attr("offset", "100%")
              .attr("stop-color", getColor(target.data, props.data));
            return `url(#${gradId})`;
          });

        // Select nodes
        const nodes = svgSelection
          .append("g")
          .selectAll("g")
          .data(dag.descendants())
          .enter()
          .append("g")
          .attr("transform", ({ x, y }) => `translate(${x}, ${y})`);

        // Plot node circles
        nodes
          .append("circle")
          .attr("r", nodeRadius)
          .attr("fill", (n) => {
            if (n.data.isDone) {
              return "grey";
            }
            if (isReady(n.data, props.data)) {
              return "green";
            }
            return "black";
          });

        // Add text to nodes
        nodes
          .append("text")
          .text((d) => d.data.title)
          .attr("font-weight", "bold")
          .attr("font-family", "sans-serif")
          .attr("text-anchor", "middle")
          .attr("alignment-baseline", "middle")
          .attr("fill", "white")
          .attr("textLength", nodeRadius * 1.7)
          .attr("lengthAdjust", "spacingAndGlyphs");

        nodes.on("click", (e, d) => props.onNodeClick(d.data));

        // Remove old D3 elements
        nodes.exit().remove();
      }
    },
    [props.data, props.onNodeClick, props, d3Container]
  );

  return (
    <svg className="d3-component" width="100%" ref={d3Container} />
  );
};

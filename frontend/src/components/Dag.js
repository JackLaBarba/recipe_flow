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

function plotEdges(svgSelection, dag, steps) {
  const defs = svgSelection.append("defs"); // For gradients
  
  // Set up line params
  const line = d3
    .line()
    .curve(d3.curveCatmullRom)
    .x((d) => d.x)
    .y((d) => d.y);

  // Plot the edges
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
        .attr("stop-color", getColor(source.data, steps));
      grad
        .append("stop")
        .attr("offset", "100%")
        .attr("stop-color", getColor(target.data, steps));
      return `url(#${gradId})`;
    });
}

function selectNodes(svgSelection, dag) {
  return svgSelection
    .append("g")
    .selectAll("g")
    .data(dag.descendants())
    .enter()
    .append("g")
    .attr("transform", ({ x, y }) => `translate(${x}, ${y})`);
}

function plotNodeCircles(nodes, nodeRadius, steps) {
  nodes
    .append("circle")
    .attr("r", nodeRadius)
    .attr("fill", (n) => {
      if (n.data.isDone) {
        return "grey";
      }
      if (isReady(n.data, steps)) {
        return "green";
      }
      return "black";
    });
}

function addTextToNodes(nodes, nodeRadius) {
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
}

function renderDag(dag, layout, nodeRadius, steps) {
  const { width, height } = layout(dag);
  const svgSelection = d3.select("svg");
  svgSelection.selectChildren().remove();  // Prevent stale els on rerender
  svgSelection.attr("viewBox", [0, 0, width, height].join(" "));
  plotEdges(svgSelection, dag, steps);
  let nodes = selectNodes(svgSelection, dag);
  plotNodeCircles(nodes, nodeRadius, steps);
  addTextToNodes(nodes, nodeRadius);
  return nodes;
}

export const Dag = (props) => {
  const d3Container = useRef(null);

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

        let nodes = renderDag(dag, layout, nodeRadius, props.data);
        nodes.on("click", (e, d) => props.onNodeClick(d.data));
      }
    },
    [props.data, props.onNodeClick, props, d3Container]
  );

  return (
    <svg className="d3-component" width="100%" ref={d3Container} />
  );
};

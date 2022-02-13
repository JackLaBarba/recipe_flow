import React, { useRef, useEffect } from "react";
import * as d3 from "d3";
import { dagStratify, sugiyama, decrossOpt } from "d3-dag";

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
        const data = [
          {
            id: "1",
            title: "chop",
            parentIds: [],
          },
          {
            id: "2",
            title: "boil",
            parentIds: [],
          },
          {
            id: "3",
            title: "cook",
            parentIds: ["1", "2"],
          },
          {
            id: "4",
            title: "serve",
            parentIds: ["3"],
          },
        ];
        const dag = dagStratify()(data);
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
        svgSelection.attr("viewBox", [0, 0, width, height].join(" "));
        const defs = svgSelection.append("defs"); // For gradients

        const steps = dag.size();
        const interp = d3.interpolateRainbow;
        const colorMap = new Map();
        //for (const [i, node] of dag.idescendants().entries()) {
        // colorMap.set(node.data.id, interp(i / steps));
        //}

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
              .attr("stop-color", colorMap.get(source.data.id));
            grad
              .append("stop")
              .attr("offset", "100%")
              .attr("stop-color", colorMap.get(target.data.id));
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
          .attr("fill", (n) => colorMap.get(n.data.id));

        // Add text to nodes
        nodes
          .append("text")
          .text((d) => d.data.title)
          .attr("font-weight", "bold")
          .attr("font-family", "sans-serif")
          .attr("text-anchor", "middle")
          .attr("alignment-baseline", "middle")
          .attr("fill", "white");

        // Remove old D3 elements
        // update.exit().remove();
      }
    },

    /*
            useEffect has a dependency array (below). It's a list of dependency
            variables for this useEffect block. The block will run after mount
            and whenever any of these variables change. We still have to check
            if the variables are valid, but we do not have to compare old props
            to next props to decide whether to rerender.
        */
    [props.data, d3Container.current]
  );

  return (
    <svg className="d3-component" width={400} height={200} ref={d3Container} />
  );
};

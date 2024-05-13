import { cn } from "@/lib/utils";
import { ClassNames } from "@emotion/react";
import React from "react";

const Loading = () => {
  return (
    <div className="flex items-start gap-x-2">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className={cn("animate-spin", ClassNames)}
      >
        <path d="M21 12a9 9 0 1 1-6.219-8.56" />
      </svg>
      <p className="inline-block">
        <span
          className="animate-bold-normal inline-block"
          style={{ animationDelay: "0.1s" }}
        >
          L
        </span>
        <span
          className="animate-bold-normal inline-block"
          style={{ animationDelay: "0.2s" }}
        >
          o
        </span>
        <span
          className="animate-bold-normal inline-block"
          style={{ animationDelay: "0.3s" }}
        >
          a
        </span>
        <span
          className="animate-bold-normal inline-block"
          style={{ animationDelay: "0.4s" }}
        >
          d
        </span>
        <span
          className="animate-bold-normal inline-block"
          style={{ animationDelay: "0.5s" }}
        >
          i
        </span>
        <span
          className="animate-bold-normal inline-block"
          style={{ animationDelay: "0.6s" }}
        >
          n
        </span>
        <span
          className="animate-bold-normal inline-block"
          style={{ animationDelay: "0.7s" }}
        >
          g
        </span>
        <span
          className="animate-bold-normal inline-block"
          style={{ animationDelay: "0.8s" }}
        >
          .
        </span>
        <span
          className="animate-bold-normal inline-block"
          style={{ animationDelay: "0.9s" }}
        >
          .
        </span>
        <span
          className="animate-bold-normal inline-block"
          style={{ animationDelay: "1s" }}
        >
          .
        </span>
      </p>
    </div>
  );
};

export default Loading;

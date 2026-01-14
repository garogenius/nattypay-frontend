"use client";
import cn from "classnames";
import Navbar from "./Navbar";

const Content = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className={cn("flex flex-col h-full overflow-hidden flex-1")}>
      <Navbar />
      <main className="w-full px-4 md:px-6 py-4 overflow-x-hidden overflow-y-auto transition-all duration-300 flex-1">
        {children}
      </main>
    </div>
  );
};

export default Content;

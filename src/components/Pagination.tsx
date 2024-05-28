"use client";

import React, { FC } from "react";
import { useRouter } from "next/navigation";

interface PaginationType {
  page: number;
  hasPrev: boolean;
  hasNext: boolean;
}

const Pagination: FC<PaginationType> = ({ page, hasPrev, hasNext }) => {
  const router = useRouter();
  return (
    <>
      <hr />
      <div className="flex  justify-between  px-5">
        <button
          type="button"
          title="Previous"
          className="btn-text  text-base disabled:invisible  flex-grow-0 "
          disabled={!hasPrev}
          onClick={() => router.push(`?page=${page - 1}`)}
        >
          Previous
        </button>
        <button
          type="button"
          title="Next"
          className="btn-text text-base disabled:invisible "
          disabled={!hasNext}
          onClick={() => router.push(`?page=${page + 1}`)}
        >
          Next
        </button>
      </div>
    </>
  );
};

export default Pagination;

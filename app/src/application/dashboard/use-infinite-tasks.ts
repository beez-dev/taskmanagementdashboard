"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import type { Task, TaskStatus } from "@/src/domain/types/task";
import { useListTasksQuery } from "@/src/infrastructure/api/tasks.api";

const PAGE_SIZE = 10;

export function useInfiniteTasks(status: TaskStatus) {
  const [page, setPage] = useState(1);
  const [tasks, setTasks] = useState<Task[]>([]);
  const [total, setTotal] = useState(0);
  const lastProcessedPage = useRef(0);
  // Set synchronously inside loadMore so double-fires are blocked before
  // RTK Query's isFetching has a chance to update.
  const pendingRef = useRef(false);

  const { currentData, isFetching } = useListTasksQuery({ status, page, pageSize: PAGE_SIZE });

  useEffect(() => {
    if (!currentData || page <= lastProcessedPage.current) return;
    lastProcessedPage.current = page;
    setTotal(currentData.total);
    setTasks((prev) => (page === 1 ? currentData.tasks : [...prev, ...currentData.tasks]));
  }, [currentData, page]);

  useEffect(() => {
    if (!isFetching) pendingRef.current = false;
  }, [isFetching]);

  const hasMore = tasks.length < total;

  const loadMore = useCallback(() => {
    if (pendingRef.current || !hasMore) return;
    pendingRef.current = true;
    setPage((p) => p + 1);
  }, [hasMore]);

  return { tasks, total, isFetching, hasMore, loadMore };
}

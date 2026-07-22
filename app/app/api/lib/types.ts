// Backend barrel — all common types used within app/api/ come from here.
// No file in app/api/ imports directly from @/common/.

export type { ApiError, ApiMeta, ApiResponse } from "@/common/types/api";

export type {
  User,
  UserPublic,
  SigninInput,
  SignupInput,
} from "@/common/types/user";

export { signinSchema, signupSchema } from "@/common/types/user";

export {
  TASK_STATUSES,
  TASK_PRIORITIES,
  taskStatusSchema,
  taskPrioritySchema,
  createTaskSchema,
  updateTaskSchema,
} from "@/common/types/task";

export type {
  TaskId,
  TaskStatus,
  TaskPriority,
  Task,
  CreateTaskInput,
  UpdateTaskInput,
} from "@/common/types/task";

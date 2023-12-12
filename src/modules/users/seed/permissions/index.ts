import { taskManagement } from "./tasks.permission";
import { userPermissionManagement } from "./user.permission";

export const permissionData = [
    ...taskManagement,
    ...userPermissionManagement
]